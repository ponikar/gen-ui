import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";

import { StateGraph, START, END } from "@langchain/langgraph";
import { dataSourceTool } from "./tools";
import { Model } from "./model";
import { AgentState } from "./state";

const tools = [...dataSourceTool];

const toolNode = new ToolNode(tools);

const llm = Model.llm.bindTools(tools);

const graph = new StateGraph(AgentState.initialState)
	.addNode("agent", async (state) => {
		console.log("[agent -> node]:", state);
		const { messages } = state;
		const response = await llm.invoke(messages);
		return { messages: [response] };
	})
	.addNode("tools", async (state) => {
		console.log(`[Retry count: ${state.retry_count}]`);

		const result = await toolNode.invoke(state);

		const lastMessage = result.messages[result.messages.length - 1];
		const toolResponse = JSON.parse(lastMessage.content);

		if (toolResponse.error) {
			return {
				messages: result.messages,
				retry_count: state.retry_count + 1,
			};
		}

		return {
			messages: result.messages,
			retry_count: 0,
		};
	})
	.addConditionalEdges("agent", (state) => {
		const { messages } = state;
		const lastMessage = messages[messages.length - 1];

		if (
			lastMessage &&
			lastMessage instanceof AIMessage &&
			lastMessage.tool_calls?.length &&
			lastMessage.tool_calls.length > 0
		) {
			return "tools";
		}
		return END;
	})
	.addEdge(START, "agent")
	.addEdge("tools", "agent")
	.addConditionalEdges("tools", (state) => {
		// Exit after 3 failed attempts
		if (state.retry_count >= 3) {
			console.log("Max retries reached. Exiting loop.");
			return END;
		}

		return "agent";
	});

const agent = graph.compile({
	interruptBefore: [],
});

const result = await agent.invoke({
	messages: [
		Model.systemPrompt,
		new HumanMessage(
			"Hi, I need help preparing for the upcoming Ganpati festival crisis response.",
		),
	],
});

// 6. Get response
const lastMessage = result.messages[result.messages.length - 1];
console.log("🏥 Healthcare Agent:", lastMessage?.content);

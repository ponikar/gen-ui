import { convertToModelMessages, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { generateUI } from "~/tools/generateUI";

export async function POST(req: Request) {
	try {
		const { messages } = await req.json();

		const result = await streamText({
			model: google("gemini-2.5-flash"),
			messages: convertToModelMessages(messages),
			tools: {
				generateUI,
			},
			system: `You are a UI-generation assistant.  
Your ONLY job is to understand the user’s request, 
if required -> refine it into a clean and detailed UI-generation prompt, and then call the generateUI tool.
Understand whether user's query required to generate UI or not.

Rules:
1. ALWAYS refine the user’s query before calling the tool.
2. The refined prompt must clearly describe the UI the user wants.
3. Do NOT generate UI code yourself — only call generateUI.
4. The refined prompt should be specific, unambiguous, and mention:
   - purpose of the UI
   - key components needed
   - inputs, actions, or data displayed
   - any layout or style preferences implied by user
5. If the user’s query is vague, infer reasonable missing details to make the prompt usable.
6. Do NOT explain your reasoning to the user. Go straight to the tool call.

Your output should either response to user or generateUI tool call with the refined prompt.

for example 

user query: show me what's inside my shopping list. 
you have to generate UI for this, make a tool call.
`,
		});

		return result.toUIMessageStreamResponse();
	} catch (error) {
		console.error("Error streaming with Google model:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}

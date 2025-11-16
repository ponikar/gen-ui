import { google } from "@ai-sdk/google";
import { generateObject, tool } from "ai";
import { z } from "zod";
import { UI } from "./ui";
import { LIBRARY_REGISTRY } from "~/app/lib/registry";

export const generateUI = tool({
	description: "Generate UI components based on a given prompt",
	inputSchema: z.object({
		prompt: z.string().describe("A detailed description of the UI to generate"),
	}),
	execute: async ({ prompt }) => {
		try {
			const result = await generateObject({
				schema: z.object({
					code: z.string().describe("Generated code based on user's query"),
					deps: z
						.array(z.string())
						.describe("list of all the component you have used inside code"),
				}),
				prompt,
				model: google("gemini-2.5-flash"),
				system: `
  
  You are generative UI generator, your job is to evaluate user query and based on the user requirement use UI components to display the output.
  Here's a list of components that you can use to build a UI
  You can use combination of components to create a UI. 
  

  As output you have to generate a structure react functionional component code to display UI.
  NOTE: 
  - DO NOT USE any ESModule keywords like import, export or require statement just generate a function 

  Input example: 
  List out all the available supplies

  This is the output format that you have to follow
  Output: 

  code:
  function Component(/*..props*/){
    return <>..</>
  }

  deps: (depends on which components you are using)
  [Card, Button,...]


  Here Understand how to use each component based.
  DO NOT ADD IMPORT STATEMENT, JUST GENERATE CODE
  ${UI}

  -- LIST OF DEPS --- 
  PASS THIS LIST OF DEPS for each component
  ${Object.values(LIBRARY_REGISTRY)}
  `,
			});

			console.log("lol", result.object);

			return {
				type: "CODE_GEN",
				result: result.object,
			};
		} catch (e) {
			console.log("errorrorroro", e);
		}
	},
});

import { DynamicStructuredTool } from "@langchain/core/tools";
import z from "zod";
import { Model } from "../model";
import { db } from "~/server/db";
import { area_history } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

const fetchHistoricalDataTool = new DynamicStructuredTool({
	name: "fetch_historical_crisis_data",
	description:
		"Fetches historical crisis data from database. Returns error message if crisis_id or area_id is invalid.",
	schema: z.object({
		crisis_id: z.number().describe("Crisis ID (valid range: 1-100)"),
		area_id: z.number().describe("Area ID (valid range: 1-50)"),
	}),
	func: async ({ crisis_id, area_id }) => {
		try {
			const data = await db
				.select()
				.from(area_history)
				.where(
					and(
						eq(area_history.crisis_id, crisis_id),
						eq(area_history.area_id, area_id),
					),
				);

			return JSON.stringify({ error: false, data });
		} catch (e) {
			return JSON.stringify({
				error: e,
				message: "Tool calling failed, look at error message",
			});
		}
	},
});

const searchCrisisDataTool = new DynamicStructuredTool({
	name: "search_crisis_data",
	description:
		"Search historical crisis data from past Ganpati festivals. Returns area-level crisis metrics including emergency admissions, resource usage patterns, and geographic information.",
	schema: z.object({
		query: z
			.string()
			.describe(
				"Natural language query about crisis data, e.g., 'high admission areas in Mumbai during Ganpati 2024'",
			),
	}),
	func: async ({ query }) => {
		// Embed the query
		const queryEmbedding = await Model.embeddings.embedQuery(query);

		// TODO: vector search here with langchain of course

		return JSON.stringify({
			query,
			vectors: [],
		});
	},
});

export const dataSourceTool = [searchCrisisDataTool, fetchHistoricalDataTool];

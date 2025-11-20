import { DynamicStructuredTool } from "@langchain/core/tools";
import z from "zod";
import { Model } from "../model";
import { db } from "~/server/db";
import { area_history } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export const fetchHistoricalDataTool = new DynamicStructuredTool({
	name: "fetch_historical_crisis_data",
	description:
		"Fetches historical crisis data from database. Returns error message if crisis_id or area_id is invalid.",
	schema: z.object({
		crisis_id: z
			.number()
			.describe("Crisis id that can be searchable inside crisis table"),
		area_id: z
			.number()
			.describe("Area id that can be searchable inside area table"),
	}),
	func: async ({ crisis_id, area_id }) => {
		console.log("calling fetch_tool", crisis_id, area_id);
		return JSON.stringify({
			message: `
            area_id: 1, Mumbai andheri
            crisis_id: 1, Ganpati festival
area_history_id,area_id,crisis_id,impacted_users,month,year,created_at,updated_at
1,1,1,16,2023-11-01 00:00:00,2023,2025-11-17 19:14:01,2025-11-17 19:14:01
2,2,1,2,2023-11-01 00:00:00,2023,2025-11-17 19:14:01,2025-11-17 19:14:01
3,3,1,4,2023-11-01 00:00:00,2023,2025-11-17 19:14:01,2025-11-17 19:14:01
4,4,1,41,2023-11-01 00:00:00,2023,2025-11-17 19:14:01,2025-11-17 19:14:01
5,5,1,15,2023-11-01 00:00:00,2023,2025-11-17 19:14:01,2025-11-17 19:14:01
6,6,1,38,2023-11-01 00:00:00,2023,2025-11-17 19:14:01,2025-11-17 19:14:01`,
		});

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

export const searchCrisisDataTool = new DynamicStructuredTool({
	name: "search_crisis_data",
	description:
		"Search historical crisis data from past Crisis. Returns area-level crisis metrics including emergency admissions, resource usage patterns, and geographic information.",
	schema: z.object({
		query: z
			.string()
			.describe(
				"Query should contain region and crisis information, refine it before you send it.",
			),
	}),
	func: async ({ query }, runManager) => {
		console.log("calling search_tool");

		return JSON.stringify({ crisis_id: 1, area_id: 1 });
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

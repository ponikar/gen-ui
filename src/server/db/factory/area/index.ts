import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import papaparse from "papaparse";
import path from "path";

const areaCSVPath = path.join(
	process.cwd(),
	"src/server/db/factory/area/area.csv",
);
const areaHistoryCSVPath = path.join(
	process.cwd(),
	"src/server/db/factory/area/area_history.csv",
);

const seedAreas = async () => {
	const areaCSV = fs.readFileSync(areaCSVPath, "utf8");
	const parsedAreas = papaparse.parse(areaCSV, {
		header: true,
		skipEmptyLines: true,
	});

	for (const area of parsedAreas.data as any[]) {
		await db
			.insert(schema.area)
			.values({
				city: area.city,
				region: area.region,
				latitude: area.latitude,
				longitude: area.longitude,
				pincode: Number(area.pincode),
			})
			.onConflictDoUpdate({
				target: schema.area.area_id,
				set: {
					city: area.city,
					region: area.region,
					latitude: area.latitude,
					longitude: area.longitude,
					pincode: Number(area.pincode),
				},
			});
	}
};

const seedAreaHistories = async () => {
	const areaHistoryCSV = fs.readFileSync(areaHistoryCSVPath, "utf8");
	const parsedAreaHistories = papaparse.parse(areaHistoryCSV, {
		header: true,
		skipEmptyLines: true,
	});

	for (const areaHistory of parsedAreaHistories.data as any[]) {
		await db
			.insert(schema.area_history)
			.values({
				area_id: Number(areaHistory.area_id),
				crisis_id: Number(areaHistory.crisis_id),
				impacted_users: Number(areaHistory.impacted_users),
				month: new Date(areaHistory.month),
				year: Number(areaHistory.year),
			})
			.onConflictDoUpdate({
				target: schema.area_history.area_history_id,
				set: {
					area_id: Number(areaHistory.area_id),
					crisis_id: Number(areaHistory.crisis_id),
					impacted_users: Number(areaHistory.impacted_users),
					month: new Date(areaHistory.month),
					year: Number(areaHistory.year),
				},
			});
	}
};

const main = async () => {
	try {
		console.log("Seeding areas...");
		await seedAreas();
		console.log("Seeding area histories...");
		await seedAreaHistories();
		console.log("Seeding complete!");
	} catch (error) {
		console.error("Seeding failed:", error);
	}
};

main();

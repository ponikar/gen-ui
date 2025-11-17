import {
	pgTable,
	serial,
	text,
	integer,
	timestamp,
	pgEnum,
} from "drizzle-orm/pg-core";

export const crisisTagEnum = pgEnum("crisis_tag", [
	"festival",
	"pollution",
	"epidemic",
]);
export const priorityLevelEnum = pgEnum("priority_level", [
	"high",
	"medium",
	"low",
]);

export const area = pgTable("area", {
	area_id: serial("area_id").primaryKey(),
	city: text("city"),
	region: text("region"),
	latitude: text("latitude"),
	longitude: text("longitude"),
	pincode: integer("pincode"),
	crisis_id: integer("crisis_id").references(() => crisis.crisis_id),
	impacted_users: integer("impacted_users"),
	month: timestamp("month"),
	year: integer("year"),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow(),
});

export const crisis = pgTable("crisis", {
	crisis_id: serial("crisis_id").primaryKey(),
	crisis_name: text("crisis_name"),
	crisis_tag: crisisTagEnum("crisis_tag"),
	description: text("description"),
	severity_level: text("severity_level"),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow(),
});

export const supplement = pgTable("supplement", {
	supplement_id: serial("supplement_id").primaryKey(),
	supplement_name: text("supplement_name"),
	unit: text("unit"),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow(),
});

export const supplement_and_crisis_priority = pgTable(
	"supplement_and_crisis_priority",
	{
		id: serial("id").primaryKey(),
		crisis_id: integer("crisis_id").references(() => crisis.crisis_id),
		supplement_id: integer("supplement_id").references(
			() => supplement.supplement_id,
		),
		priority_level: priorityLevelEnum("priority_level"),
		avg_consumption_multiplier: integer("avg_consumption_multiplier"),
		created_at: timestamp("created_at").defaultNow(),
		updated_at: timestamp("updated_at").defaultNow(),
	},
);

export const hospital = pgTable("hospital", {
	hospital_id: serial("hospital_id").primaryKey(),
	name: text("name"),
	area_id: integer("area_id").references(() => area.area_id),
	specializations: text("specializations"),
	staff_count: integer("staff_count"),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow(),
});

export const staff_schedules = pgTable("staff_schedules", {
	schedule_id: serial("schedule_id").primaryKey(),
	hospital_id: integer("hospital_id").references(() => hospital.hospital_id),
	role: text("role"),
	specializations: text("specializations"),
	shift_start: timestamp("shift_start"),
	shift_end: timestamp("shift_end"),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow(),
});

export const hospital_inventory = pgTable("hospital_inventory", {
	supply_id: serial("supply_id").primaryKey(),
	hospital_id: integer("hospital_id").references(() => hospital.hospital_id),
	supply_type: text("supply_type"),
	stock_level: integer("stock_level"),
	avg_daily_use: integer("avg_daily_use"),
	reorder_threshold: integer("reorder_threshold"),
	last_updated: timestamp("last_updated"),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow(),
});

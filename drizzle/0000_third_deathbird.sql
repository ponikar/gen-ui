CREATE TYPE "public"."crisis_tag" AS ENUM('festival', 'pollution', 'epidemic');--> statement-breakpoint
CREATE TYPE "public"."priority_level" AS ENUM('high', 'medium', 'low');--> statement-breakpoint
CREATE TABLE "area" (
	"area_id" serial PRIMARY KEY NOT NULL,
	"city" text,
	"region" text,
	"latitude" text,
	"longitude" text,
	"pincode" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "area_history" (
	"area_history_id" serial PRIMARY KEY NOT NULL,
	"area_id" integer,
	"crisis_id" integer,
	"impacted_users" integer,
	"month" timestamp,
	"year" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "crisis" (
	"crisis_id" serial PRIMARY KEY NOT NULL,
	"crisis_name" text,
	"crisis_tag" "crisis_tag",
	"description" text,
	"severity_level" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "disease" (
	"disease_id" serial PRIMARY KEY NOT NULL,
	"crisis_id" integer NOT NULL,
	"disease_name" text NOT NULL,
	"description" text,
	"severity_level" text,
	"symptoms" text,
	"common_causes" text,
	"peak_season" text,
	"peak_months" text
);
--> statement-breakpoint
CREATE TABLE "hospital" (
	"hospital_id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"area_id" integer,
	"specializations" text,
	"staff_count" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "hospital_inventory" (
	"supply_id" serial PRIMARY KEY NOT NULL,
	"hospital_id" integer,
	"supply_type" text,
	"stock_level" integer,
	"avg_daily_use" integer,
	"reorder_threshold" integer,
	"last_updated" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "staff_schedules" (
	"schedule_id" serial PRIMARY KEY NOT NULL,
	"hospital_id" integer,
	"role" text,
	"specializations" text,
	"shift_start" timestamp,
	"shift_end" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "supplement" (
	"supplement_id" serial PRIMARY KEY NOT NULL,
	"supplement_name" text,
	"unit" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "supplement_and_crisis_priority" (
	"id" serial PRIMARY KEY NOT NULL,
	"crisis_id" integer,
	"supplement_id" integer,
	"priority_level" "priority_level",
	"avg_consumption_multiplier" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "area_history" ADD CONSTRAINT "area_history_area_id_area_area_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("area_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "area_history" ADD CONSTRAINT "area_history_crisis_id_crisis_crisis_id_fk" FOREIGN KEY ("crisis_id") REFERENCES "public"."crisis"("crisis_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disease" ADD CONSTRAINT "disease_crisis_id_crisis_crisis_id_fk" FOREIGN KEY ("crisis_id") REFERENCES "public"."crisis"("crisis_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hospital" ADD CONSTRAINT "hospital_area_id_area_area_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("area_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hospital_inventory" ADD CONSTRAINT "hospital_inventory_hospital_id_hospital_hospital_id_fk" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospital"("hospital_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff_schedules" ADD CONSTRAINT "staff_schedules_hospital_id_hospital_hospital_id_fk" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospital"("hospital_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplement_and_crisis_priority" ADD CONSTRAINT "supplement_and_crisis_priority_crisis_id_crisis_crisis_id_fk" FOREIGN KEY ("crisis_id") REFERENCES "public"."crisis"("crisis_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplement_and_crisis_priority" ADD CONSTRAINT "supplement_and_crisis_priority_supplement_id_supplement_supplement_id_fk" FOREIGN KEY ("supplement_id") REFERENCES "public"."supplement"("supplement_id") ON DELETE no action ON UPDATE no action;
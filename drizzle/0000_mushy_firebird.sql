CREATE TABLE "hospital" (
	"hospital_id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"area_id" integer,
	"specializations" text,
	"map_location" text,
	"address" text,
	"latitude" text,
	"longitude" text,
	"contact_number" text,
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
	"staff_name" text,
	"specializations" text,
	"shift_start" timestamp,
	"shift_end" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "hospital_inventory" ADD CONSTRAINT "hospital_inventory_hospital_id_hospital_hospital_id_fk" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospital"("hospital_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff_schedules" ADD CONSTRAINT "staff_schedules_hospital_id_hospital_hospital_id_fk" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospital"("hospital_id") ON DELETE no action ON UPDATE no action;
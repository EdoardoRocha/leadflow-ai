/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const exists = await knex.schema.hasTable("leads");

  if (!exists) {
    return knex.schema.createTable("leads", (table) => {
      table.increments("id").primary();
      table.string("external_lead_id", 100).unique();
      table.string("full_name", 255).notNullable();
      table.string("email", 255).notNullable().index("idx_email");
      table.string("phone", 20);
      table.text("raw_message");
      table.decimal("ai_score", 3, 1).defaultTo(0.0);
      table.enu("ai_category", ["HOT", "COLD", "UNKNOWN"]).defaultTo("UNKNOWN");
      table.text("ai_summary");
      table
        .enu("status", ["pending", "processing", "completed", "failed"])
        .defaultTo("pending")
        .index("idx_status");
      table.string("source", 50);
      table.string("campaign_id", 100);
      table.timestamp(true, true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('leads')
};

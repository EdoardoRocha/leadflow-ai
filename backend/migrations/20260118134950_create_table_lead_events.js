/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const exists = await knex.schema.hasTable("lead_events");

  if (!exists) {
    return knex.schema.createTable("lead_events", (table) => {
      table.increments("id").primary();
      table.integer("lead_id").unsigned().notNullable();
      table.string("event_type", 50);
      table.text("description");
      table.json("payload");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .foreign("lead_id")
        .references("id")
        .inTable("leads")
        .onDelete("CASCADE");
    });
}
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('lead_events')
};

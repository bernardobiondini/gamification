/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTableIfNotExists('tasks', (table) => {
        table.increments('id').primary();
        table.string('name', 50).notNull();
        table.string('description', 255).notNull();
        table.integer('points').notNull();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('tasks');
};

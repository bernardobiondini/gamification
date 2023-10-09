/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTableIfNotExists('points', (table) => {
        table.increments('id').primary();
        table.string('description', 255).notNull();
        table.boolean('approved').defaultTo(false);
        table.boolean('cancelled').defaultTo(false);
        table.string('done_in', 10).notNull();
        table.integer('user_id').unsigned().notNull();
        table.integer('task_id').unsigned().notNull();
        table.foreign('user_id').references('users.id');
        table.foreign('task_id').references('tasks.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('points');
};

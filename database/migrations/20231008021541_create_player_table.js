/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTableIfNotExists('users', (table) => {
        table.increments('id').primary();
        table.string('name', 50).notNull();
        table.string('image', 255);
        table.string('email').notNull();
        table.string('password').notNull();
        table.boolean('admin').defaultTo(false);
        table.boolean('active').defaultTo(true);
        table.integer('board_id').unsigned().notNull();
        table.integer('team_id').unsigned();
        table.foreign('board_id').references('boards.id');
        table.foreign('team_id').references('teams.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users');
};

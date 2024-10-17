import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('organizations', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('created_by').references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('organizations');
}

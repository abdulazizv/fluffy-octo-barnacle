import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('projects', (table) => {
    table.increments('id').primary();
    table.integer('org_id').references('id').inTable('organizations').onDelete('CASCADE');
    table.integer('created_by').references('id').inTable('users').onDelete('CASCADE');
    table.string('name').notNullable();
    table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('projects');
}

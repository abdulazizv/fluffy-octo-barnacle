import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('SET NULL'); 
    table.string('token').nullable();
    table.string('login').nullable();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: false}).defaultTo(knex.fn.now())
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}

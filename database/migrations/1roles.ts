import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('roles', function (table) {
    table.increments('id').primary(); 
    table.string('role_name').unique().notNullable(); 
    table.timestamp('created_at').defaultTo(knex.fn.now())
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('roles');
}
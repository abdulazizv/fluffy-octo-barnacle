import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('organization_users', (table) => {
    table.increments('id').primary();
    table.integer('org_id').references('id').inTable('organizations').onDelete('CASCADE');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('role_id').references('id').inTable('roles').onDelete('CASCADE');
    table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('organization_users');
}

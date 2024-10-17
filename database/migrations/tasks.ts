import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('tasks', (table) => {
    table.increments('id').primary();
    table.integer('project_id').references('id').inTable('projects').onDelete('CASCADE');
    table.integer('created_by').references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now());
    table.timestamp('due_date', { useTz: false });
    table.string('description').nullable();
    table.string('task').nullable()
    table.integer('worker_user_id').references('id').inTable('users').onDelete('CASCADE');
    table.enum('status', ['CREATED', 'IN_PROCESS', 'DONE']).defaultTo('CREATED');
    table.timestamp('done_at', { useTz: false });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('tasks');
}

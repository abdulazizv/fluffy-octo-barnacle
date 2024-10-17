import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('tasks').del();
  await knex('projects').del();
  await knex('organization_users').del();
  await knex('organizations').del();
  await knex('users').del();
  await knex('roles').del();

  await knex('roles').insert([
    { role_name: 'Admin' },
    { role_name: 'Tashkilot rahbari' },
    { role_name: 'Tashkilot xodimi' }, 
  ]);

  await knex('users').insert([
    { name: 'Admin User', role_id: 1, created_by: null,login: 'pswdtest' },
    { name: 'Org Leader', role_id: 2, created_by: 1,login: 'pswdtest2' },
    { name: 'Employee 1', role_id: 3, created_by: 1,login:'fakepswdtest' },
    { name: 'Employee 2', role_id: 3, created_by: 2,login: 'fakepswdtest' },
    { name: 'Employee 3', role_id: 3, created_by: 2,login: 'helloworld'},
    { name: 'Org Leader 2', role_id: 3, created_by: 1, login: 'mattt'},
  ]);

  await knex('organizations').insert([
    { name: 'Organization A', created_by: 1 },
    { name: 'Organization B', created_by: 1 },
  ]);

  await knex('organization_users').insert([
    { org_id: 1, user_id: 2,role_id: 2 },
    { org_id: 1, user_id: 3,role_id: 2 },
    { org_id: 2, user_id: 4,role_id: 2 },
    { org_id: 2, user_id: 6,role_id: 3 },
    { org_id: 1, user_id: 5,role_id: 3 }
  ]);


  await knex('projects').insert([
    { org_id: 1, created_by: 2,name: 'Project 1' }, 
    { org_id: 2, created_by: 4,name: 'Project 2' }, 
  ]);

  await knex('tasks').insert([
    {
      project_id: 1,
      created_by: 2,
      task: 'Create a new feature',
      description: 'Develop a new feature for project A',
      due_date: knex.fn.now(),
      worker_user_id: 3,
      status: 'CREATED',
    },
    {
      project_id: 1,
      created_by: 2,
      task: 'Fix bugs',
      description: 'Fix existing bugs in project A',
      due_date: knex.fn.now(),
      worker_user_id: 3,
      status: 'IN_PROCESS',
    },
    {
      project_id: 2,
      created_by: 4, 
      task: 'Setup CI/CD',
      description: 'Setup CI/CD pipeline for project B',
      due_date: knex.fn.now(),
      worker_user_id: 4,
      status: 'DONE',
    },
  ]);
}

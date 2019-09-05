'use strict';

const { test, trait } = use('Test/Suite')('Session');
trait('Test/ApiClient');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

test('it should return JWT token when session created', async ({ assert, client }) => {
  const user = await User.create({
    name: 'Fabio Jr',
    email: 'fabio.junior@uotz.com.br',
    password: '010203'
  });

  const response = await client
    .post('/sessions')
    .send({
      email: 'fabio.junior@uotz.com.br',
      password: '010203'
    })
    .end();
  console.log(response.body.token);
  response.assertStatus(200);
  assert.exists(response.body.token);
});

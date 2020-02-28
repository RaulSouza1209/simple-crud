const express = require('express');

const server = express();

server.use(express.json());

const users = ['Diego', 'Raul', 'Fabiano', 'Cleiton'];

const userExists = (req, res, next) => {
  const { index } = req.params;

  if (!users[index]) {
    return res.json({ error: 'User does not exists' });
  }
  return next();
};

/// Create user
server.post('/users', (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

/// Read users
server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', userExists, (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

/// Update user
server.put('/users/:index', userExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

/// Delete user
server.delete('/users/:index', userExists, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.send();
});

server.listen(3000, console.log('Servidor iniciado'));

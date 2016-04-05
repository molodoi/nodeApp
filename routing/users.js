var users = require('../controllers/users');

app.get('/users', users.index);
app.get('/users/:name', users.one);
app.post('/users', users.create);
app.put('/users', users.update);
app.delete('/users/:id', users.delete);
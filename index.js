const expess = require('express');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');

const sequelize = require('./utils/database');
const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');

const app = expess();

app.use(expess.static(path.join(__dirname, 'public')));
app.use(expess.json());

app.use(
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  }),
);

app.use((req, res, next) => {
  res.sendFile('/index.js');
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT);
  } catch (e) {
    console.error('start server error: ', e);
  }
}

start();

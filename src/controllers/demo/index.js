/**
 * Created by weileizhe on 17/9/1.
 */
import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import auth from 'basic-auth';

const DemoController = express.Router();
DemoController.use(cors());

DemoController.use('/demo', (req, res) => {
  let user = auth(req);
  graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
    rootValue: {user: user},
  })(req,res);
});

export default DemoController;
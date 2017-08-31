/**
 * Created by weileizhe on 17/8/28.
 */
import express from 'express';
import ejs from 'ejs-locals';
import path from 'path';
import router from './router';

// Set up view engine.
let app = express();
app.engine('ejs',ejs);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use("/", router);

export default app;
/**
 * Created by weileizhe on 17/9/1.
 */
import express from 'express';
import DemoController from  './controllers/demo/index';
import CitiesController from './controllers/cities/index';


const router = express.Router();
router.use('/graphql-api',DemoController);
router.use('/graphql-api',CitiesController);

export default router;
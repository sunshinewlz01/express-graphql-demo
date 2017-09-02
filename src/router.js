/**
 * Created by weileizhe on 17/9/1.
 */
import express from 'express';
import DemoController from  './controllers/demo/index';


const router = express.Router();
router.use('/graphql-api',DemoController);

export default router;
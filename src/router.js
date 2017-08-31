/**
 * Created by weileizhe on 17/9/1.
 */
import express from 'express';
import DemoController from  './controllers/DemoController';


const router = express.Router();
router.use('/demo',DemoController);

export default router;
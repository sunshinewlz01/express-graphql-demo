/**
 * Created by weileizhe on 17/8/28.
 */

import express from 'express';

const DemoController = express.Router();

DemoController.get('*', function (req, res, next) {
  res.render('demo', {pageTitle: 'GraphQL demo'});
});

export default DemoController;
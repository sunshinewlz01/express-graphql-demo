/**
 * Created by weileizhe on 17/8/28.
 */
import app from './src/app';
import http from 'http';
import logger from './src/utils/logger.js';

const port = 8080;
app.set('port',port);
let server = http.createServer(app);
server.listen(port);

server.on('listening',onListening);

function onListening() {
  let address = server.address();
  let bindAddress = typeof address === 'string' ? 'pipe ' + address
      : 'port ' + address.port;
  logger.info('Listening on ' + bindAddress);
}
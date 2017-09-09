/**
 * Created by weileizhe on 17/9/6.
 */
import NodeClient from '../core/NodeClient';


class CommonService {
  getCities() {
    const url = 'http://api-hailang.intra.didichuxing.com:6002/api-gateway/blueone/get-cities';
    return NodeClient.get(url);
  }
  getProvinces() {
    const url = 'http://api-hailang.intra.didichuxing.com:6002/api-gateway/blueone/get-provinces';
    return NodeClient.get(url);
  }
}

export default new CommonService();


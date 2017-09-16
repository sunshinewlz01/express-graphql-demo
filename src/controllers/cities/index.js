/**
 * Created by weileizhe on 17/9/5.
 */

import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import co from 'co';
import CommonService from '../../services/CommonService';
import redis from 'redis';


const CitiesController = express.Router();
const redisClient = redis.createClient();
CitiesController.use(cors());

CitiesController.use('/get-cities', (req, res) => {
  if(redisClient.get("provinceGroupCities")) {
    redisClient.get("provinceGroupCities", function(err, reply) {
      console.log(reply.toString());
      let provinceGroupCities = JSON.parse(reply.toString());
      graphqlHTTP({
        schema: schema,
        pretty: true,
        graphiql: true,
        rootValue: {citiesData:provinceGroupCities}
      })(req,res);
    });
  } else {
    getProvinceCities().then((result) => {
      let cities = JSON.parse(result.cities);
      let provinces = JSON.parse(result.provinces);
      let provinceGroupCities = combinedProvinceCities(provinces,cities);
      redisClient.set("provinceGroupCities",JSON.stringify(provinceGroupCities));
      graphqlHTTP({
        schema: schema,
        pretty: true,
        graphiql: true,
        rootValue: {citiesData:provinceGroupCities}
      })(req,res);
    },(error) => {
      console.log(error);
    });

  }


});

const getProvinceCities = async function () {
  let cities = await CommonService.getCities();
  let provinces = await CommonService.getProvinces();
  let provinceCities = {
    cities:cities,
    provinces:provinces
  };
  return provinceCities;
};

// const getProvinceCities = co.wrap(function *(){
//   let cities = CommonService.getCities();
//   let provinces = CommonService.getProvinces();
//   let provinceCities = yield {
//     cities:cities,
//     provinces:provinces
//   };
//   return provinceCities;
// });

const combinedProvinceCities = function(provinces,cities) {
  let combinedProvinceCities = {};
  if(provinces.errno === 0 && cities.errno === 0) {
    combinedProvinceCities.code = 0;
    combinedProvinceCities.msg = null;
    let provinceCitiesData = [];

    for (let province of provinces.data) {
      let provinceItem = {};
      provinceItem.provinceId = province.id;
      provinceItem.provinceName = province.name;
      let cityList = [];
      for (let city of cities.data) {
        if (city.provinceId === provinceItem.provinceId) {
          let cityItem = {};
          cityItem.cityId = city.cityId;
          cityItem.cityName = city.name;
          cityList.push(cityItem);
        }
      }
      provinceItem.cityList = cityList;
      provinceCitiesData.push(provinceItem);
    }
    combinedProvinceCities.data = provinceCitiesData;

  } else {
    combinedProvinceCities.code = 999;
    combinedProvinceCities.msg = '获取RPC接口数据失败';
    combinedProvinceCities.data = null;
  }

  return combinedProvinceCities;
};

export default CitiesController;

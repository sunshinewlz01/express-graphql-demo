/**
 * Created by weileizhe on 17/9/5.
 */
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import CityType from './CityType';

const ProvinceType = new GraphQLObjectType({
  name: 'ProvinceType',
  description: 'province type',
  fields:() => ({
    provinceId: {
      type: GraphQLInt,
    },
    provinceName: {
      type: GraphQLString
    },
    cityList: {
      type: new GraphQLList(CityType),
    }
  }),
});


export default ProvinceType;
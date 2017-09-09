/**
 * Created by weileizhe on 17/9/5.
 */
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

const CityType = new GraphQLObjectType({
  name: 'CityType',
  description: 'city type',
  fields:() => ({
    cityId: {
      type: GraphQLInt,
    },
    cityName: {
      type: GraphQLString
    }
  }),
});


export default CityType;
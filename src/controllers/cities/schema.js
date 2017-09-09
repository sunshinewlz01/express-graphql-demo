/**
 * Created by weileizhe on 17/9/5.
 */
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';
import ProvinceType from './ProvinceType';


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'QueryCities',
    fields: {
      code: {
        type: GraphQLInt,
        resolve: (object, args, context,{rootValue}) => {
          console.log('rootValue '+rootValue);
          return rootValue.citiesData.code;
        },
      },
      data: {
        type: new GraphQLList(ProvinceType),
        resolve: (object, args, context,{rootValue}) => {
          return rootValue.citiesData.data;
        }
      },
      msg: {
        type: GraphQLString,
        resolve: (object, args, context,{rootValue}) => {
          return rootValue.citiesData.msg;
        }
      }

    }
  }),
});

export default schema;
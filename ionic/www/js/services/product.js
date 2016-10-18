/**
 * Created by awichmann on 18/10/2016.
 */
angular.module('starter.services')
.factory('Product',['$resource','appConfig',function ($resource,appConfig) {
    return $resource(appConfig.baseUrl+'/api/client/products',{},{
        query:{
            isArray:false
        }
    });
}])
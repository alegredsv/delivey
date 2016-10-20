/**
 * Created by awichmann on 18/10/2016.
 */
angular.module('starter.services')
.factory('Order',['$resource','appConfig',function ($resource,appConfig) {
    return $resource(appConfig.baseUrl+'/api/client/order/:id',{id: '@id'},{
        query:{
            isArray:false
        }
    });
}])
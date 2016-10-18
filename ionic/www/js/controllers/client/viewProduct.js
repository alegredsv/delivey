/**
 * Created by joeramone on 17/10/2016.
 */


angular.module('starter.controllers')
    .controller('ClientViewProductCtlr', ['$scope','$state','appConfig','$resource', function ($scope, $state, appConfig,$resource) {

        var product = $resource(appConfig.baseUrl+'/api/client/products',{},{
            query:{
                isArray:false
            }
        });
        product.query({},function (data) {
            console.log(data);
        });
    }]);
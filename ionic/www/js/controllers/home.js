
/**
 * Created by joeramone on 12/10/2016.
 */
angular.module('starter.controllers')
    .controller('HomeCtlr', ['$scope','$http','$cookies', 'appConfig',function ($scope,$http,$cookies,appConfig) {



            var parameters = {
                token: $cookies.getObject('token').access_token
            };
            var config = {
                params: parameters
            };

            $http.get(appConfig.baseUrl+'/api/authenticated', config)
                .success(function (data, status, headers, config) {
                   
                    $scope.username =data.data.name;
                })
                .error(function (data, status, header, config) {
                    console.log('erro');

                });


    }]);
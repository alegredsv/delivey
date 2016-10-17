
/**
 * Created by joeramone on 12/10/2016.
 */
angular.module('starter.controllers2',[])
    .controller('HomeCtlr', ['$scope','$http','$cookies',function ($scope,$http,$cookies) {



            var parameters = {
                token: $cookies.getObject('token').access_token
            };
            var config = {
                params: parameters
            };

            $http.get('http://delivery.app/api/authenticated', config)
                .success(function (data, status, headers, config) {
                    console.log('sucesso');
                    $scope.username =data.name;
                })
                .error(function (data, status, header, config) {
                    console.log('erro');
                    // $scope.ResponseDetails = "Data: " + data +
                    //     "<hr />status: " + status +
                    //     "<hr />headers: " + header +
                    //     "<hr />config: " + config;
                });


    }]);
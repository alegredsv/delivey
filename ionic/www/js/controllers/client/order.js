/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
        .controller('ClientOrderCtlr', ['$scope','$state','Order','$ionicLoading',
        function ($scope, $state, Order, $ionicLoading) {
            $scope.items = [];

        $ionicLoading.show({
            template: 'Carregando...'
        })
        Order.query({id:null},function (data) {
            $scope.items = data.data;
            $ionicLoading.hide();
        },function (errorData) {
            $ionicLoading.hide();
        })

    }]);
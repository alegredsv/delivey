/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
    .controller('ClientViewOrderCtlr', ['$scope','$stateParams','ClientOrder','$ionicLoading',
        function ($scope, $stateParams, Order, $ionicLoading) {

        $scope.order = [];
        $ionicLoading.show({
            template: 'Carregando...'
        });

        Order.get({id:$stateParams.id, include:"itens,cupom"},function (data) {
            $scope.order = data.data;
            $ionicLoading.hide();
        }, function (errorData) {
            $ionicLoading.hide();
        });
    }]);
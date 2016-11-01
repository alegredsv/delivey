/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
    .controller('DeliverymanViewOrderCtlr', ['$scope','$stateParams','DeliverymanOrder','$ionicLoading',
        function ($scope, $stateParams, DeliverymanOrder, $ionicLoading) {

        $scope.order = [];
        $ionicLoading.show({
            template: 'Carregando...'
        });

        DeliverymanOrder.get({id:$stateParams.id, include:"itens,cupom"},function (data) {
            console.log(data.data);
            $scope.order = data.data;
            $ionicLoading.hide();
        }, function (errorData) {
            $ionicLoading.hide();
        });
    }]);
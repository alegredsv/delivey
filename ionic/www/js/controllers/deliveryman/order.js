/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
        .controller('DeliverymanOrderCtlr', ['$scope','$state','Order','$ionicLoading',
        function ($scope, $state, Order, $ionicLoading) {
            $scope.items = [];

        $ionicLoading.show({
            template: 'Carregando...'
        });
        $scope.doRefresh = function () {
            getOrders().then(function (data) {
                $scope.items = data.data;
               $scope.$broadcast('scroll.refreshComplete');
            },function (errorData) {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        function getOrders() {
            return Order.query(
                {id:null,
                    orderBy: 'created_at',
                    sortedBy: 'desc'

                }).$promise;
        };
            getOrders().then(function (data) {
                $scope.items = data.data;
                $ionicLoading.hide();
            },function (errorData) {
                $ionicLoading.hide();
            });

        $scope.orderDetail = function (order) {
            $state.go('client.view_order',{id:order.id});
        }
    }]);
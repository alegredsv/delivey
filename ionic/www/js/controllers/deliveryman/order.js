/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
        .controller('DeliverymanOrderCtlr', ['$scope','$state','DeliverymanOrder','$ionicLoading',
        function ($scope, $state, DeliverymanOrder, $ionicLoading) {
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
            return DeliverymanOrder.query(
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
            $state.go('deliveryman.view_order',{id:order.id});
        }
    }]);
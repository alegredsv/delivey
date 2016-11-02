/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
        .controller('ClientOrderCtlr', ['$scope','$state','ClientOrder','$ionicLoading','$ionicActionSheet',
        function ($scope, $state, Order, $ionicLoading,$ionicActionSheet) {
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
        };

        $scope.showActionSheet = function (order) {
            $ionicActionSheet.show({
                buttons:[
                    {text:'Ver detalhes'},
                    {text:'Ver entrega'}
                ],
                titleText:'O que fazer?',
                canceltext:'Cancelar',
                cancel:function () {

                },
                buttonClicked:function (index) {
                    switch (index)
                    {
                        case 0:
                        {
                            $state.go('client.view_order',{id:order.id});
                            break;
                        }
                        case 1:
                        {
                            $state.go('client.view_delivery',{id:order.id});
                            break;
                        }
                    }
                }

            });
        }
    }]);
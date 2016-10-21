/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
    .controller('ClientCheckoutCtlr',
        ['$scope','$state','$cart', 'Order', '$ionicLoading','$ionicPopup','Cupom', function ($scope, $state, $cart, Order, $ionicLoading, $ionicPopup, Cupom) {


            var cart = $cart.get();
            $scope.cupom = cart.cupom;
            $scope.items = cart.items;
            $scope.total = cart.total;

            $scope.removeIndex = function (i) {
                $cart.removeItem(i);
                $scope.items.splice(i,1);
                $scope.total =$cart.get().total;
            };
            $scope.openProductDetail = function (i) {
                $state.go('client.checkout_item_detail',{index: i});
            };
            $scope.openListProducts = function () {
                    $state.go('client.view_products');
            };
            
            $scope.save = function () {

                var items = angular.copy($scope.items);
                angular.forEach(items, function (item) {
                    item.product_id = item.id;
                });
                $ionicLoading.show({
                    template: 'Carregando...'
                })
                Order.save({id:null},{items:items},function (data) {
                    $ionicLoading.hide();
                    $state.go('client.checkout_successful');
                },function (respError) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title:'Advertência',
                        template:'Pedido não realizado -  tente novamente!'
                    })
                });
            };

            $scope.readBarCode = function () {
                getValueCupom(6895);
            };
            $scope.removeCupom = function () {
                $cart.removeCupom();
                $scope.cupom = $cart.get().cupom;
                $scope.total = $cart.getTotalFinal();
            };
            function getValueCupom(code) {
                $ionicLoading.show({
                    template: 'Carregando...'
                })
                Cupom.get({code:code},function (data) {
                        $cart.setCupom(data.data.code,data.data.value);
                        $scope.cupom = $cart.get().cupom;
                        $scope.total = $cart.getTotalFinal();
                        $ionicLoading.hide();
                },
                function (responseError) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title:'Advertência',
                        template:'Cupom inválido!'
                    })
                });
            }

    }]);
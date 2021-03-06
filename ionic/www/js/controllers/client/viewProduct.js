/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
    .controller('ClientViewProductCtlr', ['$scope','$state','Product','$ionicLoading','$cart',
        function ($scope, $state, Product, $ionicLoading, $cart) {

        $scope.products = [];
        $ionicLoading.show({
            template: 'Carregando...'
        })

        Product.query({},function (data) {
            $scope.products = data.data;
            $ionicLoading.hide();
        }, function (errorData) {
            $ionicLoading.hide();
        });

        $scope.addItem = function (item) {
            // cart.items.push(item);
            // $state.go('client.checkout');
            item.qtd = 1;
            $cart.addItem(item);
            $state.go('client.checkout');
        };
    }]);
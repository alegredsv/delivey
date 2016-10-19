/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
    .controller('ClientViewProductCtlr', ['$scope','$state','Product','$ionicLoading','cart','$localStorage', function ($scope, $state, Product, $ionicLoading, cart,$localStorage) {
        $localStorage.setObject('cart',{
            name:'Ionic',
            version: '1.0.0'
        });
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
            cart.items.push(item);
            $state.go('client.checkout');
        };
    }]);
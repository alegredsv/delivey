/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
    .controller('ClientCheckoutCtlr',
        ['$scope','$state','$cart', function ($scope, $state, $cart) {

            var cart = $cart.get();

            $scope.items = cart.items;
            $scope.total = cart.total;

            $scope.removeIndex = function (i) {
                $cart.removeItem(i);
                $scope.items.splice(i,1);
                $scope.total =$cart.get().total;
            }
            $scope.openProductDetail = function (i) {
                $state.go('client.checkout_item_detail',{index: i});
            }
            $scope.openListProducts = function () {
                $state.go('client.view_products');
            }
           // $scope.showDelete = true;

    }]);
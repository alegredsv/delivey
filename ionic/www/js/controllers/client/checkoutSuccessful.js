/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
    .controller('ClientCheckoutSuccessfulCtlr',
        ['$scope','$state','$cart', function ($scope, $state, $cart) {

            var cart = $cart.get();
            $scope.items = cart.items;
            $scope.total = cart.total;
            $cart.clear();
            
            $scope.openListOrder = function () {
                
            }
        }]);

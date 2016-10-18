/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
    .controller('ClientCheckoutCtlr', ['$scope','$state','cart', function ($scope, $state, cart) {
        $scope.items = cart.items;
console.log(window.localStorage['cart']);
    }]);
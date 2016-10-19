/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
    .controller('ClientCheckoutCtlr', ['$scope','$state','cart','$localStorage', function ($scope, $state, cart,$localStorage) {
        $scope.items = cart.items;
        console.log($localStorage.getObject('cart'));
    }]);
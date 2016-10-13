/**
 * Created by joeramone on 12/10/2016.
 */
angular.module('starter.controllers',[]).controller('HomeCtlr', function ($scope,$state,$stateParams) {
    $scope.state = $state.current.name;
    $scope.nome = $stateParams.nome;
});
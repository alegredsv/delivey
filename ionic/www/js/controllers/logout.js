/**
 * Created by joeramone on 12/10/2016.
 */
angular.module('starter.controllers')
    .controller('LogoutCtlr', ['$scope','$state','OAuthToken','UserData','$ionicHistory',
        function ($scope,$state, OAuthToken, UserData,$ionicHistory) {
            OAuthToken.removeToken();
            UserData.set(null);
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });
            $state.go('login');
}]);
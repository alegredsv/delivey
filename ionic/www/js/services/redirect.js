/**
 * Created by awichmann on 19/10/2016.
 */
angular.module('starter.services')
.service('$redirect',['$state','UserData','appConfig',function ($state,UserData,appConfig) {
   this.redirectAfterLogin = function () {
       var user = UserData.get();
       $state.go(appConfig.redirectAfterLogin[user.role]);
   };
    
}]);
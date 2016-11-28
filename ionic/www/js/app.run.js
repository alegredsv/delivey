/**
 * Created by joeramone on 27/11/2016.
 */
angular.module('starter.run').run(['PermPermissionStore','OAuth','UserData','PermRoleStore',
    '$rootScope','authService','$state',
    function (PermPermissionStore,OAuth,UserData,PermRoleStore,
              $rootScope,authService,$state) {
    PermPermissionStore.definePermission('user-permission',function () {
        return OAuth.isAuthenticated();
    });

    PermPermissionStore.definePermission('client-permission',function () {
        var user = UserData.get();
        if(user == null || !user.hasOwnProperty('role')){
            return false;
        }
        return user.role  == 'client';
    });
    PermRoleStore.defineRole('client-role',['user-permission','client-permission']);

    PermPermissionStore.definePermission('deliveryman-permission',function () {
        var user = UserData.get();
        if(user == null || !user.hasOwnProperty('role')){
            return false;
        }
        return user.role  == 'deliveryman';
    });
     PermRoleStore.defineRole('deliveryman-role',['user-permission','deliveryman-permission']);

       $rootScope.$on('event:auth-loginRequired',function (event, data) {
           OAuth.getRefreshToken().then(function (data) {
               authService.loginConfirmed(data, function(config) {
                   config.headers.Authorization = data.authorizationToken;
                   return config;
               });
           },function (errorData) {
               $state.go('logout');
           })
       });
}]);
/**
 * Created by awichmann on 19/10/2016.
 */
angular.module('starter.services')
.factory('UserData',['$localStorage',function ($localStorage) {
    var key='user';
    return{
        set:function (value) {
            return $localStorage.setObject('user',value);

        },
        get:function (key) {
            return $localStorage.getObject('user');
        }
    }
    
}]);
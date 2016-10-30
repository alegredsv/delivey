/**
 * Created by joeramone on 30/10/2016.
 */
angular.module('starter.filters')
.filter('join',function () {
    return function (imput,joinStr) {
        return imput.join(joinStr);
    }
});
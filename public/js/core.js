var rss=  angular.module('rahil', ['ngRoute']);
rss.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/',{
                templateUrl: '/index1.html',
                controller: 'mainController'
            }).
            when('/:acct', {
                templateUrl: '/in2.html',
                controller: 'AcctCtrl'
            });

    }]);
rss.controller('mainController', ['$scope','$http', function($scope, $http) {

    $http({
        method: 'GET',
        url: '/SalesForceAPI/number'
    }).then(function successCallback(response) {
        $scope.vals=response.data;
    }, function errorCallback(response) {
        alert('error' + response);
    });
}])
    rss.controller('AcctCtrl', ['$scope','$http', function($scope, $http) {
        var hjk= window.location.href.split('/');
        console.log(hjk[4]);
        $http({
            method: 'GET',
            url: '/Sales/'+hjk[4]
        }).then(function successCallback(response) {
            $scope.nmu=response.data.length;
            $scope.accounts.actNum=response.data.acctNm;
            $scope.accounts=response.data.accts;
        }, function errorCallback(response) {
            alert('error' + response);
        });}])

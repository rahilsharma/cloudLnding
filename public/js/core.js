var rss=  angular.module('rahil', ['ngRoute']);
rss.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/',{
                templateUrl: '/first.html',
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
        $scope.showdownloader=false;
        $http({
            method: 'GET',
            url: '/Sales/'+hjk[4]
        }).then(function successCallback(response) {
            $scope.completeObj=response.data;
            $scope.showdownloader=true;
            console.log($scope.completeObj);
        }, function errorCallback(response) {
            alert('error' + response);
        });}])

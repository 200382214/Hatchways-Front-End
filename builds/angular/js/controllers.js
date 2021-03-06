var myControllers = angular.module('myControllers', []);

myControllers.controller('SearchController', 
  function MyController($scope, $http) {
    $http.get('js/data.json').then(function(response) {
      $scope.users = response.data;
      $scope.userOrder = 'login';
  });
});



myControllers.controller('DetailsController', 
function MyController($scope, $http, $routeParams, $firebaseArray) {
  $http.get('js/data.json').then(function(response) {

    var ref = firebase.database().ref();
    var loveRef = ref.child('love')
    var loveInfo = $firebaseArray(loveRef);

    $scope.loves = loveInfo;

    $scope.sendLove = function() {
      loveInfo.$add({
        love: $scope.love,
        date: firebase.database.ServerValue.TIMESTAMP
      }).then(function() {
        $scope.love='';
      }); //promise
    } //addlOVE

    $scope.users = response.data;
    $scope.whichItem = $routeParams.itemId;

    if ($routeParams.itemId > 0) {
      $scope.prevItem = Number($routeParams.itemId) - 1;
    } else {
      $scope.prevItem = $scope.users.length - 1;
    }

    if ($routeParams.itemId < $scope.users.length-1) {
      $scope.nextItem = Number($routeParams.itemId) + 1;
    } else {
      $scope.nextItem = 0;
    }

});
});
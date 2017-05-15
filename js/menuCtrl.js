AgriApp.controller('menuCtrl', function($scope, model){

  $scope.user = model.getUserName();


  $scope.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    /* Set the width of the side navigation to 0 */
  $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
    }


});

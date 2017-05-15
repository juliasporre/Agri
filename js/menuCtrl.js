AgriApp.controller('menuCtrl', function($scope, model){

  $scope.user = model.getUserName();
  var open = false;

  $scope.openNav = function() {
        if(open == false){
          document.getElementById("mySidenav").style.width = "250px";
          open = true;
        }else{
          document.getElementById("mySidenav").style.width = "0";
          open = false;
        }


    }

    /* Set the width of the side navigation to 0 */
  $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
    }


});

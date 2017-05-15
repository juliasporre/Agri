AgriApp.controller('favoriteCtrl', function($scope, model, $location){
  $scope.MenuTitle = "Favorites";
  var urlOrg = window.location.href;
  var splitedUrl = urlOrg.split("favorites");
  $scope.url = splitedUrl[0];

  $scope.obj = true;
  $scope.search = false;
  $scope.favExcists = false;

  var favsID= model.getFavoriteCourses();

  var list = model.getList();
  var right = [];
  var watch = [];
  for(var i = 0; i < list.length; i++){
    if ((favsID.indexOf(list[i].id ) >= 0)){
      right.push(list[i]);
    }
  }


  if (right.length == 0){
    $scope.favExcists = false;
  } else {
    $scope.favExcists = true;
  }

  var watch = model.checkSaved();
  if (watch.length == 0){
    $scope.watchExcists = false;
  } else {
    $scope.watchExcists = true;
  }
  $scope.persons = right;
  $scope.animals = watch;


  $scope.goToCourse = function(course) {
    $location.path('/course/'+course);
}

  $scope.remove = function(course){
    model.removeFromFavorite(course);
  }

  $scope.goChat = function(path){
    if(path == 'obj'){
      $scope.obj = true;
      $scope.search = false;
      $scope.MenuTitle = "Favorites";

    }
    if(path == 'search'){

      $scope.obj = false;
      $scope.search = true;
      $scope.MenuTitle = "Watched";
    }
  }

});

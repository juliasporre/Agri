AgriApp.controller('courseCtrl', function($scope, model, $routeParams){

  $scope.MenuTitle = "New Ad";

  var urlOrg = window.location.href;
  var splitedUrl = urlOrg.split('course/');
  $scope.url = splitedUrl[0];

  var code = $routeParams.courseCode;

  $scope.isFavoriteCourse = model.isFavoriteCourse(code);

  var list = model.getList();
  for(var i = 0; i < list.length; i++){
    if (list[i].id == code){
      $scope.course = list[i];
      $scope.MenuTitle = list[i].name;
    }
  }


  $scope.addFavorite = function(){
    model.addToFavorite(code);
    $scope.isFavoriteCourse = model.isFavoriteCourse(code);

  }

  $scope.removeFavorite = function(){
    model.removeFromFavorite(code);
    $scope.isFavoriteCourse = model.isFavoriteCourse(code);
  }


});

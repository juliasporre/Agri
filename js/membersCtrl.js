AgriApp.controller('membersCtrl', function($scope, model, $location){

  $scope.MenuTitle = "New Ad";
  var urlOrg = window.location.href;
  var splitedUrl = urlOrg.split('search');
  $scope.url = splitedUrl[0];

  $scope.woods = false;
  $scope.crops = false;



  $scope.getSubType = function(type){
    console.log("getting subtype");
    if (type == 'Woods'){
      $scope.woods = true;
      $scope.crops = false;
    } else if (type == 'Crops'){
      $scope.woods = false;
      $scope.crops = true;
    } else {
      $scope.woods = false;
      $scope.crops = false;
    }
  }

  var goto = function(){
    console.log("going away!");
    $location.path('/search');
  }

  $scope.addAd = function(title, price, size, area, type, subtypeWoods, subtypeCrops, desc){
    var id = model.getList().length;
    console.log(subtypeWoods);
    console.log(subtypeCrops);

    if(type == 'Woods'){
          var obj = {id: id, name: title, area: area, size: size, img: "forest1.jpg", type:type, subtype: subtypeWoods, description: desc, price: price};
    } else if (type == 'Crops'){
          var obj = {id: id, name: title, area: area, size: size, img: "forest1.jpg", type:type, subtype: subtypeCrops, description: desc, price: price};
    } else {
      var obj = {id: id, name: title, area: area, size: size, img: "forest1.jpg", type:type, subtype: subtypeCrops, description: desc, price: price};
    }
    console.log(obj);
    model.addToList(obj);

    alert("Your ad was successsfully added.");
    goto();

  }



});

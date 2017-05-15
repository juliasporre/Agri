AgriApp.controller('searchCtrl', function($scope, model, $location){

  $scope.MenuTitle = "Ads";
  var urlOrg = window.location.href;
  var splitedUrl = urlOrg.split('search');
  $scope.url = splitedUrl[0];
  $scope.userName = model.getUserName();

  $scope.recentCourses = model.getRecentCourses();

  $scope.hasSearch = false;
  $scope.found = true;

  $scope.woods = false;
  $scope.crops = false;


var match = model.checkSaved();
if(match.length > model.noMatches){
  alert("There is a new ad that might be good for you, go and check it out!");
  model.noMatches = match.length;
}

 $scope.subbisar = function(type){
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

  $scope.search = function(query,area, type, subtypeWoods,subtypeCrops){
    $scope.hasSearch = false;
    var list = model.getList();
    var hits = [];
    var subtype = "";
    $scope.status = "Searching...";

    var matching = [];
    if(query != undefined && query != 'all' ){
      for (var i = 0; i < list.length; i++){
        if(list[i].description.indexOf(query) !== -1){
          matching.push(list[i]);
        }
      }

    } else {
      matching = list;
    }

    if (area != undefined && area != 'all'){
      hits = [];
      for (var j = 0; j < matching.length; j++){
        if(matching[j].area == area){
          hits.push(matching[j]);
        }
      }
      matching = hits;
    }

    if (type != undefined && type != 'all'){
      hits = [];
      for (var k = 0; k < matching.length; k++){
        if(matching[k].type == type){
          hits.push(matching[k]);
        }
      }
      matching = hits;

        if(type == 'Woods'){
          subtype = subtypeWoods;
        } else if (type == 'Crops'){
          subtype = subtypeCrops;
        }

        if (subtype != undefined && subtype != 'all'){
          hits = [];
          for (var l = 0; l < matching.length; l++){
            if(matching[l].subtype == subtype){
              hits.push(matching[l]);
            }
          }
          matching = hits;
        }


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
    //check price and size
    if($scope.advanced){
      var priceMin = $scope.priceMin;
      var priceMax = $scope.priceMax;
      var sizeMin = $scope.sizeMin;
      var sizeMax =  $scope.sizeMax;


      hits = [];
      for (var k = 0; k < matching.length; k++){
        if(priceMin != undefined && priceMax != undefined){
          if(priceMin <= parseInt(matching[k].price) && parseInt(matching[k].price) <= priceMax){
            hits.push(matching[k]);
          }

      } else if (priceMin == undefined && priceMax != undefined){
        if(parseInt(matching[k].price) <= priceMax){
          hits.push(matching[k]);
        }
      } else if (priceMin != undefined && priceMax == undefined){
        if(priceMin <= parseInt(matching[k].price)){
          hits.push(matching[k]);
        }
      } else {
        hits = matching;
      }
      }

      matching = hits;
      hits = [];
      for (var k = 0; k < matching.length; k++){
      if(sizeMin != undefined && sizeMax != undefined){
          if(priceMin <= parseInt(matching[k].size) && parseInt(matching[k].size) <= priceMax){
            hits.push(matching[k]);
          }
      } else if (sizeMin == undefined && sizeMax != undefined){
        if(parseInt(matching[k].size) <= sizeMax){
          hits.push(matching[k]);
        }
      } else if (sizeMin != undefined && sizeMax == undefined){
        if(sizeMin <= parseInt(matching[k].size)){
          hits.push(matching[k]);
        }
      } else {
        hits = matching;
      }
      matching = hits;
    }
    }
    $scope.matches = matching;

    $scope.status = "Found " + matching.length + " match(es)";
    if (matching.length == 0){
      $scope.hasSearch = false;
      $scope.found = false;

    }else{
      $scope.hasSearch = true;
      $scope.found = true;
    }
  }

  $scope.isFavoriteCourse = function(code){
    return model.isFavoriteCourse(code);
  }

  $scope.addFavorite = function(code){
    model.addToFavorite(code);
    $scope.isFavoriteCourse = model.isFavoriteCourse(code);

  }

  $scope.goAdva = function(){
  /*  if(!$scope.advanced){
      $scope.priceMin = "";
      $scope.priceMax = "";
      $scope.sizeMin = "";
      $scope.sizeMax = "";
    }*/
  }

  $scope.removeFavorite = function(code){
    model.removeFromFavorite(code);
    $scope.isFavoriteCourse = model.isFavoriteCourse(code);
  }

  $scope.goToCourse = function(course) {
      $location.path('/course/'+course);
  }

  $scope.saveSearch = function(query,area, type, subtypeWoods,subtypeCrops, priceMin, priceMax, sizeMin,sizeMax){

    if(type == 'Woods'){
      var subtype = subtypeWoods;
    } else if (type == 'Crops'){
      var subtype = subtypeCrops;
    }
    model.addToSave({desc: query,area: area, type: type, subtype: subtype, priceMin: priceMin,priceMax: priceMax,sizeMin: sizeMin,sizeMax: sizeMax})
    alert("You are now watching this search!");
  }

});

AgriApp.controller('privateMessagesMenuCtrl', function($scope, model, $location){

  $scope.MenuTitle = "Messages"
  var urlOrg = window.location.href;
  var splitedUrl = urlOrg.split('privateMessages');
  $scope.url = splitedUrl[0];
  $scope.urlMess = urlOrg;
  $scope.persons = [{username: "kalleanka",
                    name: "Kalle Anka"
                  },
                  {username: "blabla",
                      name: "Bla Bla"
                  }];


  $scope.goBack = function() {
    window.history.back();
  }

  $scope.goChat = function(user) {
    console.log(user);
    $location.path('/privateMessages/'+user);
  }

});

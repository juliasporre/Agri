var AgriApp = angular.module( 'Agri', [ 'ngRoute', 'ngResource'] );

AgriApp.config( [ '$routeProvider',
    function( $routeProvider ) {
        $routeProvider.
        when( '/', { // INITAL PAGE LOAD ONLY
            templateUrl: 'partials/landingView.html',
            controller: 'landingCtrl'
        } ).
        when( '/search', {
            templateUrl: 'partials/searchView.html',
            controller: 'searchCtrl'
        } ).
        when( '/profile/:userID', {
            templateUrl: 'partials/profileView.html',
            controller: 'profileCtrl'
        } ).
        when( '/menu', {
            templateUrl: 'partials/menuView.html',
            controller: 'menuCtrl'
        } ).
        when( '/members', {
            templateUrl: 'partials/membersView.html',
            controller: 'membersCtrl'
        } ).
        when( '/privateMessages/:userID', {
            templateUrl: 'partials/privateMessagesView.html',
            controller: 'privateMessagesCtrl'
        } ).
        when( '/privateMessages', {
            templateUrl: 'partials/privateMessagesMenuView.html',
            controller: 'privateMessagesMenuCtrl'
        } ).
        when( '/chatRoom/:room', {
            templateUrl: 'partials/chatRoom.html',
            controller: 'chatRoomCtrl'
        } ).
        when( '/lunch', {
            templateUrl: 'partials/lunchView.html',
            controller: 'lunchCtrl'
        } ).
        when( '/course/:courseCode', {
            templateUrl: 'partials/courseView.html',
            controller: 'courseCtrl'
        } ).
        when( '/favorites', {
            templateUrl: 'partials/favoriteView.html',
            controller: 'favoriteCtrl'
        } ).
        otherwise( {
            redirectTo: '/search'
        } );
    }
] );

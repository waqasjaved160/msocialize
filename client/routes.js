/**
 * Created by waqas_000 on 12/15/2015.
 */
angular.module('socialize').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        //.state('index', {
        //    url: '/',
        //    templateUrl: 'index.html'
        //})
        .state('home', {
            url: '/home',
            templateUrl: 'client/home.html',
            controller: 'HomeController'
        })
        .state('rooms', {
            url: '/rooms',
            templateUrl: 'client/rooms/views/rooms-list.html',
            //controller: 'RoomsListCtrl',
            //resolve: {
            //    "currentUser": function ($meteor) {
            //        return $meteor.requireUser();
            //    }
            //}
        })
        .state('roomDetails', {
            url: '/rooms/:roomId',
            templateUrl: 'client/rooms/views/rooms-details.html',
            //controller: 'RoomDetailsCtrl'
        });

    $urlRouterProvider.otherwise("/index");
});
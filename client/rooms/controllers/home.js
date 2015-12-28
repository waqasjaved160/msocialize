/**
 * Created by waqas_000 on 12/17/2015.
 */
angular.module('socialize').controller('HomeController', function($scope, $meteor, $mdSidenav){

    $scope.imagePath = "/images/profile.png";
    $scope.previousBtn = "";
    $scope.initialize = function (){
      $scope.table_class = "";
    };
    $scope.peopleOpen = function () {
        $mdSidenav('left').open();
    };
    $scope.peopleClose = function () {
        $mdSidenav('left').close();
    };
    $scope.rooms = $meteor.collection(Rooms);
    $scope.messages = $meteor.collection(function(){
        //return Messages.find({}, {sort: {createdAt: 1}, limit: Session.get("messageLimit")});   // Newest will come at the bottom.
        return Messages.find({}, {sort: {createdAt: 1}});   // Newest will come at the bottom.
    });

    //$scope.messages = {};
    $scope.selectedRoom = {};

    $scope.toggleActive = function (room) {
        if (this.table_class != "selected-button") {
            if ($scope.previousBtn !== "") {
                $scope.previousBtn.table_class = "";
            }
            this.table_class = "selected-button";
            $scope.selectedRoom = room;
            $scope.previousBtn = this;
        } else {
            $scope.previousBtn.removeClass("selected-button");
        }
    };

    $scope.recentMessages =  function () {
      return Messages.find({}, {sort: {createdAt: 1}});
    };
    $scope.sendMessage = function () {
        this.message.owner = Meteor.userId();
        this.message.createdAt = new Date();
        this.message.roomId = $scope.selectedRoom._id;
        Messages.insert(this.message);
        this.message = {};
    };
    $scope.openRoom = function (roomId){
        $scope.messages = $meteor.collection(function (){
            return Messages.find({roomId: roomId}, {sort: {createdAt: 1}});
        });
    };
    $scope.deleteRoom = function (room){
        $scope.rooms.remove(room);
    };
    $scope.deleteMessage = function (message){
        $scope.messages.remove(message);
    };

    $scope.getUserById = function (userId) {
        var user = Meteor.users.findOne({_id: userId});
        if (user) {
            return user.username;
        } else {
            return "Anonymous";
        }
    };
});


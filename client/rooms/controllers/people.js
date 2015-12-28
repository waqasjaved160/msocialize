/**
 * Created by waqas_000 on 12/17/2015.
 */
angular.module('socialize').controller('PeopleCtrl', function($scope, $meteor, $mdSidenav, $mdDialog, $mdMedia){
    $scope.rooms = $meteor.collection(Rooms);

    $scope.showAdvanced = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'client/rooms/views/add-room.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };

});

function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
    $scope.addRoom = function () {
        this.room.owner = Meteor.userId();
        this.room.createdAt = new Date();
        Rooms.insert(this.room);
        this.room = {};
        $scope.hide();
    };
}
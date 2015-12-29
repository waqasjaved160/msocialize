/**
 * Created by waqas_000 on 12/30/2015.
 */
angular.module("socialize").directive('login', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/auth/views/login.html',
        controllerAs: 'login',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.credentials = {
                email: '',
                password: ''
            };

            this.error = '';

            this.login = Meteor.loginWithPassword(this.credentials.email, this.credentials.password, function (error) {
                if (error) {
                    this.error = error;
                } else {
                    $state.go('parties');
                }
            });
        }
    }
});
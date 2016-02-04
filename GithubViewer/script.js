(function () {

    var MainCtrl = function ($scope, $http, $interval, $log, $anchorScroll, $location) {
        $scope.username = "angular";
        $scope.Message = "Github Viewer";
        $scope.countdown = 5;

        var OnError = function () {
            $scope.error = "Could not find user information.";
        };



        var decrementcountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        }

        var countdowninterval = null;
        var startcountdown = function () {
            countdowninterval = $interval(decrementcountdown, 1000, $scope.countdown);
        }

        onRepos = function (response) {

            $scope.repos = response.data;
            $location.hash("userDetails");
            $anchorScroll();

        }

        onusercomp = function (response) {
            $scope.user = response.data;
            $location.hash("userDetails");
            $anchorScroll();
            console.log("This is the user info"+$scope.user.repos_url)
            $http.get($scope.user.repos_url).then(onRepos, OnError)
        }

        $scope.search = function (username) {
            $log.info('searching for : ' + username);
            $http.get('https://api.github.com/users/' + username)
            .then(onusercomp, OnError);

            if ($scope.countdown) {
                $interval.cancel(countdowninterval);
                $scope.countdown = null;
            }
        }

        startcountdown();

    };
    var app = angular.module("githubviewer");
    app.controller('MainCtrl', MainCtrl);
})();

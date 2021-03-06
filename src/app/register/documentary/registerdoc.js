angular
  .module('app')
  .controller('regDoc', function ($scope, $rootScope, $http, $mdToast, $translate, $state, $stateParams, Cities, $mdDialog) {
    $translate('DOCUMENTARY').then(function (value) {
      $scope.textCat = value;
    });
    $rootScope.$on('langChange', function () {
      $translate('DOCUMENTARY').then(function (value) {
        $scope.textCat = value;
      });
    });
    $scope.countries = Cities.query();
    $scope.formData = {};
    $scope.formData.nfilms = 1;
    $scope.formData.valCat = 2;
    $scope.process = function () {
      $http.post('/api/newCompetitor', $scope.formData)
      .success(function (data) {
        if (data === 'emailOK') {
          $translate('REGISTER.SATISFACTORY').then(function (value) {
            $mdToast.show(
              $mdToast.simple()
                .textContent(value)
                .position('top right')
                .hideDelay(6000)
            );
          });
          $state.go('login');
        }
      });
    };
    $scope.showTerms = function (ev) {
      var url = 'app/register/term_' + $translate.use() + '.html';
      $mdDialog.show({
        templateUrl: url,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    };
  });

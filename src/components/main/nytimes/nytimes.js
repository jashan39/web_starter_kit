"use strict";
app.controller('controller.main.nytimes', ['_', '$scope', '$state', 'api.nytimes', (_, $scope, $state, $nytimes) => {

  $scope.search = "";
  $scope.articleSearchResults = null;
  $scope.searching = false; // No search running

  $scope.searchNYT = () => {

    $scope.searching = true; // Search now running

    $nytimes.article.search($scope.search).then(
      (articles) => {

        $scope.searching = false; // Search done

        console.log('Articles', articles);
        $scope.articleSearchResults = articles;
      },
      (err) => {
        console.log('Search failed...', err);
      }
    )

  }

}]);

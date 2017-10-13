/**
 * DEMO API
 *
 * This API factory implements the New York Times Developer API
 * This has been built purely for demonstration purposes.
 *
 * Author: Brandon Pierce <bpierce@bcgsc.ca>
 * BCGSC Username: bpierce
 * Hipchat Room: NodeJS Developers
 *
 */
app.factory('api.nytimes', ['_', '$http', '$q', (_, $http, $q) => {

  const api = 'https://api.nytimes.com/svc/search/v2';
  let $nytimes = {};
  let APIKey = '89ba2060078b4d39816e988af5dae7e1'; // Key I've created for my own use.

  /**
   * New York Times Articles
   *
   */
  $nytimes.article = {

    /**
     * Create a BCGSC JIRA Ticket
     *
     * @param {string} search - A string to search with
     * @param {string} begin_date? - Starting date for search window
     * @param {string} end_date? - Ending date for search window
     *
     * @returns {Promise} - Resolves with a NYT article, rejects with an error object containing status code and body of error
     */
    search: (search, begin_date, end_date) => {

      // Create Promise
      let deferred = $q.defer();

      let parameters = {};
      parameters['api-key'] = APIKey;
      if(begin_date) parameters.begin_date = begin_date;
      if(end_date) parameters.end_date = end_date;

      // Send POST to JIRA
      $http.get(api + '/articlesearch.json', {params: parameters}).then(
        (response) => {
          // Some data checks and validation can happen here.

          // Resolve response (satisfy promise)
          deferred.resolve(response.data.response.docs);
        },
        (error) => {
          // Reject (like throwing an exception)
          deferred.reject({status: error.status, body: error.data});
        }
      );

      // Return promise handler
      return deferred.promise;
    }
  };

  return $nytimes;

}]);

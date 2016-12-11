if (typeof XMLHttpRequest === 'undefined') {
  var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
}

(function(exports) {

  exports.myUsername = function(url) {
    return new Promise(function(resolve, reject) {

      request("GET", url + "/rest/api/2/myself")
        .then(function(data) {
          resolve(data.key);
        })
        .catch(reject);

    });
  };

  exports.loggedTimeOf = function(url, username, date) {
    return new Promise(function(resolve, reject) {

      request("GET", url + "/rest/api/2/search?jql=worklogDate>-1d&fields=worklog")
        .then(function(data) {
          var loggedSeconds = 0;

          for (var issueIndex in data.issues) {
            var worklogs = data.issues[issueIndex].fields.worklog.worklogs;
            for (var worklogIndex in worklogs) {
              var worklog = worklogs[worklogIndex];

              var started = new Date(worklog.started);
              if (worklog.author.key === username
                && date.getFullYear() === started.getFullYear()
                && date.getMonth() === started.getMonth()
                && date.getDate() === started.getDate()) {
                loggedSeconds += worklog.timeSpentSeconds;
              }
            }
          }

          resolve(loggedSeconds);
        })
        .catch(reject);

    });
  };

  exports.inProgressIssuesOf = function(url, username) {
    return new Promise(function(resolve, reject) {

      request("GET", url + "/rest/api/2/search?jql=assignee=\"" + username + "\" and statusCategory=\"In Progress\"")
        .then(function(data) {
          resolve(data.issues);
        })
        .catch(reject);

    });
  }

  function request(method, url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
  };

})(typeof exports === 'undefined' ? this['Jira'] = {} : exports);

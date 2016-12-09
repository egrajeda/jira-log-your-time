(function() {

  chrome.storage.sync.get("url", function(data) {

    Jira.myUsername(data.url)
      .then(function(username) {
        return Jira.loggedTimeOf(data.url, username, new Date());
      })
      .then(function(loggedSeconds) {
        var element = document.getElementById("logged-time");
        element.textContent = LoggedTime.toString(loggedSeconds);
        element.className = LoggedTime.isEnough(loggedSeconds, new Date()) ? "logged-time good" : "logged-time bad";
      });

  });


})();


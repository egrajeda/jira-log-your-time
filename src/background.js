(function() {

  chrome.alarms.create('refresh', {periodInMinutes: 5});
  chrome.alarms.onAlarm.addListener(checkIfLoggedTimeIsEnough);

  checkIfLoggedTimeIsEnough();

  function checkIfLoggedTimeIsEnough() {
    chrome.storage.sync.get("url", function(data) {

      Jira.myUsername(data.url)
        .then(function(username) {
          return Jira.loggedTimeOf(data.url, username, new Date());
        })
        .then(function(loggedSeconds) {
          var badgeText = LoggedTime.isEnough(loggedSeconds, new Date()) ? "" : "LOG";
          chrome.browserAction.setBadgeText({ text: badgeText });
          chrome.browserAction.setBadgeBackgroundColor({ color: "#e44c41" });
        });

    });
  }

})();

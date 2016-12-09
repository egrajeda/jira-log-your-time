(function(exports) {

  const WORK_START_TIME = 10
    , WORK_END_TIME = 18
    , SECONDS_TO_LOG_PER_DAY = 3600 * 5;

  exports.toString = function(loggedSeconds) {
    return pad(Math.floor(loggedSeconds / 3600), 2) + 'h '
      + pad(Math.floor((loggedSeconds % 3600) / 60), 2) + 'm';
  };

  exports.isEnough = function(loggedSeconds, date) {
    return loggedSeconds >= minutesAtWork(date) * secondsToLogPerMinute();
  }

  function pad(number, length) {
    var string = number + "";
    while (string.length < length) {
      string = "0" + string;
    }

    return string;
  };

  function minutesAtWork(date) {
    return Math.max(0, (date.getHours() - WORK_START_TIME) * 60);
  }

  function secondsToLogPerMinute() {
    var workingMinutesPerDay = (WORK_END_TIME - WORK_START_TIME) * 60;
    return SECONDS_TO_LOG_PER_DAY / workingMinutesPerDay;
  }

})(typeof exports === 'undefined' ? this['LoggedTime'] = {} : exports);

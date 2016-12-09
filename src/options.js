(function() {

  var urlInput = document.getElementById('url');
  urlInput.addEventListener('change', validateForm);
  urlInput.addEventListener('keypress', validateForm);

  document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get({
      url: '',
    }, function(items) {
      urlInput.value = items.url;
      urlInput.dispatchEvent(new Event('change'));
    });
  });

  document.getElementById('save').addEventListener('click', function() {
    var url = urlInput.value;

    chrome.permissions.request({
      origins: [url + '/rest/*']
    });

    chrome.storage.sync.set({
      url: url
    }, function() {
      window.close();
    });
  });

  document.getElementById('cancel').addEventListener('click', function() {
    window.close();
  });

  function validateForm() {
    var button = document.getElementById('save');

    var form = document.getElementById('options-form');
    if (form.checkValidity()) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  }

})();

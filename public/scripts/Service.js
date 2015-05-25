var RestService = {
          fire: function (url, method, param, success, cbError) {
            var request = {
              url: url,
              type: method,
              cache: false,
              success: function(data) {
                if (typeof cbSuccess === 'function') {
          cbSuccess(data);
        }
      },
      error: function(xhr, status, err) {
        if (typeof cbSuccess === 'function') {
          cbError(xhr, status, err);
        }
      }
    };
    if (method === "GET") {
      request.url += '?' + $.param(param);
    } else {
      request.data = param;
    }
    $.ajax(request);
  }
};

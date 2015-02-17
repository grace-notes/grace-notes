(function() {
  var $, unique;

  $ = jQuery;

  $(document).ready(function() {
    var key, l, letters, _i, _len;
    $("body").on('click', 'a[href*=".pdf"]', function(e) {
      var url;
      e.preventDefault();
      url = $(this).attr('href');
      ga('send', {
        'hitType': 'pageview',
        'page': url.replace(/http:\/\/[^\/]*\//, '/'),
        'title': $(this).text()
      });
      setTimeout(function() {
        return location.href = url;
      }, 300);
      return false;
    });
    $("p,li,dd,dt,td").html(function(index, html) {
      return html.replace(XRegExp('([\\p{InGreek_and_Coptic}\\p{InGreek_Extended}]+)', 'g'), '<span class="greek">$1</span>');
    });
    $('body').on('click', '.greek', function(e) {
      var alt, url, word;
      word = $(e.target);
      if (word.data("alternate")) {
        alt = word.data("alternate");
        word.data("alternate", $(e.target).text());
        return word.text(alt);
      } else {
        url = escape('http://transliterate.com/Home/Transliterate?input=' + word.text());
        return $.ajax({
          url: 'https://jsonp.nodejitsu.com/?url=' + url,
          dataType: 'json',
          cache: true,
          success: function(data) {
            if (data.sbl != null) {
              word.data('alternate', word.text());
              return word.text(data.sbl);
            } else {
              return word.toggleClass('greek');
            }
          }
        });
      }
    });
    letters = unique($(".topics-list li").map(function() {
      return $(this).data("letter");
    }));
    key = $("<div class='topics-key'><a data-filter='*' href='#filter-all'>all</a></div>").prependTo(".topics-list");
    for (_i = 0, _len = letters.length; _i < _len; _i++) {
      l = letters[_i];
      key.append($("<a>" + l + "</a>").attr("href", "#filter-" + l).data("filter", l));
    }
    return key.click(function(e) {
      var f;
      e.preventDefault();
      f = $(e.target).data('filter');
      $('.topics-list').css('min-height', $('.topics-list').innerHeight());
      if (f === "*") {
        $(".topics-list li").show();
        return setTimeout(function() {
          return $('.topics-list').css('min-height', 0);
        });
      } else {
        $(".topics-list li[data-letter!='" + f + "']").hide();
        return setTimeout(function() {
          $(".topics-list li[data-letter='" + f + "']").show();
          return setTimeout(function() {
            return $('.topics-list').css('min-height', 0);
          });
        });
      }
    });
  });

  unique = function(a) {
    var i, o, r, _i, _len;
    o = {};
    r = [];
    for (_i = 0, _len = a.length; _i < _len; _i++) {
      i = a[_i];
      o[i] = i;
    }
    return r = (function() {
      var _results;
      _results = [];
      for (i in o) {
        _results.push(i);
      }
      return _results;
    })();
  };

}).call(this);

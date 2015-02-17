(function() {
  var $, filterTopics;

  $ = jQuery;

  $(document).ready(function() {
    filterTopics(document.location.hash.substr(1));
    $('.topic-index a').attr('id', '');
    return $('body').on('click', '.topic-index a', function(e) {
      e.preventDefault();
      filterTopics(e.target.href.split('#').pop());
      return history.pushState(null, null, e.target.href);
    });
  });

  $(window).on('hashchange', function(e) {
    e.preventDefault();
    return filterTopics(document.location.hash.substr(1));
  });

  filterTopics = function(fragment) {
    if (fragment.length !== 1) {
      return $('.listing').show();
    } else {
      $('.listing[data-initial!=' + fragment + ']').hide();
      return $('.listing[data-initial=' + fragment + ']').show();
    }
  };

}).call(this);

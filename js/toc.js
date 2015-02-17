(function() {
  $(document).ready(function(e) {
    var toc;
    $('#TOC a').attr('href', function() {
      return $(this).attr('href').replace(/^.*#/, '#');
    });
    $('body').scrollspy({
      target: '#TOC'
    }).scrollspy('refresh');
    toc = $('#TOC');
    return $('body').on('activate.bs.scrollspy', function(e) {
      var height, targetScroll, top;
      height = toc.outerHeight();
      top = toc.find('.active').position().top;
      if (toc.find('.active .active').length) {
        top = top + toc.find('.active .active').position().top;
      }
      targetScroll = toc.scrollTop() + top - height / 2;
      return $('#TOC').stop().animate({
        scrollTop: targetScroll
      }, 400);
    });
  });

}).call(this);

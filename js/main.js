document.addEventListener('DOMContentLoaded', function () {
  var panel = document.querySelector('.panel-cover');
  var blogButtons = document.querySelectorAll('.blog-button');
  var isHome = document.body.classList.contains('home-page');

  if (isHome && panel && window.location.hash !== '#blog') {
    panel.classList.remove('panel-cover--collapsed');
  }

  function openBlog() {
    if (!panel) return;
    panel.classList.add('panel-cover--collapsed');
  }

  blogButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      if (window.location.hash === '#blog' && panel && panel.classList.contains('panel-cover--collapsed')) return;
      openBlog();
    });
  });

  if (window.location.hash === '#blog') {
    openBlog();
  }
});

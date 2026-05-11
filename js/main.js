document.addEventListener('DOMContentLoaded', function () {
  var panel = document.querySelector('.panel-cover');
  var postList = document.querySelector('.main-post-list');
  var blogButtons = document.querySelectorAll('.blog-button');

  function openBlog() {
    if (!panel || !postList) return;
    postList.classList.remove('hidden');
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

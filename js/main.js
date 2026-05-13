document.addEventListener('DOMContentLoaded', function () {
  var panel = document.querySelector('.panel-cover');
  var blogButtons = document.querySelectorAll('.blog-button');
  var isHome = document.body.classList.contains('home-page');
  var searchBox = document.querySelector('.post-search');
  var tagSections = document.querySelectorAll('[data-tag-section]');

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

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[character];
    });
  }

  function slugify(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fa5-]/g, '');
  }

  function highlightText(value, query) {
    var text = escapeHtml(value);
    if (!query) return text;

    var escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp('(' + escapedQuery + ')', 'ig'), '<mark>$1</mark>');
  }

  function setupPostSearch() {
    if (!searchBox) return;

    var input = searchBox.querySelector('.post-search__input');
    var clearButton = searchBox.querySelector('.post-search__clear');
    var status = searchBox.querySelector('.post-search__status');
    var list = document.querySelector('.post-list');
    var searchUrl = searchBox.getAttribute('data-search-index');
    var tagsUrl = searchBox.getAttribute('data-tags-url') || '/tags';
    var searchMode = searchBox.getAttribute('data-search-mode') || 'inline';
    var originalList = list ? list.innerHTML : '';
    var posts = [];

    if (!input || !clearButton || !status || !list || !searchUrl) return;

    function updateUrl(query) {
      if (searchMode !== 'page' || !window.history || !window.URLSearchParams) return;

      var url = new URL(window.location.href);
      if (query) {
        url.searchParams.set('q', query);
      } else {
        url.searchParams.delete('q');
      }
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    }

    function renderPosts(items, query) {
      if (!query) {
        list.innerHTML = originalList;
        if (searchMode === 'page') {
          list.innerHTML = '<li class="post-empty-state">输入关键词开始搜索。</li>';
          status.textContent = '可按标题、摘要和标签搜索。';
        } else {
          status.textContent = '可按标题、摘要和标签搜索。';
        }
        return;
      }

      if (!items.length) {
        list.innerHTML = '<li class="post-empty-state">没有找到相关文章。</li>';
        status.textContent = '没有找到与“' + query + '”相关的文章。';
        return;
      }

      list.innerHTML = items.map(function (post) {
        var tags = Array.isArray(post.tags) ? post.tags.filter(Boolean) : [];
        var tagHtml = tags.length
          ? '<div class="tag-list" aria-label="文章标签">' + tags.map(function (tag) {
            var tagText = escapeHtml(tag);
            return '<a class="tag-pill" href="' + tagsUrl + '#' + slugify(tag) + '" aria-label="查看标签：' + tagText + '">' + highlightText(tag, query) + '</a>';
          }).join('') + '</div>'
          : '';

        return [
          '<li>',
            '<article class="post-card" data-post-card>',
              '<a class="post-card__main" href="' + escapeHtml(post.url) + '" title="访问 ' + escapeHtml(post.title) + '">',
                '<time datetime="' + escapeHtml(post.date) + '">' + escapeHtml(post.date) + '</time>',
                '<h2>' + highlightText(post.title, query) + '</h2>',
                '<p>' + highlightText(post.excerpt, query) + '</p>',
              '</a>',
              '<footer class="post-card__footer">',
                tagHtml,
                '<a class="read-more" href="' + escapeHtml(post.url) + '" aria-label="阅读全文：' + escapeHtml(post.title) + '">阅读全文</a>',
              '</footer>',
            '</article>',
          '</li>'
        ].join('');
      }).join('');

      status.textContent = '找到 ' + items.length + ' 篇与“' + query + '”相关的文章。';
    }

    function rankPost(post, query) {
      var title = String(post.title || '').toLowerCase();
      var excerpt = String(post.excerpt || '').toLowerCase();
      var tags = Array.isArray(post.tags) ? post.tags.join(' ').toLowerCase() : '';
      var score = 0;

      if (title === query) score += 120;
      if (title.indexOf(query) !== -1) score += 80;
      if (tags.split(/\s+/).indexOf(query) !== -1) score += 60;
      if (tags.indexOf(query) !== -1) score += 45;
      if (excerpt.indexOf(query) !== -1) score += 20;

      return score;
    }

    function runSearch() {
      var query = input.value.trim().toLowerCase();
      clearButton.hidden = !query;
      updateUrl(query);

      if (!query) {
        renderPosts([], '');
        return;
      }

      var results = posts.filter(function (post) {
        var haystack = [
          post.title,
          post.excerpt,
          Array.isArray(post.tags) ? post.tags.join(' ') : ''
        ].join(' ').toLowerCase();

        return haystack.indexOf(query) !== -1;
      }).sort(function (first, second) {
        return rankPost(second, query) - rankPost(first, query);
      });

      renderPosts(results, query);
    }

    input.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter') return;
      var firstResult = list.querySelector('[data-post-card] .post-card__main');
      if (firstResult) {
        event.preventDefault();
        window.location.href = firstResult.getAttribute('href');
      }
    });

    fetch(searchUrl)
      .then(function (response) {
        if (!response.ok) throw new Error('Search index failed');
        return response.json();
      })
      .then(function (data) {
        posts = Array.isArray(data) ? data : [];
        if (searchMode === 'page') {
          var initialQuery = new URLSearchParams(window.location.search).get('q') || '';
          input.value = initialQuery;
          runSearch();
        }
      })
      .catch(function () {
        status.textContent = '搜索索引暂时不可用，可先使用归档或标签浏览。';
        input.disabled = true;
      });

    input.addEventListener('input', runSearch);
    clearButton.addEventListener('click', function () {
      input.value = '';
      input.focus();
      runSearch();
    });
  }

  function setupTagFilter() {
    if (!tagSections.length) return;

    var status = document.querySelector('[data-tag-filter-status]');
    var statusText = status ? status.querySelector('span') : null;
    var pageTitle = document.querySelector('.page-hero h1');
    var pageSummary = document.querySelector('[data-tag-page-summary]');
    var defaultTitle = pageTitle ? pageTitle.textContent : '';
    var defaultSummary = pageSummary ? pageSummary.getAttribute('data-default-summary') : '';
    var tagLinks = document.querySelectorAll('[data-tag-filter]');

    function applyFilter() {
      var activeTag = decodeURIComponent(window.location.hash.replace(/^#/, ''));
      var activeSection = null;

      tagLinks.forEach(function (link) {
        var isActive = activeTag && link.getAttribute('data-tag-filter') === activeTag;
        link.classList.toggle('is-active', Boolean(isActive));
        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });

      tagSections.forEach(function (section) {
        var matches = !activeTag || section.getAttribute('data-tag-section') === activeTag;
        section.hidden = !matches;

        if (matches && activeTag) {
          activeSection = section;
        }
      });

      if (activeSection) {
        var tagName = activeSection.getAttribute('data-tag-name');
        var tagCount = activeSection.getAttribute('data-tag-count');

        if (statusText) {
          statusText.textContent = tagName + ' 下共 ' + tagCount + ' 篇文章。';
        }
        if (pageTitle) {
          pageTitle.textContent = '标签：' + tagName;
        }
        if (pageSummary) {
          pageSummary.textContent = '正在查看 ' + tagName + ' 标签下的文章。';
        }
      } else {
        if (pageTitle) pageTitle.textContent = defaultTitle;
        if (pageSummary) pageSummary.textContent = defaultSummary;
      }

      if (status) {
        status.hidden = !activeTag;
      }
    }

    applyFilter();
    window.addEventListener('hashchange', applyFilter);
  }

  function setupExternalFallbacks() {
    var busuanziValues = document.querySelectorAll('[data-busuanzi-value]');

    if (!busuanziValues.length) return;

    window.setTimeout(function () {
      busuanziValues.forEach(function (value) {
        if (!value.textContent.trim()) {
          var container = value.closest('[id^="busuanzi_container"]');
          if (container) container.hidden = true;
        }
      });
    }, 3500);
  }

  function setupCodeCopy() {
    var blocks = document.querySelectorAll('.prose pre');

    blocks.forEach(function (block) {
      if (block.querySelector('.copy-code-button')) return;

      var button = document.createElement('button');
      button.className = 'copy-code-button';
      button.type = 'button';
      button.textContent = '复制';

      button.addEventListener('click', function () {
        var code = block.querySelector('code');
        var value = code ? code.textContent : block.textContent;

        if (!navigator.clipboard || !navigator.clipboard.writeText) {
          button.textContent = '不可用';
          return;
        }

        navigator.clipboard.writeText(value).then(function () {
          button.textContent = '已复制';
          window.setTimeout(function () {
            button.textContent = '复制';
          }, 1600);
        }).catch(function () {
          button.textContent = '失败';
        });
      });

      block.appendChild(button);
    });
  }

  function setupBackToTop() {
    var button = document.querySelector('[data-back-to-top]');
    if (!button) return;

    function updateVisibility() {
      button.hidden = window.scrollY < 520;
    }

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
  }

  function setupTocSpy() {
    var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc-card a'));
    if (!tocLinks.length || !('IntersectionObserver' in window)) return;

    var headings = tocLinks.map(function (link) {
      var id = decodeURIComponent(link.getAttribute('href').replace(/^#/, ''));
      return document.getElementById(id);
    }).filter(Boolean);

    if (!headings.length) return;

    function setActive(id) {
      tocLinks.forEach(function (link) {
        var isActive = link.getAttribute('href') === '#' + id;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    headings.forEach(function (heading) {
      observer.observe(heading);
    });
  }

  setupPostSearch();
  setupTagFilter();
  setupExternalFallbacks();
  setupCodeCopy();
  setupBackToTop();
  setupTocSpy();
});

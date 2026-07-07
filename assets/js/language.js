(function () {
  var storageKey = 'siteLanguage';
  var languages = {
    en: {
      htmlLang: 'en',
      toggleLabel: '切换到中文',
      pageTitles: {
        '/': 'Home - Junyang Wang / 王俊阳',
        '/cv/': 'Experience - Junyang Wang / 王俊阳',
        '/projects/': 'Projects - Junyang Wang / 王俊阳',
        '/sitemap/': 'Sitemap - Junyang Wang / 王俊阳'
      }
    },
    zh: {
      htmlLang: 'zh-CN',
      toggleLabel: 'Switch to English',
      pageTitles: {
        '/': '主页 - Junyang Wang / 王俊阳',
        '/cv/': '经历 - Junyang Wang / 王俊阳',
        '/projects/': '项目 - Junyang Wang / 王俊阳',
        '/sitemap/': '站点地图 - Junyang Wang / 王俊阳'
      }
    }
  };

  function normalizeLanguage(language) {
    return language === 'zh' ? 'zh' : 'en';
  }

  function currentPath() {
    var path = window.location.pathname || '/';
    if (path !== '/' && path.slice(-1) !== '/') {
      path += '/';
    }
    return path;
  }

  function storedLanguage() {
    try {
      return normalizeLanguage(localStorage.getItem(storageKey));
    } catch (error) {
      return 'en';
    }
  }

  function persistLanguage(language) {
    try {
      localStorage.setItem(storageKey, language);
    } catch (error) {
      // Ignore private browsing storage errors.
    }
  }

  function setLanguage(language) {
    language = normalizeLanguage(language);
    var config = languages[language];
    document.documentElement.setAttribute('data-site-lang', language);
    document.documentElement.setAttribute('lang', config.htmlLang);
    persistLanguage(language);

    document.querySelectorAll('[data-language-toggle]').forEach(function (toggle) {
      toggle.setAttribute('aria-label', config.toggleLabel);
      toggle.setAttribute('title', config.toggleLabel);
    });

    var pageTitle = config.pageTitles[currentPath()];
    if (pageTitle) {
      document.title = pageTitle;
    }
  }

  function toggleLanguage(event) {
    if (event) {
      event.preventDefault();
    }
    var nextLanguage = document.documentElement.getAttribute('data-site-lang') === 'zh' ? 'en' : 'zh';
    setLanguage(nextLanguage);
  }

  document.addEventListener('DOMContentLoaded', function () {
    setLanguage(storedLanguage());
    document.querySelectorAll('[data-language-toggle]').forEach(function (toggle) {
      toggle.addEventListener('click', toggleLanguage);
    });
  });

  window.setSiteLanguage = setLanguage;
}());

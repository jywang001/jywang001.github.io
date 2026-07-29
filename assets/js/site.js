(function () {
  var storageLanguageKey = "siteLanguage";
  var languageButtons = document.querySelectorAll("[data-set-language]");
  var themeButton = document.getElementById("theme-toggle");
  var themeIcon = document.getElementById("theme-icon");

  function getLanguage() {
    return document.documentElement.getAttribute("data-site-lang") === "zh" ? "zh" : "en";
  }

  function setLanguage(language) {
    language = language === "zh" ? "zh" : "en";
    document.documentElement.setAttribute("data-site-lang", language);
    document.documentElement.setAttribute("lang", language === "zh" ? "zh-CN" : "en");

    try {
      localStorage.setItem(storageLanguageKey, language);
    } catch (error) {
      // Storage can be unavailable in private browsing.
    }

    languageButtons.forEach(function (button) {
      var isActive = button.getAttribute("data-set-language") === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    var pageTitle = document.body.getAttribute(language === "zh" ? "data-title-zh" : "data-title-en");
    if (pageTitle) {
      document.title = pageTitle + " · Junyang Wang";
    }
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function renderTheme(theme) {
    var isDark = theme === "dark";
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    if (themeIcon) {
      themeIcon.classList.toggle("fa-moon", !isDark);
      themeIcon.classList.toggle("fa-sun", isDark);
    }

    if (themeButton) {
      themeButton.setAttribute("aria-label", isDark ? "Use light theme" : "Use dark theme");
      themeButton.setAttribute("title", isDark ? "Use light theme" : "Use dark theme");
    }
  }

  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.getAttribute("data-set-language"));
    });
  });

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var nextTheme = currentTheme() === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", nextTheme);
      } catch (error) {
        // Storage can be unavailable in private browsing.
      }
      renderTheme(nextTheme);
    });
  }

  setLanguage(getLanguage());
  renderTheme(currentTheme());
}());

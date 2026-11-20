(() => {
  'use strict';
  const dictionaries = window.SITE_TRANSLATIONS || {};
  const supported = new Set(['en', 'zh']);
  const params = new URLSearchParams(location.search);
  let storedLanguage = null;
  try { storedLanguage = localStorage.getItem('zhilinxue-site-lang'); } catch (_) { /* private browsing */ }
  let currentLanguage = supported.has(params.get('lang')) ? params.get('lang') : (supported.has(storedLanguage) ? storedLanguage : 'en');

  function translate(key) {
    return key.split('.').reduce((obj, part) => obj && obj[part], dictionaries[currentLanguage]);
  }

  function applyLanguage(language) {
    if (!supported.has(language)) return;
    currentLanguage = language;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.body.classList.toggle('is-zh', language === 'zh');
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = translate(el.dataset.i18n);
      if (typeof value === 'string') el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-content]').forEach(el => {
      const value = translate(el.dataset.i18nContent);
      if (typeof value === 'string') el.setAttribute('content', value);
    });
    document.querySelectorAll('[data-lang]').forEach(button => {
      const selected = button.dataset.lang === language;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('active', selected);
    });
    const isCV = document.body.dataset.page === 'cv';
    document.title = language === 'zh'
      ? `薛知林 · ${isCV ? '学术简历' : '个人学术主页'}`
      : `Zhilin Xue · ${isCV ? 'Academic CV' : 'Academic Homepage'}`;
    document.querySelectorAll('a[data-internal-link]').forEach(link => {
      const original = link.dataset.hrefBase || link.getAttribute('href');
      if (!link.dataset.hrefBase) link.dataset.hrefBase = original;
      const [path, hash] = original.split('#');
      if (path) link.setAttribute('href', `${path}?lang=${language}${hash ? '#' + hash : ''}`);
    });
    const toggle = document.getElementById('menu-toggle');
    if (toggle) toggle.setAttribute('aria-label', translate(toggle.getAttribute('aria-expanded') === 'true' ? 'ui.menuClose' : 'ui.menuOpen'));
    try { localStorage.setItem('zhilinxue-site-lang', language); } catch (_) { /* private browsing */ }
  }

  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });
  applyLanguage(currentLanguage);

  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  function closeMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', translate('ui.menuOpen'));
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.setAttribute('aria-label', translate(expanded ? 'ui.menuOpen' : 'ui.menuClose'));
      nav.classList.toggle('open', !expanded);
      document.body.classList.toggle('menu-open', !expanded);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 820) closeMenu(); });
  }

  const printButton = document.getElementById('print-cv');
  if (printButton) printButton.addEventListener('click', () => window.print());
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  const progress = document.getElementById('reading-progress');
  if (progress) {
    let framePending = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = max > 0 ? `${Math.min(100, Math.max(0, window.scrollY / max * 100))}%` : '0%';
      framePending = false;
    };
    window.addEventListener('scroll', () => {
      if (!framePending) { framePending = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }
})();

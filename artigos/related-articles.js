/* related-articles.js — populates the "More articles" grid on article pages
   Reads /artigos/articles.json, excludes current article,
   picks 3 random articles, renders cards into .related-grid */

(function () {
  const grid = document.querySelector('.related-grid');
  if (!grid) return;

  const currentPath = window.location.pathname;

  fetch('/artigos/articles.json')
    .then(r => r.json())
    .then(articles => {
      const candidates = articles.filter(a => {
        return a.url !== currentPath && !a.url.includes('/./');
      });

      const picked = candidates
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      if (picked.length === 0) {
        const section = grid.closest('.article-related');
        if (section) section.remove();
        return;
      }

      grid.innerHTML = picked.map(a => `
        <a href="${a.url}" class="related-card">
          <img src="${a.image}" alt="${a.title}" loading="lazy">
          <div class="related-card-body">
            <h3>${a.title}</h3>
            <p>${a.desc}</p>
          </div>
        </a>
      `).join('');
    })
    .catch(() => {
      const section = grid.closest('.article-related');
      if (section) section.remove();
    });
})();

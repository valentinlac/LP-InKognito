(function (window, document) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  var firstScript = document.getElementsByTagName('script')[0];
  var gtmScript = document.createElement('script');
  gtmScript.async = true;
  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-PCBC34CP';
  firstScript.parentNode.insertBefore(gtmScript, firstScript);

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href*="app.inkognito.fr/offre-v2"]');
    if (!link) return;

    var destination = new URL(link.href);
    window.dataLayer.push({
      event: 'seo_cta_clicked',
      page_path: window.location.pathname,
      cta_origin: destination.searchParams.get('cta_origin') || 'unknown',
      source: destination.searchParams.get('src') || 'seo'
    });
  });
})(window, document);

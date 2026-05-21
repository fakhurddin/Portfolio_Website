(function () {
  if (!window.si) window.si = function () { (window.siq = window.siq || []).push(arguments); };
  var s = document.createElement('script');
  s.defer = true;
  s.src = '/_vercel/speed-insights/script.js';
  s.dataset.sdkn = '@vercel/speed-insights';
  s.dataset.sdkv = '2.0.0';
  document.head.appendChild(s);
})();

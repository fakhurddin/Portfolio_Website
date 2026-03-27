// Initialize Vercel Web Analytics
// This script initializes the Web Analytics queue and loads the tracking script
(function() {
  // Initialize the queue if not already present
  if (!window.va) {
    window.va = function() {
      (window.vaq = window.vaq || []).push(arguments);
    };
  }
  
  // Create and inject the Web Analytics script
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  
  // Add SDK information
  script.dataset.sdkn = '@vercel/analytics';
  script.dataset.sdkv = '1.4.1';
  
  // Error handler
  script.onerror = function() {
    console.log('[Vercel Web Analytics] Failed to load script. Please check if any content blockers are enabled and try again.');
  };
  
  // Append the script to the document head
  document.head.appendChild(script);
})();

// Initialize Vercel Speed Insights
// This script initializes the Speed Insights queue and loads the tracking script
(function() {
  // Initialize the queue if not already present
  if (!window.si) {
    window.si = function() {
      (window.siq = window.siq || []).push(arguments);
    };
  }
  
  // Create and inject the Speed Insights script
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/speed-insights/script.js';
  
  // Add SDK information
  script.dataset.sdkn = '@vercel/speed-insights';
  script.dataset.sdkv = '2.0.0';
  
  // Error handler
  script.onerror = function() {
    console.log('[Vercel Speed Insights] Failed to load script. Please check if any content blockers are enabled and try again.');
  };
  
  // Append the script to the document head
  document.head.appendChild(script);
})();

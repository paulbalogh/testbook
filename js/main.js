// Include JSXGraph (locally, small, 511KB)
require(['../../js/jsxgraphcore']);

// Include Wolfram CDF Player
require(['http://www.wolfram.com/cdf-player/plugin/v2.1/cdfplugin.js']);

// Include MathJax from CDN (for now, otherwise +32MB)
define(['http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'], function(){
  MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    },
    "HTML-CSS": { availableFonts: ["TeX"] }
  });
});

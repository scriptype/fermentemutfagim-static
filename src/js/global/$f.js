;(function(root) {
  function $f(selector) {
    if (selector[0] === '#') {
      return document.getElementById(selector.slice(1))
    }
    return document.querySelectorAll(selector)
  }

  root.$f = $f
}(window))

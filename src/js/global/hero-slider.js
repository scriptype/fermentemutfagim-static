;(function(root) {
  var BASE_CLS = 'hero-slider'
  var TRACK_CLS = 'hero-slider__track'
  var IMG_CLS = BASE_CLS + '__image'
  var ACTIVE_IMG_CLS = IMG_CLS + '--active'
  var THUMBNAIL_CLS = BASE_CLS + '__thumbnail'
  var ACTIVE_THUMBNAIL_CLS = THUMBNAIL_CLS + '--active'

  function createHeroSlider(options) {
    function setDimensions() {
      var styles = getComputedStyle(o.$el)
      width = styles.width
      $track.style.cssText += (';' +
        'width: ' + (parseInt(width) * $images.length) + 'px;' +
        'height: ' + (getComputedStyle($images[0]).height) +';'
      )
    }

    // Shortcut
    var o = options

    // Initial state
    var activeIndex = 0

    var width, height

    // Create track
    var $track = document.createElement('div')

    // Add track class
    $track.classList.add(TRACK_CLS)

    // Copy contents of $el to $track
    $track.innerHTML = o.$el.innerHTML

    // Flush contents of $el
    o.$el.innerHTML = ''

    // Put $track inside $el. We effectively wrap everything with $track
    o.$el.appendChild($track)

    // Get images directly inside the container
    var $images = [].slice.call(o.$el.querySelectorAll('img'))

    // Add image class to each image inside the container
    $images.forEach(function($image) {
      $image.classList.add(IMG_CLS)
    })

    // Add active image class to the first one
    $images[0].classList.add(ACTIVE_IMG_CLS)

    // Add thumbnail class to each thumbnail
    var $thumbnails = $images.map(function($image) {
      var src = $image.dataset.thumbnail
      var img = document.createElement('image')
      img.src = src
      img.classList.add(THUMBNAIL_CLS)
      return img
    })

    // Add active thumbnail class to the first thumbnail
    $thumbnails[0].classList.add(ACTIVE_THUMBNAIL_CLS)

    // Add base class to container
    o.$el.classList.add(BASE_CLS)

    // Set initial dimensions
    setDimensions()

    // Update width whenever window size is changed
    window.addEventListener('resize', setDimensions)

    // Slide loop
    var activateNext = setInterval(function() {
      // Increment active image index by 1 and if it exceeds the
      // number of images, reset it to 0
      if (++activeIndex >= $images.length) {
        activeIndex = 0
      }

      // Remove active class from all images
      $images.forEach(function($image) {
        $image.classList.remove(ACTIVE_IMG_CLS)
      })

      // Add active class to only the one at the active index
      $images[activeIndex].classList.add(ACTIVE_IMG_CLS)

      // Remove active class from thumbnails
      $thumbnails.forEach(function($thumbnail) {
        $thumbnail.classList.remove(ACTIVE_THUMBNAIL_CLS)
      })

      // Add active class to the one at the active index
      $thumbnails[activeIndex].classList.add(ACTIVE_THUMBNAIL_CLS)

      // Shift track
      $track.style.cssText += (
        ';margin-left: ' + (parseInt(width) * activeIndex * -1) + 'px;'
      )
    }, o.wait)
  }

  root.createHeroSlider = createHeroSlider
}(window))

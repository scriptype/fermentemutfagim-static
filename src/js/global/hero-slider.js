;(function(root) {
  var BASE_CLS = 'hero-slider'
  var TRACK_CLS = 'hero-slider__track'
  var IMG_CLS = BASE_CLS + '__image'
  var ACTIVE_IMG_CLS = IMG_CLS + '--active'
  var THUMBNAILS_CONTAINER_CLS = 'hero-slider__thumbnails'
  var THUMBNAIL_CLS = BASE_CLS + '__thumbnail'
  var THUMBNAIL_CONTAINER_CLS = THUMBNAIL_CLS + '-container'
  var ACTIVE_THUMBNAIL_CONTAINER_CLS = THUMBNAIL_CLS + '-container--active'
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

    function onClickThumbnail(index) {
      return function(event) {
        clearInterval(activateNext)
        activateNext = setInterval(cycle, o.wait)
        activeIndex = index - 1
        cycle()
      }
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
    var $thumbnails = $images.map(function($image, index) {
      var src = $image.dataset.thumbnail
      var img = document.createElement('img')
      img.src = src
      img.classList.add(THUMBNAIL_CLS)
      return img
    })

    // Add active thumbnail class to the first thumbnail
    $thumbnails[0].classList.add(ACTIVE_THUMBNAIL_CLS)

    var $thumbnailsContainer = document.createElement('div')
    $thumbnails.forEach(function($thumbnail, index) {
      var $container = document.createElement('div')
      $container.classList.add(THUMBNAIL_CONTAINER_CLS)
      if (index === 0) {
        $container.classList.add(ACTIVE_THUMBNAIL_CONTAINER_CLS)
      }
      $container.addEventListener('click', onClickThumbnail(index))
      $container.appendChild($thumbnail)
      $thumbnailsContainer.appendChild($container)
    })

    $thumbnailsContainer.classList.add(THUMBNAILS_CONTAINER_CLS)

    o.$el.appendChild($thumbnailsContainer)

    // Add base class to container
    o.$el.classList.add(BASE_CLS)

    // Set initial dimensions
    setDimensions()

    // Update width whenever window size is changed
    window.addEventListener('resize', setDimensions)

    // Slide loop
    function cycle() {
      // Increment active image index by 1
      // And if it exceeds the number of images, reset it to 0
      if (++activeIndex >= $images.length) {
        activeIndex = 0
      }

      /*
       * Remove active class from active images, thumbnails and
       * thumbnail containers. Give the active class to the ones
       * at the activeIndex */

      // Images
      $images.find(function($img) {
        return $img.classList.contains(ACTIVE_IMG_CLS)
      })
      .classList.remove(ACTIVE_IMG_CLS)

      // Thumbnail containers
      $thumbnailsContainer
        .querySelector('.' + ACTIVE_THUMBNAIL_CONTAINER_CLS)
        .classList.remove(ACTIVE_THUMBNAIL_CONTAINER_CLS)

      // Thumbnails
      $thumbnailsContainer
        .querySelector('.' + ACTIVE_THUMBNAIL_CLS)
        .classList.remove(ACTIVE_THUMBNAIL_CLS)

      requestAnimationFrame(function() {
        $images[activeIndex].classList.add(ACTIVE_IMG_CLS)

        $thumbnailsContainer
          .querySelectorAll('.' + THUMBNAIL_CONTAINER_CLS)[activeIndex]
          .classList.add(ACTIVE_THUMBNAIL_CONTAINER_CLS)

        $thumbnails[activeIndex].classList.add(ACTIVE_THUMBNAIL_CLS)
      })

      // Shift track
      $track.style.cssText += (
        ';margin-left: ' + (parseInt(width) * activeIndex * -1) + 'px;'
      )
    }
    
    var activateNext = setInterval(cycle, o.wait)
  }

  root.createHeroSlider = createHeroSlider
}(window))

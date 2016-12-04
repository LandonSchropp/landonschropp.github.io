// Returns a promise that resolves when the document has loaded.
function onLoad() {
  return new Promise(function(resolve) {
    window.addEventListener('load', resolve);
  });
}

// Returns a promise that resolves when the background image for the element with the provided
// selector has loaded.
// NOTE: This is a one-off function to fufill a specific use case. It will not work for
// general-purpose use cases.
function onBackgroundImageLoad(selector) {
  let elements = [].slice.call(document.querySelectorAll(selector));

  let promises = elements.map((element) => {
    return new Promise((resolve) => {
      let backgroundUrl = window
        .getComputedStyle(element, '::after')
        .getPropertyValue('background-image')
        .match(/url\(['"]?([^)'"]+)['"]?\)/i)[1];

      // http://stackoverflow.com/a/22788887/262125
      let image = new Image();
      image.addEventListener('load', resolve);
      image.src = backgroundUrl;
      if (image.complete) resolve();
    });
  });

  return Promise.all(promises);
}

// Kick off the animation after all of the assets have loaded
onLoad()
  .then(() => onBackgroundImageLoad('.flannel'))
  .then(() => document.querySelector('.home').classList.add('home--ready'));

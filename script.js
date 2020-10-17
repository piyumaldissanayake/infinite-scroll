// Unsplash API

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosAray = [];

// this is to make the website load faster intitally. So there is no waiting for the user.
let intitalLoad = true;

const count = 5;
const apiKey = "udDo_6_ePB-2A7OF4KaNtjKUfeMj0Doe5aF8S0xGBxI";
let apiURL =
  `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// update the api url so after the intial load we can get as many images as we want.
function updateApiUrlWithNewCount(pictureCount){
  apiURL =
  `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${pictureCount}`;
}

// Chck if all images were loaded
function imageLoaded(){
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
  }
}

// helper function to set element attributes
function setAttributes(element, attributes){
  for(let key in attributes){
    element.setAttribute(key, attributes[key]);
  }
}


// create elements for links and photos, Add to DOM
function displayPhotos(){

  totalImages = totalImages + photosAray.length;

  // Run function for each object in photosArray
  photosAray.forEach((photo) => {
    // create <a> to link to unplash
    const anchorItem = document.createElement('a');
    setAttributes(anchorItem, {
      href: photo.links.html,
      target: '_blank'
    });

    // Create <img> for photo
    const imageItem = document.createElement('img');
    setAttributes(imageItem, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title:photo.alt_description
    });

    // Event Listener, check when each is finished loading
    imageItem.addEventListener('load', imageLoaded);

    // put <img> inside <a>, then put both inside imageContainer element
    anchorItem.appendChild(imageItem);
    imageContainer.appendChild(anchorItem);

  });
}

// Get photo from unsplashed
async function getPhotos() {
  try {
    const response = await fetch(apiURL);

    photosAray = await response.json();

    displayPhotos();

    // if this is the initial load
    if(intitalLoad){
      updateApiUrlWithNewCount(30);
      intitalLoad = false; // after the initial load, no more initla load features for performance
    }

  } catch (error) {
    console.log(error);
  }
}

//Check to see if scrolling near bottom of page, Load more photos,
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();

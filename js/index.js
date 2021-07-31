var imgForm = document.querySelector("#search-form");
imgForm.addEventListener("submit", fetchImages);

function fetchImages(e) {
  e.preventDefault();

  var searchTerm = document.querySelector(".search").value;

  console.log(searchTerm)
  var limit = 200;
  fetch("https://pixabay.com/api/?key=8772164-4f816aa8fc1fc3045290454a0&q=" + searchTerm + "&image_type=photo&per_page=" + limit).then(function (response) {
    return response.json();
  }).then(function (resp) {
    var hitsArray = resp.hits;
    showImages(hitsArray);

    var alertMsg = document.querySelector(".alert-msg");
    if (hitsArray.length === 0) {
      alertMsg.style.display = "block";
      alertMsg.innerHTML = "Please enter a valid search!";
    } else {
      alertMsg.style.display = "none";
      alertMsg.innerHTML = "";
    }

    var text = document.querySelector(".search-text");
    text.innerHTML = "<h1>" + searchTerm + " returned " + hitsArray.length + " results.</h1>";

    if (searchTerm && hitsArray.length === 0) {
      text.innerHTML = "\n        <h1>Sorry your search " + searchTerm + " returned " + hitsArray.length + " results</h1>\n     ";
    }

    var featuredSection = document.querySelector(".featured");
    if (hitsArray.length > 1) {
      featuredSection.remove();
    }
  }).catch(function (err) {
    return console.log('err:' + err);
  });
}

function showImages(hitsArray) {
  var results = document.querySelector(".results");
  console.log(results);

  var output = '<div class="container">';
  hitsArray.forEach(function (imgData) {
    output += "\n  <div class=\"col-4\">\n    <img src=\"" + imgData.largeImageURL + "\"/>\n      <div class=\"card-body\">\n      <div class=\"img-col\">\n        " + (imgData.userImageURL ? "<img class=\"avatar\" src=\"" + imgData.userImageURL + "\" />" : "") + "\n        <p>Username: " + imgData.user + "</p>\n      </div>\n    <p>Total Downloads:  " + imgData.downloads + "</p>\n    <p><span>\n<svg aria-hidden=\"true\" data-prefix=\"fas\" data-icon=\"heart\" class=\"icon-md heart\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z\"></path></svg></span> " + imgData.likes + "\n\n<svg aria-hidden=\"true\" data-prefix=\"far\" data-icon=\"eye\" class=\"icon-md\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><path fill=\"currentColor\" d=\"M569.354 231.631C512.97 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-102.556 0-192.091-54.701-240-136 44.157-74.933 123.677-127.27 216.162-135.007C273.958 131.078 280 144.83 280 160c0 30.928-25.072 56-56 56s-56-25.072-56-56l.001-.042C157.794 179.043 152 200.844 152 224c0 75.111 60.889 136 136 136s136-60.889 136-136c0-31.031-10.4-59.629-27.895-82.515C451.704 164.638 498.009 205.106 528 256c-47.908 81.299-137.444 136-240 136z\"></path></svg> " + imgData.views + "</p>\n  <p class=\"tags\">Tags: #" + imgData.tags + "</p>\n  </div>\n</div>\n";
  });
  document.querySelector('.results').innerHTML = output;
}
"use strict";

let _work = [];
let _selectedWorkId = [];

// ---------------------------------------- portfolio cards ----------------------------------------
async function fetchWork() {
    let response = await fetch("https://wordpress.mwennerwald.com/wp-json/wp/v2/posts?_embed");
    let data = await response.json();
    console.log(data);
    _work = data;
    appendWork(_work);
}
fetchWork();

function appendWork(items) {
    let htmlTemplate ="";
    for (let item of items) {
        htmlTemplate += /*html*/ `
            <article onclick="showDetailView('${item.id}')">
            <h2>${item.acf.overskrift}</h2>
                <img src="${getFeaturedImageUrl(item)}">
              <h5>${item.acf.type}</h5>
            </article>
        `;
    }
    document.querySelector("#cardId").innerHTML=htmlTemplate;
}

function getFeaturedImageUrl(post) { //giver data til img src i linje 24 (movie gemt i post)
  let imageUrl = "";
  if (post._embedded['wp:featuredmedia']) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  } else {
    imageUrl = "img/logo/icon.png";
  }
  return imageUrl;
}

// ---------------------------------------- detail view section ------------------------------------
function showDetailView(id) {
  const item = _work.find(item => item.id == id);
  document.querySelector("#detailViewContainer").innerHTML = /*html*/`
      <img class="featuredImg" src="${getFeaturedImageUrl(item)}">
      <article class="beskrivelse">
      <h2>${item.acf.overskrift} | ${item.acf.type}</h2>
      <p>${item.acf.beskrivelse}</p>
      <p>${item.content.rendered}</p>
      </article>
      `;
   document.querySelector("#detailViewContainer2").innerHTML = /*html*/`
      <article class="detailViewGallery">
          <img class="detailViewImg" src="${item.acf.detailViewImg.url}">
      </article>
  `;
  navigateTo("detailView");
}
if (!_selectedWorkId) {
  navigateTo("index");
}

// ---------------------------------------- loader -------------------------------------------------
/* function showLoader(show = true) {
  let loader = document.querySelector('#loader');
  if (show) {
      loader.classList.remove("hide");
  } else {
      loader.classList.add("hide");
  }
} */

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

window.scrollTo(0, 0);

function load(){
  document.getElementById('index').style.display="block";
  }
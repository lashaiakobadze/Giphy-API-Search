/// CONSTANTS  
let topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];

const trendUrl = 'https://api.giphy.com/v1/gifs/trending?';
const appUrl = "https://api.giphy.com/v1/gifs/search?";

let params = {
  limit: 10,
  api_key: "aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB",
};


/// FETCHES
function fetchGips(url, query) {
    let Url = `${url}api_key=${params.api_key}&limit=${params.limit}&q=${query}`;
    fetch(Url)
    .then(response => response.json())
    .then(content => {
        document.querySelector('.results').innerHTML = '';
        content.data.forEach(data => {
        renderGips(data, 'beforeend');
      })
    })
    .catch(err => {
      console.error(err);
    });
}


/// RENDERS 
function renderBtn(data, place) {
    let html = '';  

    html = `
        <div class="btn" value="${data}">${data}</div>
    `;

    document.querySelector('.buttons').insertAdjacentHTML(place, html);
};


function renderGips(data, place) {
    let html = '';
  
    html = `
        <img src="${data.images.downsized.url}" alt="${data.title}" class="img">
    `;
  
    document.querySelector('.results').insertAdjacentHTML(place, html);
};


// DEFAULT BUTTONS RENDER
topics.forEach(btn => {
    renderBtn(btn, 'beforeend');
});


// SELECTORS
const trendsBtn = document.querySelector('.trends');
let searchedBtn = document.querySelectorAll('.btn');
const searchInput = document.querySelector('.user-search');
const searchBtn = document.querySelector('.searchBtn');


// Fetch input value add buttons navbar and search gips
searchBtn.addEventListener('click', () => {
    const searchValue = searchInput.value.trim();
    if(searchValue.length !== 0) {
        topics.shift();
        topics.push(searchValue);
        document.querySelector('.buttons').innerHTML = '';
        topics.forEach(btn => {
            renderBtn(btn, 'beforeend');
        });
        fetchGips(appUrl, searchValue);
        searchedBtn = document.querySelectorAll('.btn');
        console.log(searchedBtn);
        load();
    }
});


// Searched gips another search
function  load(){
    searchedBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log(e.target.innerHTML); 
            fetchGips(appUrl, e.target.innerHTML);       
        });
    }) 
}
load();

// Render trend gips
trendsBtn.addEventListener('click', () => {
    fetchGips(trendUrl, '');
})


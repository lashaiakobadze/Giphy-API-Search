class Config {
    // Default parameters
    topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];

    URL = {
        trendUrl: 'https://api.giphy.com/v1/gifs/trending?',
        appUrl: "https://api.giphy.com/v1/gifs/search?",    
    
        limit: 10,
        api_key: "aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB",
    }


    get getUrl() {
        return this.URL;
    }

    get getTopics() {
        return this.topics;
    }

    set setTopics(topics) {
        this.topics = topics;
    }
}


// SELECTORS
const trendsBtn = document.querySelector('.trends');
let searchedBtn = document.querySelectorAll('.btn');
const searchInput = document.querySelector('.user-search');
const searchBtn = document.querySelector('.searchBtn');


class Catalog extends Config {    
    // Default buttons render
    renderBtns() {
        super.getTopics.forEach(btn => {
            this.renderBtn(btn, 'beforeend');
        })
    }


    // Fetch list from url
    fetchList(url, query) {
        const Url = `${url}api_key=${super.getUrl.api_key}&limit=${super.getUrl.limit}&q=${query}`;
        fetch(Url)
        .then(response => response.json())
        .then(content => {
                document.querySelector('.results').innerHTML = '';
                content.data.forEach(data => {
                this.renderList(data, 'beforeend');
            })
        })
        .catch(err => {
            console.error(err);
        });
    };


    // Default buttons render
    renderBtn(data, place) {
        let html = '';  

        html = `
            <div class="btn" value="${data}">${data}</div>
        `;

        document.querySelector('.buttons').insertAdjacentHTML(place, html);
    };


    // Render gifs list
    renderList(data, place) {
        let html = '';
      
        html = `
            <div class="gif-box">
                <img src="${data.images.downsized.url}" alt="${data.title}" class="img">
                <h6>Rating: g</h6>
            </div>
        `;
      
        document.querySelector('.results').insertAdjacentHTML(place, html);
    };


    // Fetch input value add buttons on navbar and search gifs
    fetchValue() {
        searchBtn.addEventListener('click', () => {
            const searchValue = searchInput.value.trim();
            if(searchValue.length !== 0) {
                searchInput.value = '';
                const topics = super.getTopics;
                topics.shift();
                topics.push(searchValue);
                document.querySelector('.buttons').innerHTML = '';
                super.setTopics = topics;
                super.getTopics.forEach(btn => {
                    this.renderBtn(btn, 'beforeend');
                });
                this.fetchList(super.getUrl.appUrl, searchValue);
                searchedBtn = document.querySelectorAll('.btn');
                this.load();
            }
        });
    }


    // Searched gif another search super.getUrl.appUrl
    load(){
        searchedBtn = document.querySelectorAll('.btn');
        searchedBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                var searchQuery = e.target.innerHTML.trim();
                this.fetchList(super.getUrl.appUrl, searchQuery);
            });
        }) 
    };


    // Render trend gifs
    loadTrends() {
        trendsBtn.addEventListener('click', () => {
            this.fetchList(super.getUrl.trendUrl, '');
        })
    }


    renderAll() {
        this.fetchValue();
        this.load();
        this.loadTrends();
    }
}



const catalog = new Catalog();
catalog.renderBtns();
catalog.renderAll();
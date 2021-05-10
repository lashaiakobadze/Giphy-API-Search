// class Countries {   
//   CountriesData = [
//     { name: 'Georgia', capital: 'Tbilisi' },
//     { name: 'Germany', capital: 'Berlin' },
//     { name: 'Austria', capital: 'Vienna' }
//   ]

//   getCountriesData() {
//     return this.CountriesData;
//   }    
// }


// class CountriesRender extends Countries {
//   node = document.querySelector('.countries');
    
//   render(data) {   
//     let html = `
//       <div class="country">
//         <div class="country_name">${data.name}</div>
//         <div class="country_capital">${data.capital}</div>
//       </div>
//     `;
  
//     this.node.insertAdjacentHTML("beforeend", html);
//   };

//   getCountries() {
//     super.getCountriesData().forEach(data => {
//       this.render(data);
//     });
//   }
// }

// const app = new CountriesRender();
// app.getCountries();


// /// API
// const countryUrl = "https://disease.sh/v3/covid-19/countries";


// async function getData(url) {
//   try {
//     let response = await fetch(url);
//     let data = await response.json();

//     if(!response.ok) throw new Error(`${data.message} (${response.status})`);

//     return data;
//   } catch (err) {
//     throw err;
//   };
// };


// let countriesData = [];


// // Get countries from API
// async function getAllCountries() {
//   try {
//     countriesData = await getData(countryUrl);
//   } catch(err) {
//     console.log(err);
//   }
// };


// // Render country list
// function render(data) {
//   let html = '';

//   html = `
//     <div class="country">
//       <div class="country_name" data-id="${data.updated}">${data.country}</div>
//       <div class="country_new">${data.todayCases}</div>
//       <div class="country_new-recovered">${data.todayRecovered}</div>
//     </div>
//   `;

//   document.querySelector('.countries-container').insertAdjacentHTML("beforeend", html);
// };


// // Render all country data as list
// async function loadWorldCountry() {
//   try {
//     await getAllCountries();  
//     countriesData.forEach( data => render(data));
//   } catch(err) {
//     console.error(err);
//   }
// };

// const btn = document.querySelector('.btn');

// btn.addEventListener('click', () => {
//   return loadWorldCountry();
// })



//////////////////////////////////////////////////////////////////////////////////////////////
// Giphy API Example

class Config {   
  topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];
  queryURL = "https://api.giphy.com/v1/gifs/search?";
}


class Catalog extends Config {
  data;
  query;  

  // params
  state = {
    q: this.query,
    limit: 10,
    api_key: "aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB",
    fmt: "json"
  };

  // Get
  getJSON = async function(url) {
    try {
      const fetchPro = fetch(url);
      const res = await Promise.race(fetchPro);
      this. data = await res.json();

      if(!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
    } catch (err) {
      throw err;
    }
  };

  // loadData
  loadSearchResults = async function(query) {
    try {
        state.q = this.query;
        const data = await getJSON(`${super.queryURL}${query}&key=${KEY}`);
        console.log(data);
    } catch (err) {
        console.error(`${err} ********`);
        throw err;
    }
};
};

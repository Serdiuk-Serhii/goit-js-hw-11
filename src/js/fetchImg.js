import { galleryEl } from "../index";


// const axios = require('axios').default;

const baseURL = 'https://pixabay.com/api';
const apiKey = '34936105-707dad1b86922b8a55c51c1b9';
const param = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
let page = 1;

export function getImg(inputValue) {
   return fetch(
      `${baseURL}?key=${apiKey}&q=${inputValue}&${param}&page=${1}`
   ).then(response => {
      if (!response.ok) {
         throw new Error(response.status);
      }
      return response.json();
   })
};



// export function onBtnLoadMoreClick(inputValue) {
//   page += 1;
//   getImg(inputValue);

//
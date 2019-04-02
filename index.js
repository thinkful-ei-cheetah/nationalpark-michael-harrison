'use strict';

let store = [];

class Park {
  constructor(data) {
    this.fullName = data.fullName;
    this.url = data.url;
    this.description = data.description;
  }
}

function watchForm(){
  $('form#js-form').on('submit', (event)=>{
    event.preventDefault();
    const stateCodes=$('#js-search-term').val();
    const maxNumber=$('#js-max-results').val();
    getParks(stateCodes, maxNumber);
  });
}
function formatQueryParams(params){
  const queryItems= Object.keys(params).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function buildApiUrl(query, limit) {
  const baseUrl = 'https://developer.nps.gov/api/v1/parks';
  const apiCode = 'hDamnHcByq8RvYZzTPXAbI157CfyqWHEigdtEsDg';
  let queryParam = {
    limit: limit,
    stateCode: query,
    api_key: apiCode   
  };
  return baseUrl + '?' + formatQueryParams(queryParam);
}

function buildParkHtml(park) {
  return `
    <li>
      <a href='${park.url}' target='_blank'>${park.fullName}</a>
      <p>${park.description}</p>
    </li>
  `;
}

function render() {
  const parkTemplate = store.map(buildParkHtml);
  $('#results-list').html(parkTemplate);
  $('#results').removeClass('hidden');
}

function getParks(query,limit){
  const apiUrl = buildApiUrl(query, limit);
  fetch(apiUrl)
    .then(response => response.json())
    .then(jsonData => {
      store = jsonData.data.map(data => new Park(data));
      render();
    });
}

function main(){
  watchForm();
}

$(main);
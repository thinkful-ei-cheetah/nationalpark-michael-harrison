'use strict'
const store=[];


//'api_key= 'hDamnHcByq8RvYZzTPXAbI157CfyqWHEigdtEsDg'
function watchForm(){
    $('form#js-form').on('submit', (event)=>{
        event.preventDefault();
        const state=$('#js-search-term').val();
        const maxNumber=$('#js-max-results').val();

    })
}
function formatQueryParams(params){
    const queryItems= Object.keys(params).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}
function getParks(query,limit){
    const baseUrl='https://developer.nps.gov/api/v1/parks';
    const apiCode ='hDamnHcByq8RvYZzTPXAbI157CfyqWHEigdtEsDg';
    let queryParam={
        limit:limit,
        stateCode:query,
        api_key:apiCode   
    };
    let finalurl = baseurl+formatQueryParams(queryParam);
    
}

function main(){
    watchForm();
    getParks()
}
$(main());
const rp = require('request-promise');


 class cmcApi
{
  constructor()
  {
    const api_url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency';
    let requestOptions = {
      method: 'GET',
      uri: api_url,
      qs: {
      },
      headers: {
        'X-CMC_PRO_API_KEY': token
      },
      json: true,
      gzip: true
    };
  }
   getLastPrice = function(coin)
      {
        this.requestOptions.uri =  api_url + "/listings/latest"
        this.requestOptions.qs = {"symbol" : coin};
        this.callApi();
      }
  callApi = function()
      {
          rp(requestOptions).then(response => {
            console.log('API call response:', response);
          }).catch((err) => {
            console.log('API call error:', err.message);
          });

      }
}
module.export= {cmcApi};//
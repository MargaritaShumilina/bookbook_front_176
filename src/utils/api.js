import { URL } from './utils';

class Api {
  constructor (config) {
    this._url = config.BASE_URL;
    this._headers = config.headers;
  }

  _handleOriginalResponse(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return Promise.resolve(res.json())
      .then((data) => {
        return { data, status: res.status }
      })
  };

  getSubjectsData(merchant_id) {
    return fetch(`${this._url}/api/v1/subjects/?merchant_id=${merchant_id}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  };

  getMerchantData(front_id) {
    const url = `${this._url}/api/v1/merchant/?front_id=${front_id}`;
    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  };

  createOrder(data) {
    console.log('data ', JSON.stringify(data));
    return fetch(`${this._url}/api/v1/create_order/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._handleOriginalResponse);
  };
};

const api = new Api(URL);

export default api;

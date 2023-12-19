const axios = require('axios');

/**
 * Tạo một HTTP request
 * @param {string} url 
 * @param {string} method 
 * @param {*} data 
 * @param {*} params 
 * @param {*} headers 
 * @param {*} responseType 
 * @returns 
 */
exports.send_request = async (url, method, data, params, headers) => {
    const requestOptions = {
        url: url,
        method: method,
        data: data,
        params: params,
        headers: headers
    };

    return axios(requestOptions).then(res => {
        return res;
    }).catch(err => {
        if (err.response && err.response.status == 409) {
            return;
        }
        console.log(err.message);
        return err;
    })
}
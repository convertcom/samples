import CryptoJS from 'crypto-js';

/**
 * Config section
 */
// Set your API Key
const apiKey = '';
// Set your API Secret
const apiSecret = '';
// Set your Account Id
const accountId = null;
// Set your Project Id
const projectId = null;
// No Need to change this line
const apiUrl = `https://api.convert.com/api/v2/accounts/${accountId}/projects/${projectId}/locations/add`;

// Set your urls and matching to be created under Location
/**
 * Example:
 * [
   {
    "name": "Test Location",
    "description": "Test Location description",
    "status": "active",
    "rules": {
      "OR": [
        {
          "AND": [
            {
              "OR_WHEN": [
                {
                  "rule_type": "url",
                  "matching": {
                    "match_type": "matches",
                    "negated": false
                  },
                  "value": "https://convert.com"
                }
              ]
            }
          ]
        }
      ]
    }
  }
 ]
 * @type {*[]}
 */
const locations = [];

/**
 *
 * @param application_id
 * @param application_secret
 * @param expires_timestamp
 * @param url
 * @param {Object|String} payload
 * @returns {*}
 */
let createRequestSignature = function(application_id, application_secret, expires_timestamp, url, payload = '') {
  let requestJson = (typeof payload === 'object') ? JSON.stringify(payload) : '';
  let signString = application_id + '\n' +
    expires_timestamp + '\n' +
    url + '\n' +
    requestJson;
  return CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(signString, application_secret));
};

/**
 *
 * @param {Object|String} payload
 * @param expires
 * @returns {{Authorization: string, 'Convert-Application-ID': ({template: string, label: string, sortable: boolean}|*), Expires: number, 'Content-Type': string}}
 */
let buildRequestHeader = function(payload = '', expires = 20) {
  let url = apiUrl;
  let expiresTimestamp = Date.now() / 1000 + expires;
  let signature = createRequestSignature(
    apiKey,
    apiSecret,
    expiresTimestamp,
    url,
    payload
  );

  return {
    'Convert-Application-ID': apiKey,
    'Authorization': 'Convert-HMAC-SHA256 Signature=' + signature,
    'Expires': expiresTimestamp,
    'Content-Type': 'application/json'
  };
};

const delay = ( time ) => {
  return new Promise(resolve => setTimeout(resolve, time));
}

const run = async () => {
  if ( !apiKey || !apiSecret || !accountId || !projectId ) {
    throw new Error('Some config value missed. Check config section!');
  }

  if ( locations.length === 0 ) {
    throw new Error('Locations list is empty!');
  }

  const failed = [];

  for ( let [ index, item ] of Object.entries( locations ) ) {
    try {
      const response = await fetch(apiUrl, {
        method: 'post',
        body: JSON.stringify( item ),
        headers: buildRequestHeader( item )
      });
      const data = await response.json();
    } catch ( err ) {
      failed.push({ item: item, error: err.message });
    }

    await delay( 2000 );
  }

  if ( failed.length > 0 ) {
    console.log('Failed: ', failed );
  } else {
    console.log('All locations created successfully');
  }

};


run().then( () => {
  console.log ('Done');
}).catch( ( error ) => {
  console.log( error );
});

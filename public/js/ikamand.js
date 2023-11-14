/**
* Utilities to connect to ikamand.
*/
const ikamand = (function(){
  var lastData = undefined;

  const uuidv4 = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const convertToObject = function (input) {
    const output = {};
    input.split('&').forEach((line) => {
      if (line) {
        const [key, value] = line.split('=');
        output[key] = value;
      }
    });
    return output;
  }

  const decodeData = function (rawText){
    const input = convertToObject(rawText);
    const output = {
      time: input['time'],
      rm: input['rm'],
      active: input['acs'],
      session_id: input['csid'],
      cm: input['cm'],
      ag: input['ag'],
      as: input['as'],
      currentPitTemperature: (input['pt'] > 0 ? input['pt'] : 400),
      probe1Temperature: (input['t1'] > 0 ? input['t1'] : 400),
      probe2Temperature: (input['t2'] > 0 ? input['t2'] : 400),
      probe3Temperature: (input['t3'] > 0 ? input['t3'] : 400),
      fanSpeed: input['dc'],
      targetPitTemperature: input['tpt'],
    };
    return output;
  }

  const fetchAndDecodeData = function (url, options){
    return fetchData(url, options).then(response => {
       // console.log(response);
       if( response != undefined ){
         const obj = decodeData(response);
         return obj;
       }
    });
  }

  var errorCount = 0;
  var lastErrorTimestamp = undefined;

  const fetchData = function(url, options) {
    const refreshPeriod = config.getRefreshPeriod();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), refreshPeriod * 1000 );

    options = {
      ...options,
      signal: controller.signal
    };

    return fetch(url, options).then(response => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.text();
    }).then((response) => {
      errorCount = 0;
      lastErrorTimestamp = undefined;
      return response;
    }).catch((error) => {
      const currentTime = new Date().getTime();
      if( lastErrorTimestamp == undefined || lastErrorTimestamp + 2000 < currentTime){
        errorCount++;
        lastErrorTimestamp = currentTime;
        console.log(`Failed to connect to ikamand - ${error}`);
      } else {
        console.log(`Failed to connect to ikamand but refuse to count as error - ${error}`);
      }
      return undefined;
    });
  }

  const getFullUrl = function(path) {
    return `/cgi-bin/${path}`;
  }

  return {
    getData: function(){
      lastData = fetchAndDecodeData(getFullUrl("data"));
      return lastData;
    },
    stop: function(){
      const payload = new URLSearchParams();
      payload.set('acs', '0');
      payload.set('ag', '0');
      payload.set('csid', '');
      payload.set('sce', '0');
      payload.set('sge', '0');
      payload.set('as', '0');

      const headers = {
       'Content-Type': 'application/x-www-form-urlencoded',
      };

      return fetchAndDecodeData(getFullUrl("cook"), {
        method: 'POST',
        body: payload,
        headers: headers,
      })
    },
    start: function(targetPitTemperature, targetFoodTemperature){
      var currentTime = Math.round(new Date().getTime()/1000);

      const payload = new URLSearchParams();
      payload.set('acs', '1');
      payload.set('csid', uuidv4());
      payload.set('tpt', targetPitTemperature);
      payload.set('sce', currentTime + 24*60*60);
      payload.set('p', '1');
      payload.set('tft', targetFoodTemperature);
      payload.set('as', '0');
      payload.set('ct', currentTime);

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      return fetchAndDecodeData(getFullUrl("cook"), {
        method: 'POST',
        body: payload,
        headers: headers,
      });
    },
    lastData: function(){
      return lastData;
    },
    isOnline(){
      return errorCount < 3;
    },
  };
})();


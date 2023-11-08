/**
* Utilities to manage the configuration.
*/
const config = (function(){
  var temperatureUnit = {
      celsius: 1,
      fahrenheit: 2,
  };

  var get = function(){
    return JSON.parse(localStorage.getItem("config")) || {};
  };

  var set = function(c){
    localStorage.setItem("config", JSON.stringify(c));
  }

  return {
    //
    // refresh period
    //
    setRefreshPeriod: function(period){
      if( period == undefined ){
        return;
      }
      var c = get();
      c["refreshPeriod"] = period;
      set(c);
    },
    getRefreshPeriod: function(){
      return get()["refreshPeriod"] ?? 5;
    },

    //
    // target food temperature
    //
    setTargetFoodTemperature: function(targetFoodTemperature){
      if( targetFoodTemperature == undefined ){
        return;
      }
      var c = get();
      c["targetFoodTemperature"] = targetFoodTemperature;
      set(c);
    },
    getTargetFoodTemperature: function(){
      return get()["targetFoodTemperature"] ?? 60;
    },

    //
    // target pit temperature
    //
    setTargetPitTemperature: function(targetPitTemperature){
      if( targetPitTemperature == undefined ){
        return;
      }
      var c = get();
      c["targetPitTemperature"] = targetPitTemperature;
      set(c);
    },
    getTargetPitTemperature: function(){
      return get()["targetPitTemperature"] ?? 110;
    },

    //
    // temperature unit
    //
    temperatureUnit,
    setTemperatureUnit: function(temperatureUnit){
      if( temperatureUnit == undefined ){
        return;
      }
      var c = get();
      c["temperatureUnit"] = temperatureUnit;
      set(c);
    },
    getTemperatureUnit: function(){
      return get()["temperatureUnit"] ?? temperatureUnit.celsius;
    },
  }
})();


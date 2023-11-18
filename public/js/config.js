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

    //
    // visibility
    //
    setShowFanSpeed: function(showFanSpeed){
      if( showFanSpeed == undefined ){
        return;
      }
      var c = get();
      c["showFanSpeed"] = showFanSpeed;
      set(c);
    },
    getShowFanSpeed: function(){
      return get()["showFanSpeed"] ?? true;
    },

    //
    // visibility
    //
    setShowTargetPitTemperature: function(showTargetPitTemperature){
      if( showTargetPitTemperature == undefined ){
        return;
      }
      var c = get();
      c["showTargetPitTemperature"] = showTargetPitTemperature;
      set(c);
    },
    getShowTargetPitTemperature: function(){
      return get()["showTargetPitTemperature"] ?? true;
    },

    //
    // visibility
    //
    setShowTargetFoodTemperature: function(showTargetFoodTemperature){
      if( showTargetFoodTemperature == undefined ){
        return;
      }
      var c = get();
      c["showTargetFoodTemperature"] = showTargetFoodTemperature;
      set(c);
    },
    getShowTargetFoodTemperature: function(){
      return get()["showTargetFoodTemperature"] ?? true;
    },

    //
    // visibility
    //
    setShowProbe1Temperature: function(showProbe1Temperature){
      if( showProbe1Temperature == undefined ){
        return;
      }
      var c = get();
      c["showProbe1Temperature"] = showProbe1Temperature;
      set(c);
    },
    getShowProbe1Temperature: function(){
      return get()["showProbe1Temperature"] ?? true;
    },

    //
    // visibility
    //
    setShowProbe2Temperature: function(showProbe2Temperature){
      if( showProbe2Temperature == undefined ){
        return;
      }
      var c = get();
      c["showProbe2Temperature"] = showProbe2Temperature;
      set(c);
    },
    getShowProbe2Temperature: function(){
      return get()["showProbe2Temperature"] ?? true;
    },

    //
    // visibility
    //
    setShowProbe3Temperature: function(showProbe3Temperature){
      if( showProbe3Temperature == undefined ){
        return;
      }
      var c = get();
      c["showProbe3Temperature"] = showProbe3Temperature;
      set(c);
    },
    getShowProbe3Temperature: function(){
      return get()["showProbe3Temperature"] ?? true;
    },

    //
    // visibility
    //
    setShowCurrentPitTemperature: function(showCurrentPitTemperature){
      if( showCurrentPitTemperature == undefined ){
        return;
      }
      var c = get();
      c["showCurrentPitTemperature"] = showCurrentPitTemperature;
      set(c);
    },
    getShowCurrentPitTemperature: function(){
      return get()["showCurrentPitTemperature"] ?? true;
    },
  }
})();


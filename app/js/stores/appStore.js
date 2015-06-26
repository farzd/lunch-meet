var appDispatcher = require('../dispatcher/appDispatcher');
var appActions = require('../actions/appActions');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';




var appStore = assign(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  calculatedLocation: function () {
      return location;
  },

  dispatcherIndex: appDispatcher.register(function (payload) {
    switch(payload.type) {
      case 'get-location':
      appStore.getLocation();
      break;
    }

    appStore.emitChange();

    return true;

  })
});

var location;

function init() {
    navigator.geolocation.getCurrentPosition(function(position){
         location = {
             lat: position.coords.latitude,
             long: position.coords.longitude
         };
        appStore.emitChange();
    }, function(error) {
         location = 'error:' + error.message;
        appStore.emitChange();
    }, {timeout:10000});
}

 init();

module.exports = appStore;

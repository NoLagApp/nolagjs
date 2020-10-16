"use strict";

const WebSocketNode = require('ws');

module.exports = function ({
  ...options
},connected, close) {
  class NoLagJs {
    constructor({...options}) {
      this._options = {...options};
      this._events = {};
      this._saveEvents = [];

      this.connect();
    }

    connect() {
      (this.isBrowser) ? this.browserInstance() : this.nodeInstance();
    }

    // on(wsEvent, callback) {
    //   if (typeof this.wsEvents[wsEvent] !== 'undefined') {
    //     this.wsEvents[wsEvent] = callback;
    //   }
    // }

    // triggerEvent(wsEvent) {
    //   let callback = this.wsEvents[wsEvent];
    //   // callback()
    //   console.log(callback);
    // }

    browserInstance() {
    // eslint-disable-next-line no-undef
      this._ws = new WebSocket(`ws://${this._options.server}`);

      this._ws.onopen = event => {
        this.onOpen(event);
      };

      this._ws.onclose = event => {
        this.onError(event);
      };

      this._ws.addEventListener("message", event => {
        this.onReceive(event);
      });

      this._ws.addEventListener("error", event => {
        this.onError(event);
      });
    }

    nodeInstance() {
      this._ws = new WebSocketNode(`ws://${this._options.server}`);

      this._ws.on('open', function open(event) {
        this.onOpen(event);
      });

      this._ws.on('message', function incoming(event) {
        this.onReceive(event);
      });

      this._ws.on('close', function incoming(event) {
        this.onError(event);
      });
    }

    get isBrowser() {
      let isNode = true;
      if (typeof process === 'object') {
        if (typeof process.versions === 'object') {
          if (typeof process.versions.node !== 'undefined') {
            isNode = false;
          }
        }
      }
      return isNode;
    }

    isFunction(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    }

    onOpen() {
      this.authenticate();
    }

    event(name, action, options) {
      if (this.isFunction(action)) {
      
        // this._saveEvents.push({
        //   name: name,
        //   action: action,
        //   options: options
        // });

        this._events[name] = action;
        this.send({
          header: {
            event: name
          },
          options: options
        });
      } else {
        this.send({
          header: {
            event: name
          },
          options: options,
          data: action
        });
      }
    }

    onReceive(event) {
      try {
        const receive = this.jsonParse(event.data);
        if (
          receive !== null &&
        typeof receive.header !== 'undefined' &&
        typeof receive.header.event !== 'undefined' &&
        typeof this._events[receive.header.event] !== 'undefined'
        ) {
          let callback = this._events[receive.header.event];
          callback(receive.data);
        }
      } catch (e) {
        console.error(e);
      }
    }

    onError(event) {
      this._connected = false;
      // setTimeout(async () => {
      // if(!this.connected) {
      // await this.connect();
      // } else {
      //   clearInterval(reconnect);
      // }
      // }, 7000);
      close();
      console.log(event);
    }

    authenticate() {
      if (typeof this._options.collactionKey === 'undefined') console.error('Collection Key not "undefined');

      this._connected = true;
      this.send({
        header: {
          key: this._options.collactionKey
        }
      });
      console.log('fun', this.connected);
      connected();
      this.resetEvents();
    }

    resetEvents() {
      if (this._saveEvents.length !== 0) {
        for (let event of this._saveEvents) {
          this.event(event.name, event.action, event.options);
        }
      }
    }

    send(transport) {
      this._ws.send(this.jsonStringify(transport));
    }

    jsonParse(string) {
      try {
        return JSON.parse(string);
      } catch(e) {
        throw null;
      }
    }

    jsonStringify(object) {
      try {
        return JSON.stringify(object);
      } catch (e) {
        throw null;
      }
    }
  }

  return new NoLagJs({
    ...options
  });
};
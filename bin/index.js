"use strict";

const WebSocketNode = require('ws');

module.exports = function ({
  ...options
}, connectedCallback, close) {
  class NoLagJs {
    constructor({
      ...options
    }) {
      this._options = {
        ...options
      };
      this._events = {};
      this._saveEvents = [];

      this.connect();
    }

    connect() {
      (this.isBrowser) ? this.browserInstance(): this.nodeInstance();
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
        this.send({...{
          header: {
            event: name
          }
        }, ...options
        });
      } else {

        // Cast to string
        if (action instanceof Object) {
          action = JSON.stringify(action);
        } else {
          action = String(action);
        }

        this.send({...{
          header: {
            event: name
          },
          data: action
        }, ...options});
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
        } else if (receive !== null &&
          typeof receive.header !== 'undefined' &&
          typeof receive.header.id !== 'undefined') {
          // eslint-disable-next-line no-undef
          this._tunnelId = receive.header.id;
        }
      } catch (e) {
        console.error(e);
      }
    }

    onError(event) {
      this._connected = false;
      setTimeout(async () => {
        if(!this.connected) {
          await this.connect();
        } else {
          // clearInterval(reconnect);
        }
      }, 7000);
      close();
      console.log(event);
    }

    authenticate() {
      if (typeof this._options.tunnelKey === 'undefined') console.error('Tunnel Key not defined');

      this._connected = true;
      let header = {
        key: this._options.tunnelKey
      };
      
      if (typeof this._options.auth !== 'undefined') header.auth = this._options.auth;
      
      if (this._tunnelId) {
        header.id = this._tunnelId;
      }
      this.send({
        header: header
      });
      
      connectedCallback();
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
        let parse = {};
        if (string !== '') {
          parse = JSON.parse(string);
        }
        return parse;
      } catch (e) {
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
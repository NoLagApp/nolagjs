"use strict";

const WebSocketNode = require('ws');

module.exports = class NoLagJs {
  constructor({...options}) {
    this._options = options;

    return this.connect();
  }

  connect() {
    // eslint-disable-next-line no-undef
    return (this.isBrowser) ? this.browserInstance() : this.nodeInstance();
  }

  browserInstance() {
    
    return new Promise((res, rej) => {
    
      // eslint-disable-next-line no-undef
      this._ws = new WebSocket(`ws://${this._options.server}`);

      this._ws.onopen = event => {
        this.onOpen(event);
        res(this);
      };

      this._ws.onclose = event => {
        this.onError(event);
        rej(event);
      };

      this._ws.addEventListener("message", event => {
        this.onReceive(event);
      });

      this._ws.addEventListener("error", event => {
        this.onError(event);
      });
    });
  }

  nodeInstance() {

    return new Promise((res, rej) => {

      this._ws = new WebSocketNode(`ws://${this._options.server}`);

      this._ws.on('open', function open(event) {
        this.onOpen(event);
        res(this);
      });

      this._ws.on('message', function incoming(event) {
        this.onReceive(event);
      });

      this._ws.on('close', function incoming(event) {
        this.onError(event);
        rej(event);
      });

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
      this.events[name] = action;
      this.send({
        header: {
          event: name
        }
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
      this.data = JSON.parse(event.data);
      let callback = this.events[this.data.header.event];
      callback(this.data.data);
    } catch (e) {
      console.error(e);
    }
  }

  onError(event) {
    console.log(event);
  }

  authenticate() {
    this.connected = true;
    console.log(this._options.collactionKey);
    console.log({
      header: {
        key: this._options.collactionKey
      }
    });
    this.send({
      header: {
        key: this._options.collactionKey
      }
    });
  }

  send(transport) {
    this._ws.send(JSON.stringify(transport));
  }
};

import vue from 'nativescript-vue';

const TERM_EVENT = 'modal:terminate';
const TERM_PAYLOAD = 'TERMINATE';

const FNULL = () => null;

class ModalReturn {
  constructor(promise) {
    this._onClose = FNULL;
    this._onAnyClose = FNULL;
    this._onError = FNULL;
    this._onTerminate = FNULL;

    promise
      .then(resp => {
        if (resp === TERM_PAYLOAD) {
          this._onTerminate(resp);
        } else {
          this._onClose(resp);
        }
        this._onAnyClose(resp);
      })
      .catch(error => {
        console.error(error);
        this._onError(error);
      });
  }

  onClose(callback) {
    this._onClose = callback;
    return this;
  }

  onAnyClose(callback) {
    this._onAnyClose = callback;
    return this;
  }

  onTerminate(callback) {
    this._onTerminate = callback;
    return this;
  }

  onError(callback) {
    this._onError = callback;
    return this;
  }
}

export class ModalBus {
  constructor() {
    this.TERMINATE = TERM_PAYLOAD;
    this._bus = new vue();
  }

  get bus() {
    return this._bus;
  }

  open(component, props, allowOuterClose) {
    return new ModalReturn(
      new Promise(resolve => {
        this._bus.$emit('modal:create', component, resolve, props, allowOuterClose);
      }),
    );
  }

  closeAll() {
    console.log('[ModalBus] close all');
    this._bus.$emit(TERM_EVENT, TERM_PAYLOAD);
  }

  on(event, callback) {
    this._bus.$on(event, callback);
  }

  send(event, payload) {
    this._bus.$emit(event, payload);
  }

  onTerminate(callback) {
    this._bus.$on(TERM_EVENT, callback);
  }
}

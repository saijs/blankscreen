/**
 * 白屏监控
 *
 * @usage
 *
 * const bs = new BlankScreen({
 *   element: '#selector',
 *   rule: {
 *     text: 6, // 有效文本少于 6 个则被判定为处于白屏状态；
 *     element: 2, // 或元素个数少于 2 个则被判定为处于白屏状态。
 *   },
 *   onError: err => console.error(err),
 *   onSuccess: time => console.log('first paint:', time),
 * });
 * bs.start();
 *
 * @author 冒顿
 * @version 2018-04-30
 */
const BLANK_TIMEOUT = 6000; // 6s
const WAITING_TIEM = 300;

class BlankScreen {
  constructor(element = document.documentElement, options) {
    this._timer = null;
    this._element = element;
    this.rule = options.rule || {
      text: 0,
      element: 0,
    };
    this._state = undefined;
    this._result = '';
    this.onError = options.onError;
    this.onSuccess = options.onSuccess;

    // 离开打开超过 3s 的页面时，检查白屏。
    window.addEventListener('beforeunload', () => {
      this.stop();
    }, false);
    window.addEventListener('unload', () => {
      this.stop();
    }, false);
  }

  isBlank() {
    const text = trim(this._element.innerText);
    if (text.length <= this.rule.text) return true;
    const element = this._element.querySelectorAll('*');
    return element.length <= this.rule.element;
  }

  start() {
    this._startTime = now();
    this._state = '';
    this.loop();
  }

  loop() {
    if (this._result) { return; }
    const blank = this.isBlank();
    const time = now() - this._startTime;
    if (blank) {
      if (time > BLANK_TIMEOUT) {
        this._state = 'timeout';
      }
      if (this._state) {
        this._result = 'error';
        this.onError && this.onError({
          time,
          state: this._state,
        });
      } else {
        this._timer = setTimeout(() => {
          this.loop();
        }, WAITING_TIEM);
      }
    } else {
      this._state = 'success';
      this._result = 'success';
      this.onSuccess && this.onSuccess({
        time,
        state: this._state,
      });
    }
  }

  stop() {
    this._state = 'stop';
    clearTimeout(this._timer);
    this.loop();
  }
}

function now() {
  return Date.now ? Date.now() : (new Date()).getTime();
}
function trim(str) {
  return str.split(/\r|\n|\s/).join('');
}

// 默认全局白屏监控
const bs = new BlankScreen(document.documentElement, { });
setTimeout(() => bs.start(), 15);

BlankScreen.global = bs;

module.exports = BlankScreen;

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

    // 离开页面时，检查白屏。
    window.addEventListener('beforeunload', () => {
      this.stop();
    }, false);
    window.addEventListener('unload', () => {
      this.stop();
    }, false);

    if (options.autoStart) {
      this.start();
    }
  }

  /*
   * 判定是否白屏。
   *
   * 文字\元素 | 有 | 无
   * ----------|----|----
   *        有 | 黑 | 黑
   *        无 | 白 | 白
   *
   * 白屏只通过是否有指定个数的文字来判定，
   * 子元素个数多少不作为判定条件，只作为附加信息。
   */
  isBlank() {
    const text = trim(this._element.innerText);
    if (text.length > this.rule.text) return false;
    const element = this._element.querySelectorAll('*');
    return {
      isBlank: true,
      textLength: text.length,
      elemLength: element.length,
    };
  }

  start() {
    if (typeof this._state !== 'undefined') { return; }
    this._state = '';
    this._startTime = now();

    setTimeout(() => {
      this.loop();
    }, 15);
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
          textLength: blank.textLength,
          elemLength: blank.elemLength,
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


module.exports = BlankScreen;

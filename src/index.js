/**
 * 默认的全屏白屏监控。
 *
 * @author 冒顿
 * @version 2018-06-20
 */
import BlankScreenBase from './base.js';

// 默认全局白屏监控
const bs = new BlankScreenBase(document.documentElement, { });
bs.start();

export default bs;

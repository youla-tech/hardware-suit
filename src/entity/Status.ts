/*
 * @Author: eamiear
 * @Date: 2021-02-02 14:39:01
 * @Last Modified by:   eamiear
 * @Last Modified time: 2021-02-02 14:39:01
 */
import { Converter } from "../utils/converter";

export class Status {
  public readonly status: string = '';
  constructor(status: string) {
    status = status.length < 16 ? status.padRight(16) : status
    this.status = status;
  }
  /**
   * 根据给定数量值，将16进制状态解析成二进制状态码，并反顺序返回。二进制位（bit）从右往左取值
   *
   * @exmaple
   *
   * ```javascript
   * const state = '78' // (hex)
   * const count = 4
   * const splitSize = 2
   *
   * __parseBitState(state, count, splitSize)
   *
   * // '01111000' => ['01', '11', '10', '00'] ===> ["00", "10", "11", "01"]
   *
   * ```
   * @param state 16进制状态码('01')
   * @param count 码数量
   * @param splitSize 分割位数，默认2，设置成1时，对位bit进行处理
   */
  __parseBitState (state: string, count: number, splitSize: number = 2) {
    let keyList = []
    const converter = new Converter(state || '00', 16)
    const bits = converter.fill(8, converter.toBinary())
    let i = 0
    for (let index = count; index > 0; index--) {
      keyList.push(bits.slice(bits.length - splitSize * (i + 1), bits.length - splitSize * i))
      i += 1
    }
    // 这里统一对切割数为1的进行补0操作，如无需补0的，可针对返回值进行二次处理
    if (splitSize === 1) keyList = keyList.map(k => this.adaptHex(k))
    return keyList
  }
  public adaptHex(hex: string): string {
    if (!hex) return ''
    return hex.length > 1 ? hex : `0${hex}`;
  }
}

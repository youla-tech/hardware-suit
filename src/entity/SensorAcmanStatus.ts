/*
 * @Author: eamiear
 * @Date: 2021-02-02 14:34:59
 * @Last Modified by:   eamiear
 * @Last Modified time: 2021-02-02 14:34:59
 */

import { Status } from './Status';

export class SensorAcmanStatus extends Status {
  /** ac状态 */
  public state: string = '';
  /** 光感状态 */
  public man: string = '';

  /**
   * AC 人体红外 + 光感传感器
   * @param status 状态值
   */
  constructor (status: string) {
    super(status)
    this.state = status.slice(2, 4)
    this.man = status.slice(6, 8)
  }
  getStatus (): string {
    return this.state.toEvenHex()
  }
  setStatus (state: string): SensorAcmanStatus {
    this.state = state.toEvenHex()
    return this
  }
  getManStatus (): string {
    return this.man
  }
}

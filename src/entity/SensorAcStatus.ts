/*
 * @Author: eamiear
 * @Date: 2020-12-22 15:09:23
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-03 14:35:48
 */
import { Status } from './Status';

export class SensorAcStatus extends Status {
  /** 检测状态 */
  public state: string = '';
  /** 事件类型 */
  event: string;
  /** 电压 */
  vol: string;
  /** 电量 */
  electric: string

  /**
   * AC 人体红外传感器
   * @param status 状态值
   */
  constructor (status: string) {
    super(status)
    this.event = status.slice(0, 2)
    this.state = status.slice(2, 4)
    this.vol = status.slice(4, 6)
    this.electric = status.slice(6, 8)
  }
  getStatus (): string {
    return this.state.toEvenHex()
  }
  setStatus (state: string): SensorAcStatus {
    this.state = state.toEvenHex()
    return this
  }
  getVol (): string {
    return this.vol
  }
  getElectric (): string {
    return this.electric
  }
}

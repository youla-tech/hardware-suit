/*
 * @Author: eamiear
 * @Date: 2021-02-02 14:36:50
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-03 14:33:57
 */
import { Status } from './Status';

export class SensorDetectStatus extends Status {
  /** 预留 */
  preserve: string = '';
  /** 事件标识状态 */
  public state: string = '';
  /** 电压/电量 */
  vol: string = ''

  /**
   * 一键呼叫、门磁、水浸、尿床等设备状态实体类
   * @param status 状态值
   */
  constructor (status: string) {
    super(status)
    this.preserve = status.slice(0, 2)
    this.state = status.slice(2, 4)
    this.vol = status.slice(6, 8)
  }
  parseBitState (state: string, count: number) {
    return this.__parseBitState(state, count, 1)
  }
  getStatus (): string {
    return this.state.toEvenHex()
  }
  setStatus (state: string): SensorDetectStatus {
    this.state = state.toEvenHex()
    return this
  }
  getPreserveStatus (): string {
    return this.preserve.toEvenHex()
  }
  getVolStatus (): string {
    return this.vol.toEvenHex()
  }
}

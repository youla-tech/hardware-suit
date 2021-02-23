/*
 * @Author: eamiear
 * @Date: 2020-10-12 17:25:24
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-02 14:33:17
 */

import { Status } from './Status';

export class CardPowerStatus extends Status {
  /** 当前状态 */
  public state: string = '';
  /** 设置状态 */
  public confState: string = '';
  /** 使能状态 */
  public actionState: string = '';

  /**
   * 插卡取电实体类
   * @param status 状态值
   */
  constructor (status: string) {
    super(status)
    this.confState = this.status.slice(0, 2)
    this.state = this.status.slice(2, 4)
    this.actionState = this.status.slice(4, 6)
  }
  /**
   * 获取当前状态
   */
  getStatus (): string {
    return this.state.toEvenHex()
  }
  /**
   * 设置当前状态
   * @param state 当前状态值
   */
  setStatus (state: string): CardPowerStatus {
    this.state = state.toEvenHex()
    return this
  }
  /**
   * 设置状态
   * @param state 设置状态值
   */
  setConfStatus (state: string): CardPowerStatus {
    this.confState = state.toEvenHex()
    return this
  }
  getConfStatus (): string {
    return this.confState.toEvenHex()
  }
  setActionState (state: string): CardPowerStatus {
    this.actionState = state.toEvenHex()
    return this
  }
  getActionState (): string {
    return this.actionState.toEvenHex()
  }
}

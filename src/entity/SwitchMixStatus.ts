/*
 * @Author: eamiear
 * @Date: 2020-08-29 17:46:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-02 14:20:13
 */

import { OrderEnum, SwitchStatus } from './SwitchStatus';

export class SwitchMixStatus extends SwitchStatus {
  /** 次级状态（非主程） */
  extraState: string;
  /** 次级按键列表 */
  extraKeyDots: string[];
  /**
   * 混合面板(情景 + 开关)，这里划分为主程类型及次程类型；主程与次程操作隔离。普通开关面板，开关为主程；情景开关，情景为主程； 混合开关， 情景为主程
   * @param status 状态码
   * @param count 按键数量列表
   * @param pattern 类型范式
   */
  constructor (status: string, count?: Array<number>, pattern?: string) {
    super(status, count, pattern)
    this.extraState = status.slice(2, 4)
    this.extraKeyDots = this.__parseBitState(this.extraState, this.extraCount)
  }

  /** 次程面板按键数 */
  get extraCount(): number {
    return this.count[OrderEnum.Secondary] || 0
  }
  /**
   * 设置次程面板按键值
   * @param v 二进制值
   * @param index 索引
   */
  setExtraKeyDots (v: string, index: number): SwitchMixStatus {
    if (index + 1 > this.extraCount) return this
    this.extraKeyDots[index] = v.toEven()
    return this
  }
  /**
   * 根据索引获取次程面板按键值
   * @param index 索引
   */
  getExtraKeyDotByIndex (index: number) {
    if (index + 1 > this.extraCount) return
    return this.extraKeyDots[index]
  }

  /**
   * 获取次程状态
   */
  getExtraState () {
    return this.extraState
  }
}

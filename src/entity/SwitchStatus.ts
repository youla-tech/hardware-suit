/*
 * @Author: eamiear
 * @Date: 2020-08-29 17:46:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-02 14:25:31
 */

import { ScenePatterns } from '../modules/SwitchMixEquip';
import { Status } from './Status';

export enum OrderEnum {
  Primary = 0,
  Secondary = 1
}
/**
 * 开关 或 情景状态
 */
export class SwitchStatus extends Status {
  /** 开关状态 */
  public state: string = '';
  /** 类型范式, 根据类型范式可以指向具体的某种开关类型及其按键数 {@link Suiter.socketSwitch.typeIndex}*/
  pattern: string = '';
  /** 按键数列表, 如 [3, 3] 表示触摸开关有3按键， 情景开关有3按键 */
  count: number[] = [1];
  /** 按键字节位 */
  keyDots: string[];

  /**
   * 触摸开关、情景开关等开关状态实体类
   * @param status 状态
   * @param count 按键数
   * @param pattern 类型范式
   */
  constructor (status: string, count?: Array<number>, pattern?: string) {
    super(status)
    this.state = status.slice(0, 2) || '00'
    this.count = count || [1]
    this.pattern = pattern || ''
    this.keyDots = this.getKeyDots()
  }
  /** 主程按键数，普通开关面板，开关为主程，情景开关，情景为主程， 混合开关，情景为主程 */
  get _count () {
    return this.count[OrderEnum.Primary]
  }
  /** 类型范式 */
  get _pattern (): string {
    return this.pattern
  }
  /**
   * 获取主程按键坑位二进制位码，并获取按键正序
   * 情景 一个 bit 表示一个按键
   */
  getKeyDots () {
    const bit = ScenePatterns.includes(this.pattern) ? 1 : 2
    return this.__parseBitState(this.state, this._count, bit)
  }
  /**
   * 设置按键值
   * @param v 二进制值
   * @param index 索引
   */
  setKeyDot (v: string, index: number): SwitchStatus {
    if (index + 1 > this._count) return this
    this.keyDots[index] = v.toEven()
    return this
  }
  /**
   * 获取按键值
   * @param index 索引
   */
  getKeyDotByIndex (index: number) {
    if (index + 1 > this._count) return
    return this.keyDots[index]
  }
  getState () {
    return this.state
  }
}

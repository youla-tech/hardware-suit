/*
 * @Author: eamiear
 * @Date: 2020-12-18 14:25:16
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-02 14:14:59
 */
import { SwitchStatus } from './SwitchStatus';

export class SwitchPlugStatus extends SwitchStatus {
  /** 开关状态 */
  public state: string = '';
  /** 类型状态 */
  typeState: string;
  /** 上报时间 */
  timeState: string;
  /** 过载功率 */
  overloadPowerState: string;
  /** 当前功率 */
  curPowerState: string;
  /** 用电量 */
  kWhState: string;
  /** 次程面板按键数 */
  extraCount: number;
  /** 次程面板状态 */
  extraState: string;
  /** 次程面板按键列表 */
  extraKeyDots: never[];

  /**
   * 智能插座
   * @param status 状态码
   * @param count 按键数量列表
   */
  constructor (status: string, count?: Array<number>) {
    super(status, count)
    this.typeState = status.slice(0, 2)
    this.timeState = status.slice(2, 4)
    this.overloadPowerState = status.slice(6, 8)
    this.curPowerState = status.slice(8, 12)
    this.kWhState = status.slice(12, 16)

    this.state = status.slice(0, 2)
    this.extraCount = 0
    this.extraState = ''
    this.extraKeyDots = []

    this.keyDots = this.getKeyDots()
  }

  /**
   * 获取按键位列表
   */
  getKeyDots () {
    return this.__parseBitState(this.state, this._count, 1)
  }

  /**
   * TODO
   * 设置次程面板按键位值
   * @param v 按键位值
   * @param index 按键位索引
   */
  setExtraKeyDots (v: string, index: number):SwitchPlugStatus {
    console.log(v, index)
    return this
  }
  /**
   * 获取按键值
   * @param index 索引
   */
  getExtraKeyDotByIndex (index: number) {
    console.log(index)
    return ''
  }

  getExtraState () {
    return ''
  }
}

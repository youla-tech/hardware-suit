/*
 * @Author: eamiear
 * @Date: 2020-08-29 20:16:40
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-03 16:11:08
 */
import { SwitchMixStatus } from '../entity/SwitchMixStatus';
import { OrderEnum } from '../entity/SwitchStatus';
import { CdtSwitchCodeValMap } from '../shared/constant';
import { BaseEquip } from './BaseEquip';
import { CurtainStatusMap } from './CurtainEquip';

// 按键类型索引 3|3
// 开关|情景|单线|插座|雷达|红外|窗帘
enum SwitchKeyTypeIndex {
  SWITCH = 0, // 普通
  SCENE = 1, // 情景
  LINE = 2, // 单线
  SOCKET = 3, // 插座
  RADAR = 4, // 雷达
  INFRARED = 5, // 红外
  CURTAIN = 6, // 窗帘
}

// 开关类型
const SwitchKeyTypeIndexMap: any = {
  [SwitchKeyTypeIndex.SWITCH]: 'switch',
  [SwitchKeyTypeIndex.SCENE]: 'scene',
  [SwitchKeyTypeIndex.LINE]: 'line',
  [SwitchKeyTypeIndex.SOCKET]: 'socket',
  [SwitchKeyTypeIndex.RADAR]: 'radar',
  [SwitchKeyTypeIndex.INFRARED]: 'infrared',
  [SwitchKeyTypeIndex.CURTAIN]: 'curtain',
}
const SwitchTypeIndexObj: any = {
  switch: 0,
  scene: 0,
  line: 0,
  socket: 0,
  radar: 0,
  infrared: 0,
  curtain: 0
}

// 按键状态
enum SwitchKeyStatus {
  ON = 1,
  OFF = 0
}
const SwitchKeyStatusMap: any = {
  [SwitchKeyStatus.ON]: '开',
  [SwitchKeyStatus.OFF]: '关'
}

const DEFAULT_KEY_COUNT = 0 // 默认按键数

// 按键类型范式
export enum KeyTypePatternEnum {
  SWITCH = '10',  // 开关
  SCENE = '01',   // 情景
  SWITCHSCENE = '11', // 开关 + 情景
  LINE = '001', // 单线
  SOCKET = '0001', // 插座
  SWITCHRADAR = '10001', // 雷达开关
  SCENERADAR = '01001', // 雷达情景
  SWITCHIR = '100001', // 红外开关
  SCENEIR = '010001', // 红外情景
  SWITCHSCENEIR = '110001', // 红外开关+情景
  SCENECURTAIN = '0100001', // 窗帘
}

export const ScenePatterns = [
  `${KeyTypePatternEnum.SCENE}`,
  `${KeyTypePatternEnum.SWITCHSCENE}`,
  `${KeyTypePatternEnum.SCENERADAR}`,
  `${KeyTypePatternEnum.SCENEIR}`,
  `${KeyTypePatternEnum.SWITCHSCENEIR}`,
  `${KeyTypePatternEnum.SCENECURTAIN}`,
]

export class SwitchMixEquip extends BaseEquip {
  switchStatus: SwitchMixStatus;
  /** 类型索引字符串，如1|3 */
  typeStr: any;
  /** 设备控制字节码串 */
  bytes = `{0}{1}000000000000`;
  /** 场景联动条件字节码串 */
  cdtBytes = `4a{0}000000000000`;
  /**
   * 面板开关(普通开关、情景开关、单线开关、混合开关[普通+情景])
   * @param status 状态
   * @param deviceType 主类型
   * @param deviceChildType 子类型
   * @param flag 标志位，用于情景是否置零
   */
  constructor(status: string, deviceType ? : string, deviceChildType ? : string, flag?: any) {
    super(status, deviceType, deviceChildType)
    this.typeStr = this.TypeHints.getSocketSwitchTypeIndex(deviceType, deviceChildType)
    this.switchStatus = new SwitchMixStatus(this.__parseStatus(status, flag), this.orderCount, this.keyTypePattern)
  }

  /**
   * 解析状态码，情景类型： 操作时置零，获取状态时不置零，其他类型不处理
   * @param status 状态码串
   * @param flag 是否置零
   */
  private __parseStatus (status: string, flag: boolean = false) {
    const isScene = this.isScene || this.isSwitchScene || this.isCurtain || this.isRadarScene || this.isInfraredScene
    if (isScene) {
      return !flag ? `00${status.slice(2)}` : status
    }
    return status
  }

  /**
   * 类型索引 `1|3` 数字表示按键数
   */
  get typeIndex() {
    return this.typeStr
  }
  /**
   * 开关类型标志
   * ```js
   * {
   *   switch: 1,
   *   scene: 0
   * }
   * ```
   */
  get keyTypes() {
    if (!this.typeStr) return ''
    const types = this.typeStr.split('|')
    const typeObj = { ...SwitchTypeIndexObj }
    for (let index = 0; index < types.length; index++) {
      typeObj[SwitchKeyTypeIndexMap[index]] = +!!types[index]
    }
    return typeObj
  }
  /**
   * 类型范式，将类型索引字符串转为`0/1`表示
   *
   * @example
   * ```
   * [3, 3] => '11', [3, 0] => '10', [0, 3] => '01'...
   * ```
   */
  get keyTypePattern() {
    let keys = this.typeStr.split('|')
    const keyList = [] // [3, 0, 2] => [1, 0, 1]
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      keyList[index] = +key ? 1 : 0
    }
    return keyList.join('')
  }
  /**
   * 按键位列表, bit list
   * ```
   * ['00', '01', '10', '11']
   * ```
   */
  get keyDots() {
    return this.switchStatus.keyDots.concat(this.switchStatus.extraKeyDots || [])
  }
  /**
   * 按键总数
   */
  get keyCount() {
    if (!this.typeStr || !this.typeStr.length) return DEFAULT_KEY_COUNT
    let keys = this.typeStr.split('|')
    keys = keys.filter((it: any) => it)
    return +keys.reduce((a: any, b: any) => +a + (+b)) || DEFAULT_KEY_COUNT
  }
  /**
   * 获取各设备类型按键数量列表
   *
   * ```
   * [2,3,....] ===> [开关数量, 情景数量,...]
   * ```
   */
  get _keyCountList() {
    if (!this.typeStr || !this.typeStr.length) return [DEFAULT_KEY_COUNT]
    let keys = this.typeStr.split('|')
    const keyList = []
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      keyList[index] = +key ? +key : DEFAULT_KEY_COUNT
    }
    return keyList
  }
  /**
   * 按键数列表，按主程类型排序，如[2, 1] 主程为2，次程为1。假设此为混合情景开关，则2为情景按键数，1为开关按键数
   *
   * 开关类型 - 开关为主入口
   * 情景类型 - 情景为主入口
   * 混合类型 - 情景为主入口
   * 单线开关 - 开关
   * 插座开关 - 插座
   */
  get orderCount(): number[] {
    const countList = [...this._keyCountList]
    if (!countList.length) return []
    // 开关
    if (countList.length === 1 || this.isSwitch) return countList

    // 主要主程
    if (this.isScene || this.isSwitchScene || this.isLine || this.isSocket) return countList.reverse().slice(0, 2)

    // 雷达主程，取开关或情景值。 eg [1, 0, 0, 0, 1] || [0, 1, 0, 0, 1]
    if (this.isRadar) return [countList.find(i => !!i) || DEFAULT_KEY_COUNT]

    // 红外主程，取开关或情景值，两者包含取情景。 eg 100001, 010001, 110001
    if (this.isInfrared) {
      const list = countList.filter(i => i)
      if (list.length === 2) return [...list]
      if (list.length === 3) return list.slice(0, 2)
    }
    // 窗帘主程， 取情景。 2按键取3bit, 4按键取6bit
    if (this.isCurtain)  return [countList.find(i => !!i) || DEFAULT_KEY_COUNT]
    return []
  }
  /** 是否开关 */
  get isSwitch () {
    return this.keyTypePattern === KeyTypePatternEnum.SWITCH
  }
  /** 是否是场景 */
  get isScene () {
    return this.keyTypePattern === KeyTypePatternEnum.SCENE
  }
  /** 是否是开关场景 */
  get isSwitchScene () {
    return this.keyTypePattern === KeyTypePatternEnum.SWITCHSCENE
  }
  /** 是否是单线开关 */
  get isLine () {
    return this.keyTypePattern === KeyTypePatternEnum.LINE
  }
  /** 是否是插座开关 */
  get isSocket () {
    return this.keyTypePattern === KeyTypePatternEnum.SOCKET
  }
  /** 是否是雷达类开关 */
  get isRadar () {
    return this.isRadarSwitch || this.isRadarScene
  }
  /** 是否是雷达开关 */
  get isRadarSwitch () {
    return this.keyTypePattern === KeyTypePatternEnum.SWITCHRADAR
  }
  /** 是否是雷达场景 */
  get isRadarScene () {
    return this.keyTypePattern === KeyTypePatternEnum.SCENERADAR
  }
  /** 是否是红外类开关 */
  get isInfrared () {
    return this.isInfraredSwitch || this.isInfraredScene
  }
  /** 是否是红外开关 */
  get isInfraredSwitch () {
    return this.keyTypePattern === KeyTypePatternEnum.SWITCHIR
  }
  /** 是否是红外情景 */
  get isInfraredScene () {
    return [`${KeyTypePatternEnum.SCENEIR}`, `${KeyTypePatternEnum.SWITCHSCENEIR}`].includes(this.keyTypePattern)
  }
  /** 是否是窗帘开关 */
  get isCurtain () {
    return this.keyTypePattern === KeyTypePatternEnum.SCENECURTAIN
  }
  /** 是否是情景类型 */
  get isMixScene () {
    return ScenePatterns.includes(this.keyTypePattern)
  }
  /**
   * 设置按键位的值
   * @param v 按键值
   * @param index 按键索引
   * @param t 非主程类型，大于 0 的任意数值
   */
  setPower(v: number, index: number, t ? : number) {
    const vb = new this.Converter(`${v}`, 10).toBinary()
    const setMethod = t ? 'setExtraKeyDots' : 'setKeyDot'
    const idx = t ? index - this.orderCount[OrderEnum.Primary] : index
    this.switchStatus[setMethod](vb, idx)
    return this
  }
  /**
   * 获取按键位的值， `eg. ['1', '0', '1']`
   * @param index 按键索引
   * @param t  非主程类型， 大于 0 的任意值
   */
  getPower(index ? : number, t ? : number): Array < string > {
    if (index !== undefined) {
      const getMethod = t ? 'getExtraKeyDotByIndex' : 'getKeyDotByIndex'
      const idx = t ? index - this.orderCount[0] : index
      const v = this.switchStatus[getMethod](idx)
      const vd = new this.Converter(`${v}`, 2).toDecimal()
      return [vd]
    } else {
      return this.keyDots.map(item => new this.Converter(`${item}`, 2).toDecimal())
    }
  }
  /**
   * 获取按键位的整型值  [1, 0, 1]
   * @param index 索引
   * @param t  非主程类型， 大于 0 的任意值
   */
  getPowerInt(index ? : number, t ? : number): Array < number > {
    const powers = this.getPower(index, t)
    return powers.map(item => +item > 1 ? 0 : +item)
  }

  /**
   * 获取窗帘电源值， `[{ON:1}]`
   */
  getCurtainPowerInt() {
    // bit [0, 1, 0] --对应--> 开、停、关  ==转为==> {1: 1}
    const powerInts = this.getPowerInt()
    const powerMap: any = {0: 'ON', 1: 'PAUSE', 2: 'OFF'}
    let power = []
    const defaultPower = [{OFF: 0}]
    if (this.orderCount[0] === 6) { // 两键窗帘开关
      const panel1 = powerInts.slice(0, 3).map((p, i) => { return p && {[powerMap[i]]: p}}).filter(i => i)
      const panel2 = powerInts.slice(3).map((p, i) => { return p && {[powerMap[i]]: p}}).filter(i => i)
      const p1 = !panel1.length ? defaultPower : panel1
      const p2 = !panel2.length ? defaultPower : panel2
      power = p1.concat(p2)
    } else {
      power = powerInts.map((p, i) => { return p && {[powerMap[i]]: p}}).filter(i => i)
    }
    return power.length ? power : defaultPower
  }
  /**
   * 获取窗帘开关状态描述
   */
  getCurtainPowerStatusDescriptor () {
    const powerInts = this.getPowerInt()
    const _default = new Array(this.orderCount[0] / 3).fill(0)
    const status = powerInts.filter(i => i)
    const descriptor = status.length ? status : _default
    return descriptor.map(s => CurtainStatusMap[s]).join(' | ')
  }

  /**
   * 获取状态描述
   */
  getStatusDescriptor() {
    if (this.isCurtain) return this.getCurtainPowerStatusDescriptor()
    const power = this.getPowerInt()
    return power.map(p => SwitchKeyStatusMap[p]).join(',')
  }
  /**
   * 根据状态获取联动条件字节串
   * @param state 状态数字，0/1/2/3/4/5/6/7
   */
  getCdtBytes (state: number = 0): string {
    // TODO socket 差异处理
    return this.cdtBytes.format(CdtSwitchCodeValMap[state])
  }
  getBytes() {
    // 按键从右至左取值，构建字节码需先取反
    let keyDots = [...this.switchStatus.keyDots]
    keyDots = keyDots.reverse()
    // 对于情景类型的开关，按位取值操作，操作完后需转回对应的二进制值
    if (this.isMixScene) { // 情景开关按字节 8位获取按键 || 插座按前四位bit 一个bit一个按键
      keyDots = keyDots.map(k => `${+k}`)
    }
    const extraDots = [...this.switchStatus.extraKeyDots].reverse()
    const status = new this.Converter(keyDots.join('') || '00', 2).toHex()
    const extraStatus = new this.Converter(extraDots.join('') || '00', 2).toHex()
    return this.bytes.format(status, extraStatus)
  }
}

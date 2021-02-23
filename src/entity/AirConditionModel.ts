/*
 * @Author: eamiear
 * @Date: 2020-08-21 17:04:00
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-02 14:34:02
 */

import { Status } from "./Status"

 interface AC {
  keys: any[];
  serialId: string;
  deviceType: number;
  indexOsm: number;
  name: string;
  rmodel: string,
  keyValue: string
 }

export class AirConditionModel extends Status {
  /** 空调按键码 */
  keys: any[] = []
  serialId: string = ''
  deviceType!: number
  index!: number
  /** 空调名称 */
  name: string = ''
  rmodel: string = ''
  /** 按键值 `模式_风速_温度_上下摆风_左右摆风_p0` */
  keyValue: string = ''

  /** 温度 */
  temperature: string = ''
  /** 模式 */
  mode: string = ''
  /** 风速 */
  speed: string = ''
  /** 左右摆风 */
  horizontalWing: string = ''
  /** 上下摆风 */
  verticalWing: string = ''
  /** 电源 */
  power: string = ''

  /**
   * 红外空调状态实体类
   * @param status 状态值
   * @param ac 空调详情数据信息
   */
  constructor (status: string, ac?: AC) {
    super(status)
    this.mode = status.slice(0, 2)
    this.speed = status.slice(2, 4)
    this.temperature = status.slice(4, 6)
    this.verticalWing = status.slice(6, 8)
    this.horizontalWing = status.slice(8, 10)

    if (ac) {
      this.keys = ac.keys
      this.serialId = ac.serialId
      this.deviceType = ac.deviceType
      this.index = ac.indexOsm
      this.name = ac.name
      this.rmodel = ac.rmodel
      this.keyValue = ac.keyValue

      // this.init()
    }
  }
  init () {
    if (!this.keyValue ) return
    if (['on', 'off'].includes(this.keyValue)) {
      this.setPower(this.keyValue)
    } else {
      const keys = this.keyValue.split('_')
      if (keys.filter(i => i).length) this.setPower('on')
      keys[0] && this.setMode(keys[0])
      keys[1] && this.setSpeed(keys[1])
      this.setTemperature(keys[2] || '1a')
      keys[3] && this.setVerticalWing(keys[3])
      keys[4] && this.setHorizontalWing(keys[4])
    }
  }
  getKeys () {
    return this.keys
  }
  getKeyValue () {
    return this.keyValue
  }
  getSerialId () {
    return this.serialId
  }
  getDeviceType () {
    return this.deviceType
  }
  getIndex () {
    return this.index
  }
  getName () {
    return this.name
  }
  getrModel () {
    return this.rmodel
  }
  setTemperature (tmp: string): AirConditionModel {
    this.temperature = tmp
    return this
  }
  getTemperature (): string {
    return this.temperature
  }
  setMode (mode: string): AirConditionModel {
    this.mode = mode
    return this
  }
  getMode (): string {
    return this.mode
  }
  setSpeed (speed: string): AirConditionModel {
    this.speed = speed
    return this
  }
  getSpeed (): string {
    return this.speed
  }
  setHorizontalWing (wing: string): AirConditionModel {
    this.horizontalWing = wing
    return this
  }
  getHorizontalWing (): string {
    return this.horizontalWing
  }
  setVerticalWing (wing: string): AirConditionModel{
    this.verticalWing = wing
    return this
  }
  getVerticalWing (): string {
    return this.verticalWing
  }
  setPower (power: string): AirConditionModel {
    this.power = power
    return this
  }
  getPower (): string {
    return this.power
  }
}

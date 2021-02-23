/*
 * @Author: eamiear
 * @Date: 2020-08-21 17:04:00
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-02 14:31:13
 */

import { Status } from "./Status"

export class WireAirConditionModel extends Status {
  /** 设置温度 */
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
  /** 预留 */
  preserve: string
  /** 室温 */
  roomTemp: string

  /**
   * 线控空调状态实体类，设置或获取的值均与入库或拼接时的值一致
   * @param status 设备状态
   */
  constructor (status: string) {
    super(status)
    this.preserve = status.slice(0, 2)
    this.mode = status.slice(2, 4)
    this.power = status.slice(2, 4)
    this.speed = status.slice(4, 6)
    this.temperature = status.slice(6, 8)
    this.verticalWing = status.slice(8, 10)
    this.horizontalWing = status.slice(10, 12)
    this.roomTemp = status.slice(12, 14) || '32'
  }

  /**
   * 设置温度值
   * @param tmp 温度值，hex值
   */
  setTemperature (tmp: string): WireAirConditionModel {
    this.temperature = tmp
    return this
  }
  /**
   * 获取温度hex值
   */
  getTemperature (): string {
    return this.temperature
  }
  /**
   * 设置模式
   * @param mode 模式值
   */
  setMode (mode: string): WireAirConditionModel {
    this.mode = mode
    return this
  }
  /**
   * 获取模式值
   */
  getMode (): string {
    return this.mode
  }
  /**
   * 设置风速值
   * @param speed 风速值
   */
  setSpeed (speed: string): WireAirConditionModel {
    this.speed = speed
    return this
  }
  /**
   * 获取风速
   */
  getSpeed (): string {
    return this.speed
  }
  /**
   * 设置左右摆风
   * @param wing 左右摆风值
   */
  setHorizontalWing (wing: string): WireAirConditionModel {
    this.horizontalWing = wing
    return this
  }
  getHorizontalWing (): string {
    return this.horizontalWing
  }
  /**
   * 设置上下摆风
   * @param wing 上下摆风
   */
  setVerticalWing (wing: string): WireAirConditionModel{
    this.verticalWing = wing
    return this
  }
  getVerticalWing (): string {
    return this.verticalWing
  }
  /**
   * 设置电源状态
   * @param power d电源状态值
   */
  setPower (power: string): WireAirConditionModel {
    this.power = power
    return this
  }
  getPower (): string {
    return this.power
  }
}

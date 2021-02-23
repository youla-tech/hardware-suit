/*
 * @Author: eamiear
 * @Date: 2021-02-02 14:40:27
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-03 17:08:30
 */
import { SensorDetectStatus } from "../entity/SensorDetectStatus";
import { SensorDetectStatusEnum, SensorDoorVolMap } from "../shared/constant";
import { BaseEquip } from "./BaseEquip";

// 事件
const SensorDetectStatusMap:any = {
  [SensorDetectStatusEnum.NONE]: '无呼叫',
  [SensorDetectStatusEnum.ON]: '有呼叫'
}
const SensorDetectAwakeStatusMap: any = {
  [SensorDetectStatusEnum.NONE_AWAKE]: '无唤醒',
  [SensorDetectStatusEnum.AWAKE]: '唤醒'
}

export class SensorCallEquip extends BaseEquip {
  private readonly bytes = `0000000000000000`;
  /** 场景联动条件字节码串 */
  private readonly cdtBytes = `4a{0}000000000000`;
  public readonly sensorDetectStatus: SensorDetectStatus;
  /**
   * 一键呼叫
   * @param status        状态值，16进制
   * @param deviceType    设备类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
    this.sensorDetectStatus = new SensorDetectStatus(status);
  }

  /** 一键呼叫状态描述表 */
  get SensorDetectStatusMap () {
    return SensorDetectStatusMap
  }

  /**
   * 获取事件类型描述
   */
  getEventStatusDescriptor () {
    const state = this.sensorDetectStatus.getStatus()
    const stateBits = this.sensorDetectStatus.parseBitState(state, 2)
    const power = SensorDetectStatusMap[new this.Converter(stateBits[0], 2).toDecimalNumber()]
    const awake = SensorDetectAwakeStatusMap[new this.Converter(stateBits[1], 2).toDecimalNumber()]
    return [power, awake]
  }
  /**
   * 获取电压描述
   */
  getVolStatusDescriptor () {
    const state = this.sensorDetectStatus.getVolStatus()
    const vol = new this.Converter(state, 16).toDecimalNumber()
    return SensorDoorVolMap[vol] || ''
  }
  getStatusDescriptor () {
    const status = this.getEventStatusDescriptor()
    return status[0]
  }
  /**
   * 根据状态获取联动条件字节串
   * @param state 状态数字，0/1
   */
  getCdtBytes (state: number = 0): string {
    const stateHex = new this.Converter(`${state}`, 10).toHex()
    return this.cdtBytes.format(stateHex)
  }
}

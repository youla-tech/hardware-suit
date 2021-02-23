/*
 * @Author: eamiear
 * @Date: 2021-02-03 15:20:38
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-03 17:08:21
 */
import { BaseEquip } from "./BaseEquip";

export class SensorLightEquip extends BaseEquip {
  private readonly bytes = `0000000000000000`;
  /** 场景联动条件字节码串 */
  private readonly cdtBytes = `4e{0}000000000000`;
  /**
   * 光线传感器
   * @param status        状态值，16进制
   * @param deviceType    设备类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
  }

  /**
   * 根据状态获取联动条件字节串
   * @param state 状态数字，0/1/2/3
   */
  getCdtBytes (state: number = 0): string {
    const stateHex = new this.Converter(`${state + 1}`, 10).toHex()
    return this.cdtBytes.format(stateHex)
  }
}

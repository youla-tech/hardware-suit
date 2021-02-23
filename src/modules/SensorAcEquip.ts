
import { BaseEquip } from './BaseEquip';
import { SensorAcStatus } from '../entity/SensorAcStatus';

 /**
  * 操作枚举
  */
 enum SensorAcStatusEnum {
  NONE = 0,
  PEOPLE = 1,
}

const SensorDetectStatusMap:any = {
  [SensorAcStatusEnum.NONE]: '无人',
  [SensorAcStatusEnum.PEOPLE]: '有人',
}

// 场景条件对应码值
const SensorDetectCdtCodeMap: any = {
  [SensorAcStatusEnum.NONE]: '无人',
  [SensorAcStatusEnum.PEOPLE]: '有人',
}

/**
 * AC人体红外
 *
 * 使用示例：
 * ```js
 * const SensorAcEquip = new SensorAcEquip(status, deviceType, deviceChildType)
 *
 * const statusBytes = SensorAcEquip.getStatusDescriptor()
 *
 * ```
 */

export class SensorAcEquip extends BaseEquip {
  public readonly SensorAcStatus: SensorAcStatus;
  private readonly bytes = `00{0}000000000000`;
  /** 场景联动条件字节码串 */
  private readonly cdtBytes = `4a{0}000000000000`;

  /**
   * AC人体红外
   * @param status        状态值，16进制
   * @param deviceType    设备类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
    this.SensorAcStatus = new SensorAcStatus(status);
  }
  /** 人体红外描述匹配表 */
  get SensorDetectStatusMap () {
    return SensorDetectStatusMap
  }
  /**
   * 当前状态
   */
  get curStatus () {
    return this.SensorAcStatus.getStatus()
  }
  /**
   * 当前状态整型
   */
  get curStatusInt () {
    return +new this.Converter(this.curStatus, 16).toDecimal() ? 1 : 0
  }

  /**
   * 设置监测状态
   * @param v 状态，0,1
   */
  setStatus (v: number): SensorAcEquip {
    const valHex = new this.Converter(`${v}`, 10).toHex()
    this.SensorAcStatus.setStatus(valHex)
    return this
  }

  /**
   * 获取窗帘状态
   */
  getStatusDescriptor () {
    return SensorDetectStatusMap[this.curStatusInt] || ''
  }
  /**
   * 获取联动条件字节
   * @param state 状态数字，0/1（无人、有人）
   */
  getCdtBytes(state: number = 0): string {
    const stateHex = new this.Converter(`${state}`, 10).toHex()
    return this.cdtBytes.format(stateHex)
  }
  /**
   * 获取状态字节串
   */
  public getBytes(): string {
    return this.bytes.format(this.SensorAcStatus.getStatus())
  }
}

/*
 * @Author: eamiear
 * @Date: 2020-10-12 17:33:54
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-03 15:13:25
 */
import { CardPowerStatus } from "../entity/CardPowerStatus";
import { BaseEquip } from "./BaseEquip";

enum CardStatus {
  IN = '0',
  OUT = '1',
  OFF = '2',
}

const CardStatusMap: any = {
  [CardStatus.IN]: '取电中',
  [CardStatus.OUT]: '拔卡',
  [CardStatus.OFF]: '断电'
}

enum CardActionStatus {
  ENABLE = 0,
  DISABLE = 1
}

/**
 * 插卡取电
 */
export class CardPowerEquip extends BaseEquip {
  /** 插卡取电状态实例 {@link CardPowerStatus} */
  public readonly cardPowerStatus: CardPowerStatus;
  /** 设备控制字节码串 */
  private readonly bytes = `{0}{1}{2}00000000000`;
  /** 场景联动条件字节码串 */
  private readonly cdtBytes = `4a{0}000000000000`;

  /**
   * 插卡取电
   * @param status        状态值，16进制
   * @param deviceType    设备类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
    this.cardPowerStatus = new CardPowerStatus(status);
  }
  /** 插卡取电状态描述 */
  get SensorDetectStatusMap () {
    return CardStatusMap
  }
  /**
   * 获取状态描述
   */
  getStatusDescriptor(): string {
    const status = new this.Converter(this.cardPowerStatus.state, 16).toDecimalNumber()
    return CardStatusMap[status]
  }
  /**
   * 获取行为状态值
   */
  getActionStatus(): number {
    const actionStatus = new this.Converter(this.cardPowerStatus.actionState, 2).toDecimalNumber()
    if (actionStatus === undefined || actionStatus === null) return 1
    return actionStatus
  }
  /**
   * 根据状态获取联动条件字节串
   * @param state 状态数字，0/1/2 插卡、拔出、断电
   */
  getCdtBytes (state: number = 0): string {
    const stateHex = new this.Converter(`${state}`, 10).toHex()
    return this.cdtBytes.format(stateHex)
  }
  /**
   * 获取状态字节串
   */
  public getbytes(): string {
    return ''
  }
}

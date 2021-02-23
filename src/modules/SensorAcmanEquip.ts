/*
 * @Author: eamiear
 * @Date: 2021-02-02 14:40:14
 * @Last Modified by:   eamiear
 * @Last Modified time: 2021-02-02 14:40:14
 */
import { SensorAcmanStatus } from "../entity/SensorAcmanStatus";
import { BaseEquip } from "./BaseEquip";

export class SensorAcmanEquip extends BaseEquip {
  public readonly sensorAcStatus: SensorAcmanStatus;
  private readonly bytes = `0000000000000000`;

  /**
   * AC人体红外 + 光感
   * @param status        状态值，16进制
   * @param deviceType    设备类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
    this.sensorAcStatus = new SensorAcmanStatus(status);
  }
}

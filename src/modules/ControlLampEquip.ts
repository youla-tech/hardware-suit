/*
 * @Author: eamiear
 * @Date: 2020-08-20 17:38:54
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-01-19 14:12:11
 */
import { LampEquip } from './LampEquip';

export class ControlLampEquip extends LampEquip {
  /**
   * 遥控灯
   * @param status        状态值，16进制
   * @param deviceType    设备类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
  }
}


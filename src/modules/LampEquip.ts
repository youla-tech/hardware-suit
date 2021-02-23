/*
 * @Author: eamiear
 * @Date: 2021-02-02 14:40:00
 * @Last Modified by:   eamiear
 * @Last Modified time: 2021-02-02 14:40:00
 */
import { BaseEquip } from './BaseEquip';

export class LampEquip extends BaseEquip {
  /**
   * 灯套件
   * @param status 状态
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
  }
}

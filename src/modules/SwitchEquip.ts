/*
 * @Author: eamiear
 * @Date: 2020-08-29 20:16:40
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-02 12:00:32
 */
import { BaseEquip } from './BaseEquip';
import { SwitchMixEquip } from './SwitchMixEquip';
import { SwitchPlugEquip } from './SwitchPlugEquip';

export class SwitchEquip extends BaseEquip {
  switchStatus: any;
  equip: any = {};
  flag: any;
  /**
   * 开关类工厂函数
   * @param status 状态字符串
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   *
   * @example
   *```javascript
   * const factory = new SwitchEquip(status, device, deviceChildType)
   * const equip = factory.create()
   * const power = euip.getPowerInt()
   * equip.setPower(1, 0)
   * const status = equip.getBytes()
   * const statusDescriptor = equip.getStatusDescriptor()
   * ```
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string, flag?: any) {
    super(status, deviceType, deviceChildType)
    this.flag = flag
  }
  create () {
    let equip = new SwitchMixEquip(this.status, this.deviceType, this.deviceChildType, this.flag)
    if (equip.isSocket) {
      equip = new SwitchPlugEquip(this.status, this.deviceType, this.deviceChildType)
    }
    return this.equip = equip
  }
}

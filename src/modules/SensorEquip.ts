/*
 * @Author: eamiear
 * @Date: 2021-02-03 15:20:33
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-03 15:30:36
 */

import { BaseEquip } from './BaseEquip';
import { CardPowerEquip } from './CardPowerEquip';
import { HumidityEquip } from './HumidityEquip';
import { SensorAcEquip } from './SensorAcEquip';
import { SensorBedWetEquip } from './SensorBedWetEquip';
import { SensorCallEquip } from './SensorCallEquip';
import { SensorDoorEquip } from './SensorDoorEquip';
import { SensorGasEquip } from './SensorGasEquip';
import { SensorSmogEquip } from './SensorSmogEquip';
import { SensorWaterEquip } from './SensorWaterEquip';

export class SensorEquip extends BaseEquip {
  [x: string]: any;
  equip: any = {};
  /**
   * 传感类工厂函数
   * @param status 状态字符串
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   *
   * @example
   *
   *```javascript
   * const factory = new SensorEquip(status, device, deviceChildType)
   * const equip = factory.create()
   *```
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType)
  }
  create () {
    let equip: any = {}
    if (this.TypeHints.isBedwetSensors(this.deviceChildType, this.deviceType)) {
      equip = new SensorBedWetEquip(this.status, this.deviceType, this.deviceChildType)
    } else if (this.TypeHints.isCallSensors(this.deviceChildType, this.deviceType)) {
      equip = new SensorCallEquip(this.status, this.deviceType, this.deviceChildType)
    } else if (this.TypeHints.isDoorSensors(this.deviceChildType, this.deviceType)) {
      equip = new SensorDoorEquip(this.status, this.deviceType, this.deviceChildType)
    } else if (this.TypeHints.isGasSensors(this.deviceChildType, this.deviceType)) {
      equip = new SensorGasEquip(this.status, this.deviceType, this.deviceChildType)
    } else if (this.TypeHints.isSmogSensors(this.deviceChildType, this.deviceType)) {
      equip = new SensorSmogEquip(this.status, this.deviceType, this.deviceChildType)
    } else if (this.TypeHints.isWaterSensors(this.deviceChildType, this.deviceType)) {
      equip = new SensorWaterEquip(this.status, this.deviceType, this.deviceChildType)
    } else if (this.TypeHints.isAcSensors(this.deviceChildType, this.deviceType)) {
      equip = new SensorAcEquip(this.status, this.deviceType, this.deviceChildType)
    } else if (this.TypeHints.isHumidifierSensors(this.deviceChildType, this.deviceType)) {
      equip = new HumidityEquip(this.status, this.deviceType, this.deviceChildType)
    } else if (this.TypeHints.isPluginPowerSensors(this.deviceChildType, this.deviceType)) {
      equip = new CardPowerEquip(this.status, this.deviceType, this.deviceChildType)
    }
    return this.equip = equip
  }
}

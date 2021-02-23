/*
 * @Author: eamiear
 * @Date: 2020-12-18 14:24:35
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-01-19 14:16:02
 */
import { SwitchPlugStatus } from '../entity/SwitchPlugStatus';
import { SwitchMixEquip } from './SwitchMixEquip';

enum PlugStatus {
  ON = 1,
  OFF = 0
}

const SwitchPlugStatusMap: any = {
  [PlugStatus.ON]: '开',
  [PlugStatus.OFF]: '关'
}

export class SwitchPlugEquip extends SwitchMixEquip {
  /**
   * 智能插座
   * @param status 状态
   * @param deviceType 设备住类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType)
    this.switchStatus = new SwitchPlugStatus(status, this.orderCount)
    this.bytes = `{0}0000000000`
  }
  /**
   * 获取状态描述
   */
  getStatusDescriptor () {
    const power = this.getPowerInt()
    return power.map(p => SwitchPlugStatusMap[p]).join(',')
  }

  getBytes () {
    let keyDots = [...this.switchStatus.keyDots]
    keyDots = keyDots.reverse()
    keyDots = keyDots.map(k => `${+k}`)
    const status = new this.Converter(keyDots.join('') || '00', 2).toHex()
    return this.bytes.format(status)
  }
}

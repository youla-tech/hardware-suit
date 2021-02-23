/*
 * @Author: eamiear
 * @Date: 2021-02-02 14:41:00
 * @Last Modified by:   eamiear
 * @Last Modified time: 2021-02-02 14:41:00
 */
import { BaseEquip } from './BaseEquip';

export class SocketEquip extends BaseEquip {
  constructor(deviceType: string, deviceChildType: string, status: string) {
    super(status, deviceType, deviceChildType);
  }
}

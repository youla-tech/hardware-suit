/*
 * @Author: eamiear
 * @Date: 2020-10-12 17:25:18
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-02 14:32:53
 */
import { Status } from './Status';

export class CurtainStatus extends Status {
  public state: string = '';

  /**
   * 窗帘实体类
   * @param status 状态值
   */
  constructor (status: string) {
    super(status)
    this.state = status.slice(0, 2)
  }
  getStatus (): string {
    return this.state.toEvenHex()
  }
  setStatus (state: string): CurtainStatus {
    this.state = state.toEvenHex()
    return this
  }
}

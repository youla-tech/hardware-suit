/*
 * @Author: eamiear
 * @Date: 2021-02-02 14:35:24
 * @Last Modified by:   eamiear
 * @Last Modified time: 2021-02-02 14:35:24
 */
import { Status } from "./Status";

export class ControlampStatus extends Status {
  public cmd: string = '';
  public group: string = '';
  public node: string = '';
  public nodeBits: Array<string> = [];

  /**
   * 遥控灯
   * @param status 状态值
   */
  constructor(status: string) {
    super(status);
    this.cmd = status.slice(0, 2);
    this.group = status.slice(2, 6);
    this.node = status.slice(6, 14);
    this.nodeBits = this.__parseBitState(this.node, 4)
  }

  public setCmd (cmd: string): ControlampStatus {
    this.cmd = cmd
    return this
  }
  public getCmd () {
    return this.cmd
  }

}

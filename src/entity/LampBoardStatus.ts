/*
 * @Author: sanda 
 * @Date: 2021-02-02 18:02:12 
 * @Last Modified by: sanda
 * @Last Modified time: 2021-02-04 14:00:31
 */
import { Status } from './Status';
import { TypeHints } from '../utils/typeHints';

export class LampBoardStatus extends Status {
  public readonly TypeHints: typeof TypeHints;
  public sceneStatus: string = '';
  public switchStatus: string = '';
  public lampStatus: string = ''; //灯的控制，根据按钮开关的个数控制
  count: number[] = [3, 1]; // 情按/按钮开关  [3, 1] ---> 情景 3,开关1
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status)
    this.sceneStatus = status.slice(0, 2);
    this.switchStatus = status.slice(2, 4);
    this.TypeHints = TypeHints;
    this.count = this.TypeHints.getLedTypeIndex(deviceType, deviceChildType).split('|');
    // this.lampStatus = status.slice(4, 4 + this.count[1] * 2); 
    this.lampStatus = status.slice(4); 
  }
  getCount(): number [] {
    return this.count;
  }
  getStatus(): string {
    return this.sceneStatus + this.switchStatus + this.lampStatus;
  }
  getSwitchStatus(): string {
    return this.switchStatus
  }
  getSceneStatus(): string {
    return this.sceneStatus
  }
  getLampStatus(): string {
    return this.lampStatus
  }
  /**
   * 设置面板灯的场景
   * @param v 16进制值
   */
  setSceneStatus(v: string): LampBoardStatus {
    this.sceneStatus = v.toEvenHex()
    return this;
  }
  /**
   * 设置面板灯的亮度
   * @param v 16进制值
   * @param index 索引
   */
  setBrightnessStatus(v: string, index: number): LampBoardStatus {
    this.sceneStatus = '00'
    this.lampStatus = this.lampStatus.slice(0, 4 * index) + v.toEvenHex() + this.lampStatus.slice(4 * index +2)
    return this;
  }
  /**
   * 设置面板灯的色温
   * @param v 16进制值
   * @param index 索引
   */
  setColorStatus(v: string, index: number): LampBoardStatus {
    this.sceneStatus = '00'
    this.lampStatus = this.lampStatus.slice(0, 4 * index + 2) + v.toEvenHex() + this.lampStatus.slice(4 * index +4)
    return this;
  }
  /**
   * 设置面板灯的开关按钮
   * @param v 16进制值
   */
  setSwitchStatus(v: string): LampBoardStatus {
    this.sceneStatus = '00'
    this.switchStatus = v.toEvenHex()
    return this;
  }
}
import { BaseEquip } from './BaseEquip';
import { LampBoardStatus } from '../entity/LampBoardStatus';
import { toBinary, toHex, toDecimal, fillLength } from "../utils/converter";


const SwitchStatusMap: any = {
  '00': '关',
  '01': '开',
  '10': '置反',
  '11': '保持不变'
}
const SceneStatusMap: any = {
  '0': '关',
  '1': '开',
}
export class LampBoardEquip extends BaseEquip {
  /**
  * 开关面板灯
  * @param status 状态
  * @param deviceType 设备住类型
  * @param deviceChildType 设备子类型
  */
  public readonly lampBoardStatus: LampBoardStatus;
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
    this.lampBoardStatus = new LampBoardStatus(status, deviceType, deviceChildType);
  }
  /**
   * 获取情景列表,[true,false],true表示开启
  */
  get countScene () {
    const sceneNum = Number(this.lampBoardStatus.getCount()[0]);
    const sceneCode = fillLength(toBinary(this.lampBoardStatus.getSceneStatus(),16), 8);
    return new Array(sceneNum).fill(1).map((_ele, index) => {
      return sceneCode[7-index] === '1'
    })
  }
  /**
   * 获取按钮列表[true,false]
   */
  get countSwitch() {
    const switchNum = Number(this.lampBoardStatus.getCount()[1]);
    const switchCode = fillLength(toBinary(this.lampBoardStatus.getSwitchStatus(),16), 8) ;
    return new Array(switchNum).fill(1).map((_ele, index) => {
      return (switchCode[7-2 * index] === '1' && switchCode[6- 2 * index] === '0')
    })
  }
  /**
   * 获取亮度值
   * @param index 亮度的索引值 
   */
  public getBrightness(index: number): number {
    const bright = this.lampBoardStatus.getLampStatus().slice(4 * index, 4 * index + 2);
    return Number(toDecimal(bright, 16));
  }
  /**
   * 获取色温
   */
  public getColdColor(index: number): number {
    const colorValue = this.lampBoardStatus.getLampStatus().slice(4 * index + 2, 4 * index + 4);
    return Number(toDecimal(colorValue, 16));
  }
  /**
   * 获取状态字节码串
  */
  public getbytes(): string {
    return this.lampBoardStatus.getStatus();
  }
  /**
   * 
   * @param index 场景的索引
   */
  public setScene(index: number): LampBoardEquip {
    const bits = new Array(8).fill(0)
    bits[7-index] = 1;
    this.lampBoardStatus.setSceneStatus(toHex(bits.join(''),2))
    return this;
  }
  /**
   * 清除场景
   */
  public setEmptyScene(): LampBoardEquip {
    const bits = new Array(8).fill(0)
    this.lampBoardStatus.setSceneStatus(bits.join('').toHexNumber())
    return this;
  }
  /**
   * 触发按钮（置反）
   * @param index 按钮索引
   */
  public setSwitch(index: number): LampBoardEquip {
    const binary = toBinary(this.lampBoardStatus.getSwitchStatus(), 16)
    let bits = fillLength(binary,8).split('');
    if(bits[7 - 2 *index] === '1' && bits[6 - 2 *index] === '0') {
      bits[7 - 2 *index] = '0';
      bits[6 - 2 *index] = '0';
    } else {
      bits[7 - 2 *index] = '1';
      bits[6 - 2 *index] = '0';
    }
    this.lampBoardStatus.setSwitchStatus(toHex(bits.join(''), 2))
    return this
  } 
  /**
   * 设置亮度
   * @param bright 亮度
   * @param index 索引
   */
  public setBrightness(bright:  number, index: number): LampBoardEquip{
    this.lampBoardStatus.setBrightnessStatus(toHex(bright + '', 10), index)
    return this;
  }
  /**
   * 设置色温
   * @param color 
   * @param index 
   */
  public setColor(color: number, index:number): LampBoardEquip{
    this.lampBoardStatus.setColorStatus(toHex(color + '', 10), index)
    return this;
  }
  private getSceneDescriptor(): string {
    const sceneNum = this.lampBoardStatus.getCount()[0];
    const sceneCode = fillLength(toBinary(this.lampBoardStatus.getSwitchStatus(), 16), 8);
    let descriptText ='';
    for (let index = 0; index < sceneNum; index++) {
      const keyCode = sceneCode.substr(7 - index, 1)
      descriptText += `${SceneStatusMap[keyCode]},`
    }
    return descriptText;
  }
  /**
   * 获取按钮开关状态
   */
  private getSwitchDescriptor(): string {
    const switchNum = this.lampBoardStatus.getCount()[1];
    const switchCode = fillLength(toBinary(this.lampBoardStatus.getSwitchStatus(), 16), 8);
    let descriptText ='';
    for (let index = 0; index < switchNum; index++) {
      const keyCode = index > 0 ? switchCode.slice((index + 1) * -2,index * -2) : switchCode.slice(-2)
      descriptText += `${SwitchStatusMap[keyCode]},`
    }
    return descriptText.slice(0, -1);
  }
  /**
   *  获取设备状态描述
  */
  getStatusDescriptor(): string {
    return  this.getSceneDescriptor() + this.getSwitchDescriptor();
  }
}
import { Converter, fillLength } from './converter';
import { TypeHints } from './typeHints';
import Suiter, { SuitStatus, SuitTypes } from '../utils/suiter';
import { LampStatus } from '../entity/LampStatus';
import { SensorStatus } from '../entity/sensor/SensorStatus';
import { SocketStatus } from '../entity/SocketStatus';
import { CardPowerEquip } from '../modules/CardPowerEquip';
import { CurtainEquip } from '../modules/CurtainEquip';
import { WireConditionEquip } from '../modules/WireConditionEquip';
import { SwitchEquip } from '../modules/SwitchEquip';
import { SensorAcEquip } from '../modules/SensorAcEquip';
import { LedLampEquip } from '../modules/LedLampEquip';
import { SensorEquip } from '../modules/SensorEquip';
import { HumidityEquip } from '../modules/HumidityEquip';
import { LampBoardEquip } from '../modules/LampBoardEquip';

/**
 * 状态描述器
 */
export class _Descriptor {
  readonly [x: string]: any;
  public readonly Suiter = {};
  public readonly SuitStatus = {};
  public readonly SuitTypes = {};
  public readonly TypeHints: typeof TypeHints;
  public readonly Converter: typeof Converter;
  constructor() {
    this.Suiter = Suiter;
    this.SuitStatus = SuitStatus;
    this.SuitTypes = SuitTypes;
    this.TypeHints = TypeHints;
    this.Converter = Converter;
  }

  private _adaptHex(hex: string): string {
    return hex.length > 1 ? hex : `0${hex}`;
  }

  /**
   * 获取设备类型码
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getEquipTypeCode(deviceType: string, deviceChildType?: string): string {
    if (!deviceType) {
      console.warn('device type can not be empty!');
      return '';
    }
    return deviceChildType
      ? `${deviceType.toHexNumber().toEvenHex()}${deviceChildType.toHexNumber().toEvenHex()}`
      : `${deviceType.toHexNumber().toEvenHex()}`;
  }

  /**
   * 获取设备类型描述
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getEquipTypeDescriptor(deviceType: string, deviceChildType: string): string {
    const type = this.getEquipTypeCode(deviceType, deviceChildType);
    return (this.SuitTypes as any)[type];
  }

  /**
   * @see {getEquipTypeDescriptor}
   * @param deviceType
   * @param deviceChildType
   */
  public getTypeDescriptor (deviceType: string, deviceChildType: string): string {
    return this. getEquipTypeDescriptor(deviceType, deviceChildType)
  }

  /**
   * 获取主设备状态码
   * @param deviceType 主设备类型
   * @param status 状态码 - 如 01（一个字节）
   */
  public getPrimaryStatusCode(deviceType: string, status: string): string {
    if (!deviceType || !status) {
      console.warn('primary device type or status can not be empty!');
      return '';
    }
    return `${deviceType.toHexNumber().toEvenHex()}${status.toEvenHex()}`;
  }

  /**
   *
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   * @param status 状态码 - 01
   */
  public getSecondaryStatusCode(deviceType: string, deviceChildType: string, status: string): string {
    if (!deviceType || !deviceChildType || !status) {
      console.warn('device type or status can not be empty!');
      return '';
    }
    return `${deviceType.toHexNumber().toEvenHex()}${deviceChildType.toHexNumber().toEvenHex()}${status.toEvenHex()}`;
  }

  /**
   * 根据状态码获取设备描述
   * @param code 状态码
   */
  public getDescriptorByCode(code: string): string {
    if (!code) {
      console.warn('key code can not be empty!');
    }
    return (this.SuitStatus as any)[code.toEvenHex()];
  }

  /**
   * 获取设备主类型状态描述
   * @param deviceType 设备主类型
   * @param code 状态码
   */
  public getMainDescriptor(deviceType: string, code: string): string {
    return this.getDescriptorByCode(this.getPrimaryStatusCode(deviceType, code));
  }

  /**
   * 获取开关状态描述
   * @param status 状态码 16位字符串
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getSocketSwitchDescriptor(status: string, deviceType: string, deviceChildType?: string): string {
    const socketStatus = new SocketStatus(status);
    if (!deviceChildType) {
      return this.getMainDescriptor(deviceType, socketStatus.getState());
    }
    const TypeHints = this.TypeHints as any;
    if (TypeHints.isXkeySocketSwitch(deviceChildType, deviceType)) {
      // const equip = new SwitchMixEquip(status, deviceType, deviceChildType)
      const factory = new SwitchEquip(status, deviceType, deviceChildType, true)
      const equip = factory.create()
      return equip.getStatusDescriptor()
    }
    return '';
  }

  /**
   * 获取窗帘状态描述
   * @param status 状态码 16位字符串
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getSmartSwitchDescriptor (status: string, deviceType: string, deviceChildType?: string): string {
    const TypeHints = this.TypeHints as any;
    if (TypeHints.isCurtainSmartSwitch(deviceChildType, deviceType)) {
      const curtain = new CurtainEquip(status, deviceType, deviceChildType)
      return curtain.getStatusDescriptor()
    }
    return ''
  }
  /**
   * 获取电机状态描述
   * @param status 状态码 16位字符串
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getSmartMotorDescriptor (status: string, deviceType: string, deviceChildType?: string): string {
    const TypeHints = this.TypeHints as any;
    if (TypeHints.isCurtainSmartMotor(deviceChildType, deviceType)) { // 同 智能窗帘
      const curtain = new CurtainEquip(status, deviceType, deviceChildType)
      return curtain.getStatusDescriptor()
    }
    return ''
  }

  /**
   * 获取灯状态描述
   * @param status 状态
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getLedDescriptor(status: string, deviceType: string, deviceChildType: string): string {
    const lampStatus = new LampStatus(status);
    if (!deviceChildType) {
      return this.getMainDescriptor(deviceType, lampStatus.getBrightnessStatus());
    }
    const TypeHints = this.TypeHints as any;
    if (TypeHints.isColorLed(deviceChildType, deviceType)) {
      const colorLedEquip = new LedLampEquip(status, deviceType, deviceChildType)
      return colorLedEquip.getStatusDescriptor()
    }
    if(TypeHints.isLampboardLed(deviceChildType, deviceType)) {
      const lampboardLedEquip = new LampBoardEquip(status, deviceType, deviceChildType)
      return lampboardLedEquip.getStatusDescriptor()
    }
    return '';
  }
  /**
   * 获取传感状态描述
   * @param status 状态
   * @param deviceType 设备住类型
   * @param deviceChildType 设备子类型
   */
  public getSensorsDescriptor(status: string, deviceType: string, deviceChildType: string): string {
    if (!deviceChildType) {
      const sensorStatus = new SensorStatus(status);
      return this.getMainDescriptor(deviceType, sensorStatus.getSensorNormalStatus());
    }
    const TypeHints = this.TypeHints as any;
    // 智能插座
    // if (TypeHints.isPluginPowerSensors(deviceChildType, deviceType)) {
    //   const cardPowerEquip = new CardPowerEquip(status, deviceType, deviceChildType)
    //   return cardPowerEquip.getStatusDescriptor()
    // }
    // // AC红外
    // if (TypeHints.isAcSensors(deviceChildType, deviceType)) {
    //   const acEquip = new SensorAcEquip(status, deviceType, deviceChildType)
    //   return acEquip.getStatusDescriptor()
    // }
    // 检测类传感
    // if (TypeHints.isDetectSensors(deviceChildType, deviceType)) {
    //   const factory = new SensorEquip(status, deviceType, deviceChildType)
    //   const detectEquip = factory.create()
    //   return detectEquip.getStatusDescriptor()
    // }
    // // 温湿度传感
    // if (TypeHints.isHumidifierSensors(deviceChildType, deviceType)) {
    //   const humEquip = new HumidityEquip(status, deviceType, deviceChildType)
    //   return humEquip.getStatusDescriptor()
    // }
    // return '';

    const factory = new SensorEquip(status, deviceType, deviceChildType)
    const equip = factory.create()
    return equip.getStatusDescriptor() || ''
  }

  /**
   * 线控器状态描述
   * @param status
   * @param deviceType
   * @param deviceChildType
   */
  getWireControlDescriptor(status: string, deviceType: string, deviceChildType: string): string {
    const TypeHints = this.TypeHints as any;
    if (TypeHints.isAcWireControl(deviceChildType, deviceType)) {
      const condition = new WireConditionEquip(status, deviceType, deviceChildType)
      return condition.getStatusDescriptor()
    }
    return ''
  }

  /**
   * 获取设备状态描述
   * @param status 状态 16位字符串
   * @param deviceType 设备类型
   * @param deviceChildType 设备子类型
   */
  public getStatusDescriptor (status: string, deviceType: string, deviceChildType: string): string {
    const deviceTypeKey = Array.from(Object.keys(this.Suiter)).find(suitKey => {
      const suitKeyCapital = suitKey.toCapital()
      return this.TypeHints[`is${suitKeyCapital}`].call(this.TypeHints, deviceType, deviceChildType) || '';
    }) || ''
    const statusMethodName = `get${deviceTypeKey.toCapital()}Descriptor`
    if (this[statusMethodName]) {
      return this[statusMethodName].call(this, status, deviceType, deviceChildType)
    }
    return ''
  }
}

/**
 * {@link _Descriptor}
 * 状态描述器
 */
export const Descriptor = new _Descriptor();

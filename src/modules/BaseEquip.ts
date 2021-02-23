/*
 * @Author: eamiear
 * @Date: 2020-08-20 17:38:47
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-02 11:49:08
 */
import Suiter, { SuitStatus, SuitTypes } from '../utils/suiter';
import { TypeHints } from '../utils/typeHints';
import { Converter } from '../utils/converter';
export class BaseEquip {
  /** 套件配置表 {@link Suiter} */
  public readonly Suiter = {};
  /** @deprecated 套件设备状态 */
  public readonly SuitStatus = {};
  /** 套件设备类型集合 */
  public readonly SuitTypes = {};
  /**
   * {@link TypeHints}
   * 类型检测对象
   */
  public readonly TypeHints: typeof TypeHints;
  /**
   * 转换器对象
   * {@link Converter}
   */
  public readonly Converter: typeof Converter;

  /** 设备主类型 */
  public readonly deviceType: string | undefined = '';
  /** 设备子类型 */
  public readonly deviceChildType: string | undefined = '';
  /** 设备状态 ``` 030d0000000 ``` */
  public status: string = '';
  /**
   * 套件基类
   * @param status 状态码
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    this.Suiter = Suiter;
    this.SuitStatus = SuitStatus;
    this.SuitTypes = SuitTypes;
    this.TypeHints = TypeHints;
    this.Converter = Converter;

    this.deviceType = deviceType;
    this.deviceChildType = deviceChildType;
    this.status = status;
  }

  /** 获取状态值 */
  public getStatus () {
    return this.status
  }
}

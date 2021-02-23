import { Converter } from './converter';
import { warn } from './log';
import './string';
import Suit from './suiter';
const Suiter: any = Suit;

/**
 * 类型检测器
 */
export class _TypeHints {
  readonly [x: string]: any;
  constructor() {
    this.__normalTypeProcessor();
    this.__groupTypeProcessor();
    this.__typeIndexPocessor()
  }

  /**
   * 判断是否存在指定设备类型
   * @param suitTypes 类型对象, eg: {'01': '灯',...}
   * @param deviceType 主类型
   * @param deviceChildType  子类型
   */
  private __hasNormalType(suitTypes: object, deviceType: string, deviceChildType: string): boolean {
    if (!suitTypes) {
      return false;
    }
    if (!deviceType) {
      warn('deviceType 不能为空！')
      return false
    }
    if (!deviceChildType) {
      return !!(suitTypes as any)[deviceType.toHexNumber().toEvenHex()];
    }
    return !!(suitTypes as any)[`${deviceType.toHexNumber().toEvenHex()}${deviceChildType.toHexNumber().toEvenHex()}`];
  }

  /**
   * 是否是分组设备类型
   * @param group 分组设备类型
   * @param deviceChildType 子类型
   */
  private __hasGroupType(group: string, deviceChildType: string): boolean {
    if (!group || !group.length) {
      return false;
    }
    if (!deviceChildType) {
      warn('deviceChildType 不能为空！')
      return false
    }
    return group.includes(deviceChildType.toHexNumber().toEvenHex());
  }
  /**
   * 获取设备类型
   * @param typeIndex 类型索引对象
   * @param deviceType 设备类型
   * @param deviceChildType 设备子类型
   */
  private __getTypeIndex(typeIndex: object, deviceType: string, deviceChildType: string): string {
    return (typeIndex as any)[`${deviceType.toHexNumber().toEvenHex()}${deviceChildType.toHexNumber().toEvenHex()}`]
  }

  /**
   * 设备类型判断处理器
   * ```
   * led  ===> isLed = (deviceType, deviceChildType) => {}
   * ```
   */
  private __normalTypeProcessor(): any {
    Array.from(Object.keys(Suiter)).map(item => {
      const normalTypes = Suiter[item].type; // ==> Suiter['led'].type
      const capital = item.toCapital();
      (this as any)[`is${capital}`] = (deviceType: string, deviceChildType: string): boolean => {
        return this.__hasNormalType(normalTypes, deviceType, deviceChildType);
      };
    });
  }

  /**
   * 分组设备类型判断处理器
   *
   * ```led: {group: {simple}} --> isSimpleLed = (deviceChildType, deviceType) => {}```
   */
  private __groupTypeProcessor(): any {
    Array.from(Object.keys(Suiter)).map(item => {
      const group = Suiter[item].group;
      const typeValue = new Converter(Object.keys(Suiter[item].type)[0] || '0', 10).toHex()
      const mainType = item.toCapital();
      if (group) {
        Array.from(Object.keys(group)).map(key => {
          const camel = key.toCapital();
          (this as any)[`is${camel}${mainType}`] = (deviceChildType: string, deviceType?: string): boolean => {
            if (deviceType && deviceType !== typeValue) return false
            return this.__hasGroupType(group[key], deviceChildType);
          };
        });
      }
    });
  }
  /**
   * 设备类型索引类型，用于界面按键数显示
   * 获取当前设备按键组合值: 一键开关 -> 1
   *```
   * 1路开关(0421): getSocketSwitchTypeIndex(04, 21) => 1
   * ```
   */
  private __typeIndexPocessor(): any {
    Array.from(Object.keys(Suiter)).map(item => {
      const typeIndex = Suiter[item].typeIndex; // {'0401': '1'}
      const mainType = item.toCapital();
      if (typeIndex) {
        (this as any)[`get${mainType}TypeIndex`] = (deviceType: string, deviceChildType: string): string => {
          return this.__getTypeIndex(typeIndex, deviceType, deviceChildType);
        };
      }
    });
  }
}

/**
 * {@link _TypeHints}
 */
export const TypeHints = new _TypeHints();

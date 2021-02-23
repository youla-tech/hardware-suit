
///// 红外空调 ///////

/** 红外空调 电源枚举 */
export enum PowerEnum {
  ON = 'on',
  OFF = 'off'
}
/** 红外空调模式枚举 */
export enum ModeEnum {
  AUTO = 1, // 自动
  COLD = 2, // 制冷
  WEDY = 3, // 抽湿
  WING = 4, // 送风
  HOT = 5 // 制热
}
/** 红外空调 模式映射表 */
export const ModeMap: any = {
  [ModeEnum.AUTO]: 'a',
  [ModeEnum.COLD]: 'r',
  [ModeEnum.WEDY]: 'd',
  [ModeEnum.WING]: 'w',
  [ModeEnum.HOT]: 'h'
}
/**
 * 红外空调 模式描述表
 */
export const ModeDescriptorMap: any = {
  [ModeEnum.AUTO]: '自动',
  [ModeEnum.COLD]: '制冷',
  [ModeEnum.WEDY]: '抽湿',
  [ModeEnum.WING]: '送风',
  [ModeEnum.HOT]: '制热'
}

/** 红外空调 风速枚举 */
export enum SpeedEnum {
  AUTO = 0,
  WEAK = 1,
  MEDIUM = 2,
  STRONG = 3
}
/** 红外空调 风速映射表 */
export const SpeedMap: any = {
  [SpeedEnum.AUTO]: 's0',
  [SpeedEnum.WEAK]: 's1',
  [SpeedEnum.MEDIUM]: 's2',
  [SpeedEnum.STRONG]: 's3'
}

/** 红外空调 风速描述信息表 */
export const SpeedDescriptorMap: any = {
  [SpeedEnum.AUTO]: '自动',
  [SpeedEnum.WEAK]: '弱',
  [SpeedEnum.MEDIUM]: '中',
  [SpeedEnum.STRONG]: '强'
}

/** 红外空调 左右摆风枚举 */
export enum HWingEnum {
  ON = 1,
  OFF = 0
}

/** 红外空调 左右摆风映射表 */
export const HorizontalWingMap: any = {
  [HWingEnum.OFF]: 'l0', // 关闭
  [HWingEnum.ON]: 'l1'
}

/** 红外空调 上下摆风枚举 */
export enum VWingEnum {
  ON = 1,
  OFF = 0
}

/** 红外空调 上下摆风映射表 */
export const VerticalWingMap: any = {
  [VWingEnum.OFF]: 'u0', // 关闭
  [VWingEnum.ON]: 'u1'
}

/** 红外空调 摆风描述信息表 */
export const WingDescriptorMap: any = {
  'l0': '',
  'l1': '左右',
  'u0': '',
  'u1': '上下'
}


////// 线控空调 ///////

/** 线控空调 模式枚举 */
export enum WireMode {
  OFF = 0,
  ON = 1,
  COLD = 2,
  HOT = 3
}
/** 线控空调 模式值匹配表 */
export const WireModeMap: any = {
  [WireMode.OFF]: '00',
  [WireMode.ON]: '01',
  [WireMode.COLD]: '21',
  [WireMode.HOT]: '51',
}
/** 线控空调 模式描述匹配表 */
export const WireModeDescriptorMap: any = {
  [WireMode.OFF]: '关',
  [WireMode.ON]: '开',
  [WireMode.COLD]: '制冷',
  [WireMode.HOT]: '制热',
}

/** 线控空调 风速枚举 */
export enum WireSpeed {
  AUTO = 0,
  WEAK = 1,
  MEDIUM = 2,
  STRONG = 3
}
/** 线控空调 风速值匹配表 */
export const WireSpeedMap: any = {
  [WireSpeed.AUTO]: '00',
  [WireSpeed.WEAK]: '01',
  [WireSpeed.MEDIUM]: '02',
  [WireSpeed.STRONG]: '03',
}
/** 线控空调 风速描述匹配表 */
export const WireSpeedDescriptorMap: any = {
  [WireSpeed.AUTO]: '自动',
  [WireSpeed.WEAK]: '弱风',
  [WireSpeed.MEDIUM]: '中风',
  [WireSpeed.STRONG]: '强风',
}

/** 线控空调 左右摆风枚举 */
export enum WireHWing {
  ON = 1,
  OFF = 0
}
/** 线控空调 左右摆风值匹配表 */
export const WireHWingMap: any = {
  [WireHWing.ON]: '01',
  [WireHWing.OFF]: '00'
}
/** 线控空调 左右摆风描述匹配表 */
export const WireHWingDescriptorMap: any = {
  [WireHWing.ON]: '左右',
  [WireHWing.OFF]: ''
}

/** 线控空调 上下摆风枚举 */
export enum WireVWing {
  ON = 1,
  OFF = 0
}
/** 线控空调 上下摆风值匹配表 */
export const WWireVWingMap: any = {
  [WireVWing.ON]: '01',
  [WireVWing.OFF]: '00'
}
/** 线控空调 上下摆风描述文本匹配表 */
export const WireVWingDescriptorMap: any = {
  [WireVWing.ON]: '上下',
  [WireVWing.OFF]: ''
}

////// 传感器电压 ///////
/** 传感器 电压枚举 */
export enum SensorDoorVolEnum {
  LOW = 0,
  LEVEL1 = 1,
  LEVEL2 = 2,
  LEVEL3 = 3
}
/** 传感器 电压/电量描述匹配表 */
export const SensorDoorVolMap: any = {
  [SensorDoorVolEnum.LOW]: '低',
  [SensorDoorVolEnum.LEVEL1]: '中',
  [SensorDoorVolEnum.LEVEL2]: '高',
  [SensorDoorVolEnum.LEVEL3]: '满'
}

////// 传感器事件枚举 ///////
/** 传感器 事件枚举 */
export enum SensorDetectStatusEnum {
  NONE = 0,
  ON = 1,
  // 无定时唤醒
  NONE_AWAKE = 0,
  // 定时唤醒
  AWAKE = 1,
  // 无按键上报
  NONE_KEY = 0,
  // 按键上报
  KEY = 1
}

/**
 * 场景联动条件码
 */
export enum CdtCodeEnum {
  _4a = '4a',
  _4c = '4e',
}

export const CdtSwitchCodeValMap: any = {
  0: '01',
  1: '02',
  2: '04',
  3: '08',
  4: '10',
  5: '20',
  6: '40',
  7: '80'
}

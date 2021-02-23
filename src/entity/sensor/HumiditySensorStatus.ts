/*
 * @Author: eamiear
 * @Date: 2021-02-02 14:35:06
 * @Last Modified by:   eamiear
 * @Last Modified time: 2021-02-02 14:35:06
 */

import { SensorStatus } from './SensorStatus';

export class HumiditySensorStatus extends SensorStatus {
  /** 温度状态 */
  public temperatureStatus: string = '';
  /** 湿度状态 */
  public humidityStatus: string = '';

  /**
   * 温湿度传感器状态实体类
   * @param status 状态值
   */
  constructor(status: string) {
    super(status);
    this.temperatureStatus = status.slice(2, 4);
    this.humidityStatus = status.slice(6, 8);
  }

  /**
   * 设置温度
   * @param tmp 温度 十六进制
   */
  public setTemperatureStatus(tmp: string): HumiditySensorStatus {
    this.temperatureStatus = tmp.toEvenHex();
    return this;
  }
  public getTemperatureStatus(): string {
    return this.temperatureStatus;
  }

  public setHumidityStatus(hum: string): HumiditySensorStatus {
    this.humidityStatus = hum.toEvenHex();
    return this;
  }
  public getHumidityStatus(): string {
    return this.humidityStatus;
  }
}

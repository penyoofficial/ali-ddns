import Alidns20150109, {
  UpdateDomainRecordRequest,
} from "@alicloud/alidns20150109";
import { Config } from "@alicloud/openapi-client";
import { RuntimeOptions } from "@alicloud/tea-util";

export interface 用户配置 {
  用户名: string;
  密钥: string;
  解析记录码: string;
  域名字段: string[];
  地址: string;
}

export class 同步式域名系统代理 extends Alidns20150109 {
  runtime = new RuntimeOptions({});

  constructor(accessKeyId: string, accessKeySecret: string) {
    super(
      new Config({
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        endpoint: `alidns.cn-hangzhou.aliyuncs.com`,
      })
    );
  }

  static async 为Minecraft服务器更新基于IPv6的解析记录(用户配置: 用户配置) {
    try {
      const request = new this(用户配置.用户名, 用户配置.密钥);
      await request.updateDomainRecordWithOptions(
        new UpdateDomainRecordRequest({
          recordId: 用户配置.解析记录码,
          RR: "mc",
          type: "AAAA",
          value: 用户配置.地址,
        }),
        request.runtime
      );
      console.log(
        `操作成功！${用户配置.域名字段.join(".")} 已被重映射到 ${用户配置.地址}`
      );
    } catch (error) {
      console.error(`操作失败！因为：\n${error}`);
    }
  }
}

import Alidns20150109, {
  UpdateDomainRecordRequest,
} from "@alicloud/alidns20150109";
import { Config } from "@alicloud/openapi-client";
import { RuntimeOptions } from "@alicloud/tea-util";

export interface Option {
  /**
   * You must get this from <https://ram.console.aliyun.com/manage/ak>.
   */
  accessKey: {
    id: string;
    secret: string;
  };

  recordId: string;

  domain: {
    r: string;
    name: string;
  };
  value: string;
}

export class DNSProxy extends Alidns20150109 {
  runtime = new RuntimeOptions({});

  constructor(id: string, secret: string) {
    super(
      new Config({
        accessKeyId: id,
        accessKeySecret: secret,
        endpoint: `alidns.cn-hangzhou.aliyuncs.com`,
      })
    );
  }

  static async updateIPv6(o: Option) {
    try {
      const request = new this(o.accessKey.id, o.accessKey.secret);
      await request.updateDomainRecordWithOptions(
        new UpdateDomainRecordRequest({
          recordId: o.recordId,
          RR: o.domain.r,
          type: "AAAA",
          value: o.value,
        }),
        request.runtime
      );
      console.log(
        `操作成功！${o.domain.r}.${o.domain.name} 已被重映射到 ${o.value}`
      );
    } catch (error) {
      console.error(`操作失败！因为：\n${error}`);
    }
  }
}

import Alidns20150109, {
  DescribeDomainRecordsRequest,
  UpdateDomainRecordRequest,
} from "@alicloud/alidns20150109";
import { Config } from "@alicloud/openapi-client";
import { RuntimeOptions } from "@alicloud/tea-util";
import { Ddns } from ".";
import { getLocalIPv6 } from "../local";

export class AliProxy implements Ddns.ManufactoryProxy {
  core: Alidns20150109;

  login(key: string, value: string) {
    try {
      this.core = new Alidns20150109(
        new Config({
          accessKeyId: key,
          accessKeySecret: value,
          endpoint: `alidns.cn-hangzhou.aliyuncs.com`,
        })
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async selectRecord(domain: [string, string]) {
    if (!this.core) {
      throw new Error("尚未登陆！");
    }

    try {
      const records = (
        await this.core.describeDomainRecordsWithOptions(
          new DescribeDomainRecordsRequest({
            domainName: domain[1],
          }),
          new RuntimeOptions({})
        )
      ).body?.domainRecords?.record;

      const record = records!.filter((r) => r.RR == domain[0])[0];
      if (!record) {
        throw new Error("无匹配记录！");
      }
      return new AliDnsRecord(this, record.recordId!);
    } catch (error) {
      throw new Error(error);
    }
  }
}

class AliDnsRecord implements Ddns.DnsRecord {
  proxy: AliProxy;
  recordId: string;

  constructor(proxy: AliProxy, recordId: string) {
    this.proxy = proxy;
    this.recordId = recordId;
  }

  async updateWithMyIP(v?: 4 | 6) {
    try {
      await this.proxy.core.updateDomainRecordWithOptions(
        new UpdateDomainRecordRequest({
          recordId: this.recordId,
          RR: "",
          type: v == 4 ? "A" : "AAAA",
          value: await getLocalIPv6(),
        }),
        new RuntimeOptions({})
      );
      console.log("操作成功！");
    } catch (error) {
      throw new Error(error);
    }
  }
}

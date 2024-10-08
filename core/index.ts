import { AliProxy } from "./aliyun";

export namespace Ddns {
  export function factory(want: "ali" | "huawei") {
    switch (want) {
      case "ali":
        return new AliProxy();
      // case "huawei": return new HuaweiProxy();
    }
  }

  /**
   * 厂商代理
   */
  export interface ManufactoryProxy {
    /**
     * 登录
     *
     * @param key 登录名
     * @param value 密码
     */
    login: (key: string, value: string) => boolean;

    /**
     * 选择记录
     *
     * @param domain 域名段。如 hello.penyo.net 可写为 ["hello", "penyo.net"]
     */
    selectRecord: (domain: [string, string]) => Promise<DnsRecord>;
  }

  /**
   * 域名记录
   */
  export interface DnsRecord {
    /**
     * 将当前机器 IP 更新到本记录
     *
     * @param v IP 协议版本
     */
    updateWithMyIP: (v?: 4 | 6) => Promise<void>;
  }
}

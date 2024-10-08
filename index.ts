import { accessKey } from "./config";
import { Ddns } from "./core";

setInterval(async () => {
  const proxy = Ddns.factory("ali");
  const { key, value } = accessKey.ali;
  proxy!.login(key, value);
  (await proxy!.selectRecord(["next.mc", "penyo.ru"])).updateWithMyIP(6);
}, 1000 * 60 * 5);

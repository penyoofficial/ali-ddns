import { DNSProxy } from "./aliyun";
import { option } from "./config";
import { getLocalIPv6 } from "./local";

(async () => {
  option.value = await getLocalIPv6();
  DNSProxy.updateIPv6(option);
})();

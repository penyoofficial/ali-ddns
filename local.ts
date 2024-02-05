import os from "os";

export function 获取本机IPv6地址() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces)
    for (const { address, family } of networkInterfaces[interfaceName]!)
      if (family === "IPv6" && !address.startsWith("fe80:")) return address;
  return "";
}

export function 获取示例IPv6地址() {
  return "2001:0000:0000:0000:0000:0000:0000:0000";
}

export async function getLocalIPv6() {
  return await (await fetch("https://6.ipw.cn")).text();
}

export function getDemoIPv6() {
  return "2001:0000:0000:0000:0000:0000:0000:0000";
}

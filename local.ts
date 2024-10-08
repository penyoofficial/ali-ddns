export async function getLocalIPv6() {
  return await (await fetch("https://6.ipw.cn")).text();
}

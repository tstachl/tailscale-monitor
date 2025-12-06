import { Device } from "./tailscale.ts";
const kv = await Deno.openKv();

export async function getState(deviceId: string): Promise<Device | null> {
  const entry = await kv.get<Device>(["devices", deviceId]);
  return entry.value;
}

export async function setState(deviceId: string, state: Device) {
  await kv.set(["devices", deviceId], state);
}

export function shouldMonitor(device: { tags: string[]; name: string }): boolean {
  return device.tags?.includes("tag:monitor") || device.name?.includes("[monitor]");
}

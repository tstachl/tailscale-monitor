import { getDevices } from "./tailscale.ts";
import { getState, setState, shouldMonitor } from "./kv.ts";
import { sendNotification } from "./notify.ts";

Deno.cron("Tailscale Node Monitor", "*/5 * * * *", async () => {
  try {
    const devices = await getDevices();

    for (const device of devices) {
      if (!shouldMonitor(device)) continue;

      const isOnline = device.connectedToControl;
      const previous = await getState(device.id);

      if (!previous || previous.connectedToControl !== isOnline) {
        const status = isOnline ? "ONLINE" : "OFFLINE";
        const emoji = isOnline ? "🟢" : "🔴";

        await sendNotification(
          `${emoji} *${device.hostname}* (${device.name})\n` +
          `Status: **${status}**\n` +
          `Last seen: ${new Date(device.lastSeen).toLocaleString()}\n` +
          `IP: ${device.addresses[0]}`
        );
      }

      await setState(device.id, device);
    }
  } catch (err) {
    console.error("Cron failed:", err);
    await sendNotification(`Tailscale monitor cron failed: ${err.message}`);
  }
});

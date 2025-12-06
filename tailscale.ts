const API_BASE = "https://api.tailscale.com/api/v2";

export interface Device {
  addresses: string[]
  id: string
  nodeId: string
  user: string
  name: string
  hostname: string
  clientVersion: string
  updateAvailable: boolean
  os: string
  created: string
  connectedToControl: boolean
  lastSeen: string
  keyExpiryDisabled: boolean
  expires: string
  authorized: boolean
  isExternal: boolean
  multipleConnections: boolean
  machineKey: string
  nodeKey: string
  blocksIncomingConnections: boolean
  enabledRoutes: string[]
  advertisedRoutes: string[]
  tags: string[]
  tailnetLockError: string
  tailnetLockKey: string
  sshEnabled: boolean
  isEphemeral: boolean
}

export async function getDevices(): Promise<Device[]> {
  const res = await fetch(`${API_BASE}/tailnet/${Deno.env.get("TAILSCALE_TAILNET")}/devices`, {
    headers: {
      Authorization: `Bearer ${Deno.env.get("TAILSCALE_API_KEY")}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Tailscale API error ${res.status}: ${text}`);
  }

  const json = await res.json();
  return json.devices as Device[];
}

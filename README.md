# Tailscale Node Monitor

A Deno-based monitoring service that tracks Tailscale device connectivity and sends notifications when devices go online or offline.

## Features

- 🔄 Automatic monitoring every 5 minutes via Deno cron
- 💾 Persistent state tracking using Deno KV
- 📱 Webhook notifications (Discord/Slack compatible)
- 🏷️ Selective monitoring via tags or naming convention
- 📊 Rich notification messages with device details

## Setup

### Prerequisites

- Deno runtime
- Tailscale account with API access
- Webhook URL for notifications (Discord/Slack)

### Environment Variables

```bash
TAILSCALE_API_KEY=your_api_key_here
TAILSCALE_TAILNET=your_tailnet_name
NOTIFY_WEBHOOK_URL=your_webhook_url
```

### Installation

1. Clone this repository
2. Set up environment variables
3. Run with Deno:

```bash
deno run main.ts
```

Or for development with hot reload:

```bash
deno task dev
```

## Usage

### Monitoring Specific Devices

To monitor specific devices, either:

1. Add the `tag:monitor` tag to the device in Tailscale admin panel
2. Include `[monitor]` in the device name

### Notification Format

When a device changes status, you'll receive a notification like:

```
🟢 *my-server* (server.example.com)
Status: **ONLINE**
Last seen: 12/6/2025, 2:30:45 PM
IP: 100.x.x.x
```

## Development

This project uses:
- Deno for runtime and cron scheduling
- Deno KV for state persistence
- Tailscale API for device monitoring

## License

MIT
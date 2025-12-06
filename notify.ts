export async function sendNotification(message: string) {
  const webhook = Deno.env.get("NOTIFY_WEBHOOK_URL");
  if (!webhook) return;

  // Discord/Slack compatible payload
  await fetch(webhook, {
    method: "POST",
    body: `Tailscale Node Alert\n${message}`,
  });
}

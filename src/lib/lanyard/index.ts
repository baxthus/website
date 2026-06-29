import { onMount } from 'svelte';

import { WEBSOCKET_URL } from './constants';
import type { LanyardData, LanyardOptions } from './types';

export function lanyardWS(options: LanyardOptions & { socket: true }): void {
  const { userId, onPresenceUpdate } = options;

  onMount(() => {
    if (!('WebSocket' in window)) throw new Error("Browser doesn't support WebSocket connections");

    const subscription = Array.isArray(userId) ? 'subscribe_to_ids' : 'subscribe_to_id';
    const ws = new WebSocket(WEBSOCKET_URL);
    let heartbeat: ReturnType<typeof setInterval> | null = null;

    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({ op: 2, d: { [subscription]: userId } }));

      heartbeat = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ op: 3 }));
        }
      }, 30_000);
    });

    ws.addEventListener('message', (e) => {
      const { t, d } = JSON.parse(e.data) as {
        t: 'INIT_STATE' | 'PRESENCE_UPDATE';
        d: LanyardData;
      };
      if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
        onPresenceUpdate?.(d ?? {});
      }
    });

    return () => {
      if (heartbeat) clearInterval(heartbeat);
      ws.close();
    };
  });
}

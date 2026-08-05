import { WEBSOCKET_URL } from './constants';
import type { LanyardData, LanyardOptions } from './types';

type LanyardMessage =
  | { op: 1; d: { heartbeat_interval: number } }
  | { op: 0; t: 'INIT_STATE' | 'PRESENCE_UPDATE'; d: LanyardData };

export function lanyardWS(options: LanyardOptions & { socket: true }): () => void {
  const { userId, onPresenceUpdate } = options;

  if (!('WebSocket' in window)) throw new Error("Browser doesn't support WebSocket connections");

  const ws = new WebSocket(WEBSOCKET_URL);
  let heartbeat: ReturnType<typeof setInterval> | null = null;

  ws.addEventListener('message', (e) => {
    const message = JSON.parse(e.data) as LanyardMessage;

    if (message.op === 1) {
      ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));

      if (heartbeat) clearInterval(heartbeat);
      heartbeat = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ op: 3 }));
        }
      }, message.d.heartbeat_interval);

      return;
    }

    onPresenceUpdate?.(message.d);
  });

  return () => {
    if (heartbeat) clearInterval(heartbeat);
    ws.close();
  };
}

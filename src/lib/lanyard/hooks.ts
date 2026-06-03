import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { API_URL, WEBSOCKET_URL } from './constants';
import type { LanyardData, LanyardOptions, LanyardResponse } from './types';

// not sure if this is performant
export function useLanyardWS(options: LanyardOptions & { socket: true }) {
  const { userId, onPresenceUpdate } = options;
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // oxlint-disable-next-line unicorn/prefer-global-this
    if (!('WebSocket' in window)) throw new Error("Browser doesn't support WebSocket connections");

    const subscription = Array.isArray(userId) ? 'subscribe_to_ids' : 'subscribe_to_id';

    const ws = new WebSocket(WEBSOCKET_URL);
    wsRef.current = ws;

    ws.addEventListener('open', () => {
      ws.send(
        JSON.stringify({
          op: 2,
          d: { [subscription]: userId },
        }),
      );

      // heartbeat every 30s
      heartbeatRef.current = setInterval(() => {
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

      return () => {
        clearInterval(heartbeatRef.current ?? undefined);
        ws.close();
      };
    });
  }, [userId, onPresenceUpdate]);
}

export function useLanyard(userId: string) {
  return useQuery<LanyardResponse>({
    queryKey: ['lanyard', userId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/users/${userId}`);
      const body = (await res.json()) as LanyardResponse;

      if (body.error) throw new Error(body.error.message);

      return body;
    },
  });
}

export function useLanyardMany(userIds: string[]) {
  return useQuery<LanyardResponse[]>({
    queryKey: ['lanyard', ...userIds],
    queryFn: async () => {
      const results = await Promise.all(
        userIds.map(async (id) => {
          const res = await fetch(`${API_URL}/users/${id}`);
          const body = (await res.json()) as LanyardResponse;

          if (body.error) throw new Error(body.error.message);

          return body;
        }),
      );

      return results;
    },
    enabled: userIds.length > 0,
  });
}

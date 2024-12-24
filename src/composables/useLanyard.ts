import type { LanyardData, LanyardOptions, LanyardResponse } from '~/types/lanyard';

export const API_URL = 'https://api.lanyard.rest/v1';
export const WEBSOCKET_URL = 'wss://api.lanyard.rest/socket';

export async function useLanyard(options: LanyardOptions): Promise<LanyardResponse | Array<LanyardResponse> | undefined> {
  if (Reflect.has(options, 'socket')) {
    socketHandlers.push(() => handleSocket(options));
    return;
  }

  if (typeof options.userId === 'string') {
    const req = await fetch(`${API_URL}/users/${options.userId}`);
    const body = (await req.json()) as LanyardResponse;

    if (body.error) throw new Error(body.error.message);

    return body;
  }

  const responseArray: Array<LanyardResponse> = [];

  for (const id of options.userId) {
    const req = await fetch(`${API_URL}/users/${id}`);
    const body = (await req.json()) as LanyardResponse;

    if (body.error) throw new Error(body.error.message);

    responseArray.push(body);
  }

  return responseArray;
}

const socketHandlers = Array<() => void>();
// Hacky way to only allow one handler to exist at a time
Object.defineProperty(socketHandlers, 'push', {
  value: (handler: () => void) => {
    socketHandlers.splice(0, 1, handler);
    handler();
  },
});

function handleSocket(options: LanyardOptions) {
  const { onPresenceUpdate } = options;

  // Mozilla wants to be special
  const supportsSockets = 'WebSocket' in window || 'MozWebSocket' in window;

  if (!supportsSockets) throw new Error('WebSockets are not supported in this environment');

  const subscription = typeof options.userId === 'object' ? 'subscribe_to_ids' : 'subscribe_to_id';

  const socket = new WebSocket(WEBSOCKET_URL);
  let heartbeatInterval = 30 * 1000;

  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({
      op: 2,
      d: {
        [subscription]: options.userId,
      },
    }));

    setInterval(() => {
      socket.send(JSON.stringify({ op: 3 }));
    }, heartbeatInterval);
  });

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data) as {
      op: 0;
      d: LanyardData | Record<string, LanyardData>;
    } | {
      op: 1;
      d: {
        heartbeat_interval: number;
      };
    };

    if (data.op === 0) {
      onPresenceUpdate?.(data.d);
    }
    if (data.op === 1) {
      heartbeatInterval = data.d.heartbeat_interval;
    }
  });

  // Heartbeat may not be sent if the page is unfocused due to the browser putting the tab to sleep
  // Happens more often on Apple devices, as they are more aggressive with not running background tasks
  // There is no way to prevent this, so we just reconnect the socket
  socket.addEventListener('close', () => {
    console.log('Socket closed, reconnecting in 1 second');
    setTimeout(() => {
      socketHandlers.push(() => handleSocket(options));
    }, 1000);
  });
}

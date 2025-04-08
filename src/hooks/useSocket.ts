import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

type EventCallback<T> = (data: T) => void;

export function useSocket(serverUrl: string) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket: Socket = io(serverUrl, {
      transports: ["websocket"],
    });

    socketRef.current = socket;
    console.log("Socket connected:", socket.id);

    return () => {
      socket.disconnect();
    };
  }, [serverUrl]);

  const emit = <T>(eventName: string, data: T): void => {
    socketRef.current?.emit(eventName, data);
  };

  const on = <T>(eventName: string, callback: EventCallback<T>): void => {
    socketRef.current?.on(eventName, callback);
  };

  const off = (eventName: string): void => {
    socketRef.current?.off(eventName);
  };

  return { socket: socketRef.current, emit, on, off };
}

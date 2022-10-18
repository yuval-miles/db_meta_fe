import { Socket } from "socket.io-client";
import create from "zustand";

interface SocketStore {
  socket: null | Socket;
  setSocket: (socket: Socket) => void;
  clearSocket: () => void;
}

export const useSocket = create<SocketStore>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set((state) => ({ ...state, socket })),
  clearSocket: () => set((state) => ({ ...state, socket: null })),
}));

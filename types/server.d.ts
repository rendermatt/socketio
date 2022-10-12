/// <reference path="./types.d.ts" />

type ServerType = import("socket.io").Server<ClientToServerEvents, ServerToClientEvents>;
type ClientSocket = import("socket.io").Socket<ClientToServerEvents, ServerToClientEvents>;
declare interface R {
	io: ServerType
  al: string
	readonly s: unique symbol
	USERDICT: Record<string, string>
	SYS_ID: { id: string }
	surr: typeof import("../surr.js")
	t: ReturnType<import("../texts.js")>
}
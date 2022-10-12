declare interface ServerToClientEvents {
	saveable(name: string, value: string): void
	delete(id: string): void
	edit(id: string, text: string): void
	reload(): void
	ban(banner: string, time: number, reason: string): void
	"chat message"(id: string, message: string): void
	
	"upload:status"(status: string): void
	"upload:done"(url: string): void
}

declare interface ClientToServerEvents {
	
}
import { useStorage } from "@vueuse/core"

export const useServerConfig = () => {
	const appServer = useStorage("app-server", "")
	const appPort = useStorage("app-port", "")

	return {
		server: appServer,
		port: appPort,
	}
}

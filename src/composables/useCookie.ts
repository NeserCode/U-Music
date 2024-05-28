import { Cookie } from "@shared"
import { useStorage } from "@vueuse/core"

const allCookies = useStorage<Cookie[]>("app-all-cookies", [], undefined, {
	serializer: {
		read: (value) => stringToCookie(value.split("|")),
		write: (value) => {
			let store: string[] = []
			value.forEach((cookie) => {
				store.push(cookieToString(cookie))
			})
			return store.join("|")
		},
	},
})

function setCookie(name: string, value: string, options: any) {
	if (!document) return

	if (allCookies.value.some((cookie) => cookie.name === name)) {
		allCookies.value = allCookies.value.map((cookie) => {
			if (cookie.name === name) {
				cookie.value = value
				cookie = { ...cookie, ...options }
			}
			return cookie
		})
	}
}

function stringToCookie(cookies: string[]) {
	if (!document) return []
	const result: Cookie[] = []

	if (!cookies.length) return []

	cookies.forEach((cookie) => {
		const parts = cookie.split(";")
		const nameValue = parts[0].split("=")
		const name = nameValue[0]
		const value = nameValue[1]
		const options = parts.slice(1)

		const cookieObj: {
			[key: string]: string | boolean | undefined
		} = {
			name,
			value,
		}

		options.forEach((option) => {
			const [key, ...value] = option.trim().split("=")
			if (!key.length && !value.length) return
			else if (!value.length) {
				cookieObj[key] = true
				return
			}
			cookieObj[key] = value.join("=")
		})

		result.push(cookieObj)
	})

	return result
}

function cookieToString(cookie: Cookie) {
	let cookieString = ""
	const keys = Object.keys(cookie)

	if (keys.some((key) => key === "name") && keys.some((key) => key === "value"))
		cookieString = `${cookie.name}=${cookie.value}; `

	keys.forEach((key) => {
		if (key === "Secure") cookieString += `${key}; `
		else if (key === "Path") cookieString += `${key}=${cookie[key]};; `
		else if (key !== "name" && key !== "value")
			cookieString += `${key}=${cookie[key]}; `
	})

	cookieString = cookieString.slice(0, -2)

	return cookieString
}

export const useCookie = () => {
	return {
		allCookies,
		setCookie,
		stringToCookie,
		cookieToString,
	}
}

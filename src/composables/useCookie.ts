import { Cookie } from "@shared"
import { useStorage } from "@vueuse/core"

const allCookies = useStorage<Cookie[]>("app-all-cookies", [], undefined, {
	serializer: {
		read: (value) => withoutTimestamp(value.split("|")),
		write: (value) => {
			let store: string[] = []
			let stringed: Cookie[] = []
			value.forEach((cookie) => {
				if (stringed.some((c) => c.name === cookie.name)) {
					let duplicate = stringed.find((c) => c.name === cookie.name)!
					if (duplicate.timestamp < cookie.timestamp) return
					else duplicate = Object.assign(duplicate, cookie)
				} else stringed.push(cookie)
			})

			stringed.forEach((cookie) => {
				deleteCookie(cookie.name!)
				const cookieString = cookieToString(cookie)
				document.cookie = cookieString
				store.push(cookieString)
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
				cookie = { ...cookie, ...options, timestamp: Date.now() }
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
			else if (!value.length) cookieObj[key] = true
			else cookieObj[key] = value.join("=")
		})

		if (cookieObj.name?.toString().trim().length == 0) return
		cookieObj.timestamp = Date.now().toString()
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

function deleteCookie(name: string) {
	if (!document) return

	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

function clearCookie(name: string) {
	deleteCookie(name)
	allCookies.value = allCookies.value.filter((cookie) => cookie.name !== name)
}

function clearAllCookies() {
	if (!document) return

	let cookies = document.cookie.split(";")

	for (var i = 0; i < cookies.length; i++) {
		let cookie = cookies[i]
		let eqPos = cookie.indexOf("=")
		let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
		document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`
	}

	allCookies.value = []
}

function withoutTimestamp(cookie: string[]) {
	let cookieObjs = stringToCookie(cookie)

	return cookieObjs.map((cookieObj) => {
		delete cookieObj.timestamp
		return cookieObj
	})
}

export const useCookie = () => {
	return {
		allCookies,
		clearCookie,
		clearAllCookies,
		setCookie,
		stringToCookie,
		cookieToString,
	}
}

export interface BaseReturn {
	/** The request URL. */
	url: string
	/** The response status code. */
	status: number
	/** A boolean indicating whether the response was successful (status in the range 200–299) or not. */
	ok: boolean
	/** The response headers. */
	headers: Record<string, string>
	/** The response raw headers. */
	rawHeaders: Record<string, string[]>
}

export interface CountriesCodeSimpleReturn {
	code: number
	message: string
	data: {
		countryList: {
			zh: string
			en: string
			code: string
			locale: string
		}[]
		label: string
	}[]
}
export interface CountriesCodeReturn extends BaseReturn {
	data: CountriesCodeSimpleReturn
}

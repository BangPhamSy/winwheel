import axios from "axios"
import NProgress from "nprogress"

import { baseUrl } from "../configs/Settings"
import { getCookie } from "./cookieHelper"
import { isEmpty } from "./validator"

const instance = axios.create({
	baseURL: baseUrl,
})

NProgress.configure({ showSpinner: false })
NProgress.configure({ minimum: 0.86 })
NProgress.configure({ easing: "ease", speed: 2000 })

// Add a request interceptor
instance.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		NProgress.start()

		//add anti forgery token into header
		if (config.method === "post" || config.method === "put") {
			const xsrfToken = getCookie("XSRF-TOKEN")
			if (!isEmpty(xsrfToken)) {
				config.headers["X-XSRF-TOKEN"] = xsrfToken
			}
		}

		return config
	},
	function(error) {
		NProgress.done()
		// Do something with request error
		return Promise.reject(error)
	}
)

// Add a response interceptor
instance.interceptors.response.use(
	function(response) {
		NProgress.done()
		// Do something with response data
		return response
	},
	function(error) {
		NProgress.done()
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data)
			console.log(error.response.status)
			console.log(error.response.headers)
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request)
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log("Error", error.message)
		}
		// Do something with response error
		return Promise.reject(error)
	}
)

export default instance

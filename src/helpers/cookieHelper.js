export const setCookie = (cname, cvalue, exdays) => {
	let d = new Date()
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
	const expires = "expires=" + d.toUTCString()
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

export const getCookie = (cname) => {
	const name = cname + "="
	const ca = document.cookie.split(";")
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i]
		while (c.charAt(0) === " ") {
			c = c.substring(1)
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length)
		}
	}
	return ""
}

export const deleteCookie = (cname) => {
	setCookie(cname, "", -9999999)
}

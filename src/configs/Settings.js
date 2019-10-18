const baseUrl =
	process.env.NODE_ENV === "production" ? "/abbottgiftcard" : "http://localhost:5000"
const languages = [{ name: "English", code: "en" }, { name: "Vietnamese", code: "vi" }]
const currency = "$"
// need to update recaptcha domain once moved to production
const recaptchaKey = "6Ldgp4sUAAAAAIjXVYsPXD5LTzyb3rZWceOIxmUJ"
const appStoreUrl = "#"
const ggStoreUrl = "#"
const maxTransferAmount = 5000000
const timeoutConfigs = {
	warnTimeoutMins: 8,
	logoutTimeoutMins: 10,
	refreshIntervalMins: 8,
}
const captchaThreshold = 0
const noOfStarsForFreeDrink = 25
const qrCodePrefix = "https://www.abbott.com.sg/gift-card/?cardno="
const herokuPassword = "asc_abbott@2019"
const gmapsAPI = "asfDWD9793"

export {
	baseUrl,
	languages,
	currency,
	recaptchaKey,
	maxTransferAmount,
	appStoreUrl,
	ggStoreUrl,
	timeoutConfigs,
	captchaThreshold,
	noOfStarsForFreeDrink,
	herokuPassword,
	qrCodePrefix,
}

import "core-js/fn/array/find"
import "core-js/fn/number/is-nan"
import "core-js/fn/string/includes"
import "core-js/fn/string/starts-with"
import "core-js/fn/number/is-integer"
import "core-js/es7/string"
import "core-js/fn/array/from"

/*eslint-disable */
Number.prototype.formatMoney = function(c, d, t, k) {
	var n = this,
		c = isNaN((c = Math.abs(c))) ? 2 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		s = n < 0 ? "-" : "",
		i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
		j = (j = i.length) > 3 ? j % 3 : 0
	return (
		s +
		(j ? i.substr(0, j) + t : "") +
		i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
		(k
			? d +
			  Math.abs(n - i)
					.toFixed(c)
					.slice(2)
			: "")
	)
}

Number.prototype.formatPoints = function(c) {
	var n = this
	if (c <= 0) return Math.floor(n)
	return Math.ceil(n)
}

String.prototype.formatCardNo = function(c) {
	var n = this

	if (c) {
		return n.replace(/\b(\d{4})(\d{4})(\d{4})(\d{4})\b/, "XXXX XXXX XXXX $4")
	}

	return n.replace(/\b(\d{4})(\d{4})(\d{4})(\d{4})\b/, "$1 $2 $3 $4")
}

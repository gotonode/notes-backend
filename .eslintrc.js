module.exports = {
	"env": {
		"es6": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"rules": {
		"eqeqeq": "error",
		"no-trailing-spaces": "error",
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"object-curly-spacing": [
			"error", "always"
		],
		"arrow-spacing": [
			"error", {
				"before": true,
				"after": true
			}
		],
		"no-console": 0,
		"dot-notation": "error"
	}
};
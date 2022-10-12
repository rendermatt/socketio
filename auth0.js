/// <reference path="./types/server.d.ts" />
const { Router } = require("express")
const TokenGenerator = require('tokgen');
const generator = new TokenGenerator();
const { jwtVerify } = require("jose")
/**
	@param { ServerType } io The socket.io instance.
*/

module.exports = (io) => {
	/** @type { Router } */
	const router = Router();
	router.get("/login", (req, res) => {
		res.redirect("https://nomorenotes.us.auth0.com/authorize")
	})
	router.get("/trigger", (req, res) => {
		res.redirect("https://nomorenotes.us.auth0.com/authorize?response_type=code&client_id=AowNHc7SuoxW3jVCjUb0qHIb8BKwXTQT&redirect_uri=https://nmn.bad.mn/auth0/callback&state=" + generator.generate())
	})
	router.get("/logout", (req, res) => {
		res.send(`<p>You have been logged out. <a href="login">Login</a></p>`)
	})
	router.get("/callback", ({ query }, res) => {
		// res.json(query)
		if (query.code) {
			const data = jwtVerify()
		}
	})
	return router
}
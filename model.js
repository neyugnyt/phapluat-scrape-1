const axios = require("axios")
const { JSDOM } = require("jsdom")

const WEBSITE_URL = "https://thuvienphapluat.vn/van-ban-moi"

class Model {
	static async getHomeContent(page) {
		const URL = `${WEBSITE_URL}/`
		const { data } = await axios.get(`${URL}?page=${page}}`)
		const { window } = new JSDOM(data)
		const { document } = window
		const sliderItems = document.querySelectorAll(".nqTitle")
		const sliderList = [...sliderItems].map((item) => {
			const slug = item
				.querySelector("a")
				.href.split("https://thuvienphapluat.vn/van-ban")[1]
			const heading = item.querySelector("a").textContent
			return { slug, heading }
		})
		return sliderList
	}

	static async getContentInside(slug) {
		const URL = `https://thuvienphapluat.vn/van-ban/${slug}`
		const { data } = await axios.get(`${URL}`)
		const { window } = new JSDOM(data)
		const { document } = window
		// const text = document
		// 	.querySelector(".content1")
		// 	.textContent.replace(/\n/g, " ")
		// 	.trim()

		const text = document.querySelector(".content1").innerHTML

		return text
	}
}

module.exports = Model

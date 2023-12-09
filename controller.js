const Model = require("./model")

class Controller {
	static async getHomeContent(req, res, next) {
		try {
			const { page = 1 } = req.query
			const homeContent = await Model.getHomeContent(page)
			res.json({ success: true, data: homeContent })
		} catch (err) {
			res.status(404).send({ success: false, data: "Something went wrong" })
		}
	}

	static async getContentInside(req, res, next) {
		try {
			const { slug } = req.query
			const getContentInside = await Model.getContentInside(slug)
			res.json({ success: true, data: getContentInside })
		} catch (err) {
			res.status(404).send({ success: false, data: "Something went wrong" })
		}
	}
}

module.exports = Controller

const axios = require("axios")
const { JSDOM } = require("jsdom")
const db = require("./config/db")

const WEBSITE_URL = "https://thuvienphapluat.vn/van-ban-moi"

class Model {
	static async getHomeContent() {
		const totalPages = 32
		const content = []
		const dataObject = []
		for(let page = 1; page <= totalPages; page++){
			const URL = `${WEBSITE_URL}/`
			const { data } = await axios.get(`${URL}?page=${page}`)
			console.log(`${URL}?page=${page}`)
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
			const htmlContent = sliderList.map(async(item, index) => {
				const insideContent = await this.getContentInside(sliderList[index].slug)
				return { insideContent }
			})
			await Promise.all(htmlContent).then((value) => {
				dataObject.push(...value)
			})
			content.push(...sliderList)
		}
		

		const mergedContent = content.map((item, index) =>({
			slug: item.slug,
			heading: item.heading,
			html: dataObject[index].insideContent
		}))
		console.log(mergedContent[0].heading);
		console.log(mergedContent[20].heading);
		console.log(mergedContent[40].heading);
		console.log(mergedContent[60].heading);
		for(let i = 0; i <= mergedContent.length; i++){
			
			if(i <= 200){
				var tittle = 'Hành chính'
				let sql = `INSERT INTO vanban(tittle, slug, heading, html)
				VALUES('${tittle}', ${db.escape(mergedContent[i].slug)}, ${db.escape(mergedContent[i].heading)}, ${db.escape(mergedContent[i].html)} )`
				db.query(sql, function (err, result) {
					if (err) throw err;
					console.log("Successfully");
				});
			}
			if(i > 200 && i <= 400){
				var tittle = 'Văn hóa'
				let sql = `INSERT INTO vanban(tittle, slug, heading, html)
				VALUES('${tittle}', ${db.escape(mergedContent[i].slug)}, ${db.escape(mergedContent[i].heading)}, ${db.escape(mergedContent[i].html)} )`
				db.query(sql, function (err, result) {
					if (err) throw err;
					console.log("Successfully " + i);
				});
			}
			if(i > 400 && i <= 600){
				var tittle = 'Thương mại'
				let sql = `INSERT INTO vanban(tittle, slug, heading, html)
				VALUES('${tittle}', ${db.escape(mergedContent[i].slug)}, ${db.escape(mergedContent[i].heading)}, ${db.escape(mergedContent[i].html)} )`
				db.query(sql, function (err, result) {
					if (err) throw err;
					console.log("Successfully " + i);
				});
			}
			if(i > 600 && i <= mergedContent.length){
				var tittle = 'Tài chinh'
				let sql = `INSERT INTO vanban(tittle, slug, heading, html)
				VALUES('${tittle}', ${db.escape(mergedContent[i].slug)}, ${db.escape(mergedContent[i].heading)}, ${db.escape(mergedContent[i].html)} )`
				db.query(sql, function (err, result) {
					if (err) throw err;
					console.log("Successfully " + i);
				});
			}
		}

		return mergedContent
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
	static async getTest() {
		var sql = `CREATE TABLE vanbantest (VanbanId int NOT NULL AUTO_INCREMENT, tittle VARCHAR(100), slug VARCHAR(1000), heading VARCHAR(1000), html LONGTEXT, PRIMARY KEY (VanbanId));`
		db.query(sql, function (err, result) {
		  if (err) throw err;
		  console.log("Table created");
		});
		return "Ok"
	}

	// static async getTest() {
	// 	var sql = `CREATE TABLE vanbantest (userId int NOT NULL AUTO_INCREMENT, username VARCHAR(100) NOT NULL, password VARCHAR(1000) NOT NULL, role int NOT NULL, PRIMARY KEY (UserId));`
	// 	db.query(sql, function (err, result) {
	// 	  if (err) throw err;
	// 	  console.log("Table created");
	// 	});
	// 	return "Ok"
	// }
}

module.exports = Model

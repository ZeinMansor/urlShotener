const router = require("express").Router();
const ShortUrl = require("../models/shortUrl");

router.get("/", async (req, res) => {
  const surl = await ShortUrl.find();
  res.render("index", { shortUrls: surl });
});

module.exports = router;

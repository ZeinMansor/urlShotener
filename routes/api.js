const ShortUrl = require("../models/shortUrl");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json();
});

// to get any parameter of the url
router.get("/members/:id", (req, res) => {
  res.json(members.filter((member) => member.id === parseInt(req.params.id)));
});

router.post("/shorturl", async (req, res) => {
  await ShortUrl.create({
    full: req.body.fullurl,
  });
  res.redirect("/");
});

router.get("/:url_id", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.url_id });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
  console.log(shortUrl.full);
});

module.exports = router;

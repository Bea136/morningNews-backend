var express = require('express');
var router = express.Router();

const NEWS_API = process.env.NEWS_API

/* GET home page. */
router.get('/articles', (req, res) => {
  fetch (`https://newsapi.org/v2/everything?domains=techcrunch.com&apiKey=${NEWS_API}`)
  .then(response => response.json())
  .then(data => {
    if (data.status === 'ok'){
res.json({ articles: data.articles })
} else {
  res.json({ articles: [] })
}


})

});

module.exports = router;

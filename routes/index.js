var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('gnb', 'root', '0000', {
  host: 'localhost',
  dialect: 'mysql'
});

const Post = sequelize.define('post', {
  // attributes
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.STRING
  }
});

Post.sync()


router.get('/', function (req, res) {
  Post.findAll().then(function(posts){
    res.render('gnb', { posts: posts })
  })
  
})

router.get('/:post_id', function(req, res) {
  // var targetIndex = posts.findIndex(function(element) {
  //   return element.id == req.params.abc
  // })
  // var targetPost = posts[targetIndex]
  Post.findByPk(req.params.post_id).then(function(post){
    res.render('detail', {post: post})
  })
})

router.post('/', function (req, res) {
  // var newObj = {
  //   id: uuidv1(),
  //   title: req.body.title,
  //   body: req.body.gnb_body
  // }
  // posts.push(newObj)

  // fs.writeFile('posts.json', JSON.stringify(posts), function () {
  //   res.redirect('back')
  // })
  var newPost={
    title: req.body.title,
    body: req.body.body
  }
  Post.create(newPost).then(function(){
    res.redirect('back')
  })
})

router.get('/update_post/:post_id', function(req, res){
  // var targetIndex = posts.findIndex(function(element) {
  //   return element.id == req.params.post_id
  // })
  // var targetPost = posts[targetIndex]
  Post.findByPk(req.params.post_id).then(function(post){
    res.render('update', {post: post})
  })
  
})

router.post("/update_post/:post_id", function(req, res) {
  var updatePost = {title: req.body.title, body: req.body.body}
  Post.update(updatePost, {where: {id: req.params.post_id}}).then(function(){
     res.redirect('/')
  })
  // var index = posts.findIndex(function(element) {
  //   return element.id == req.params.post_id
  // })

  // posts[index].title = req.body.title
  // posts[index].body = req.body.body

  // fs.writeFile('posts.json', JSON.stringify(posts), function () {
  //  // res.redirect('/update_post/'+post.id)
  
  // })
})

router.post("/delete_post/:post_id", function(req,res) {
  // var index = posts.findIndex(function(element) {
  //   return element.id == req.params.post_id
  // })
  // posts.splice(index, 1)
  // fs.writeFile('posts.json', JSON.stringify(posts), function () {

    
  // })
  Post.destroy({where: {id: req.params.post_id}}).then(function(){
    res.redirect('/')
  })
})

module.exports = router;


const express = require('express');
const router = express.Router();
//const Task = require('../model/task');
const Post = require('../model/post');

//Pagina principal
router.get('/', async function(req,res){
  let postes = await Post.find()
  console.log(postes)
  res.render('index', {postes})
});

router.post('/add', async function(req,res){
  let post = new Post(req.body)
  console.log(post)
  await post.save()
  res.redirect('/')
});

//Reconocimientos
router.get('/Reconocimientos', async (req,res) =>{
  let postes = await Post.find()
  res.render('rewards', {postes});
});

router.post('/Reconocimientos', async (req,res) =>{
  let post = new Post(req.body)
  console.log(post)
  await post.save()
  res.redirect('/')
});

//login
router.get('/login', async (req,res) =>{
  res.render('login');
});


router.get('/turn/:id',   async(req,res) =>{

  let id = req.params.id
  let post = await Post.findById(id)
  post.complete = !post.complete
  await post.save()

  res.redirect('/')
})

router.get('/delete/:id',   async(req,res) =>{
  let id = req.params.id
  await Post.remove({_id:id})
  res.redirect('/')
})

router.get('/rewards',   async(req,res) =>{
  res.redirect('/Reconocimientos')
})

////////////////////////////////////////////////////////
//edit
router.get('/edit/:id',   async(req,res) =>{
  let id = req.params.id
  let post = await Post.findById(id)
  res.render('edit', {post})
})

router.post('/edit/:id',   async(req,res) =>{
  await Post.updateOne({_id:req.params.id},req.body)
  res.redirect('/')
})


router.post('/delete/:id',   async(req,res) =>{
  let id = req.params.id
  await Post.remove({_id:id})
  res.redirect('/')
})

/////////////////////////////////////////////////////

module.exports = router;

const express = require('express');
const router = express.Router();
//const Task = require('../model/task');
const Post = require('../model/post');
const User = require('../model/user'); //20
let verify = require('../middleware/verifyAccess'); //20
let bcrypt = require("bcrypt"); //20
let jwt = require("jsonwebtoken"); //20

//Pagina principal
router.get('/', verify, async function(req,res){

  console.log(req.userId)
  let postes = await Post.find({user_id: req.userId})
  console.log(postes)
  res.render('index', {postes})
});

router.post('/add', verify, async function(req,res){
  let post = new Post(req.body)
  post.user_id = req.userId
  console.log(post)
  await post.save()
  res.redirect('/')
});

//Reconocimientos
router.get('/Reconocimientos', verify, async (req,res) =>{
  let postes = await Post.find()
  res.render('rewards', {postes});
});

router.post('/Reconocimientos', verify, async (req,res) =>{
  let post = new Post(req.body)
  console.log(post)
  await post.save()
  res.redirect('/')
});

//turn
router.get('/turn/:id', verify, async(req,res) =>{

  let id = req.params.id
  let post = await Post.findById(id)
  post.complete = !post.complete
  await post.save()

  res.redirect('/')
})

router.get('/delete/:id', verify, async(req,res) =>{
  let id = req.params.id
  await Post.remove({_id:id})
  res.redirect('/')
})

router.get('/rewards', verify, async(req,res) =>{
  res.redirect('/Reconocimientos')
})

////////////////////////////////////////////////////////
//edit
router.get('/edit/:id', verify, async(req,res) =>{
  let id = req.params.id
  let post = await Post.findById(id)
  res.render('edit', {post})
})

router.post('/edit/:id', verify, async(req,res) =>{
  await Post.updateOne({_id:req.params.id},req.body)
  res.redirect('/')
})


router.post('/delete/:id', verify, async(req,res) =>{
  let id = req.params.id
  await Post.remove({_id:id})
  res.redirect('/')
})

/////////////////////////////////////////////////////

router.get('/login', async function(req,res){ //20
  res.render('login')
});

router.post('/login', async (req,res) => { //20
  let email = req.body.email //Esto se puede porque este es el name que tenemos en el formulario de login.ejs
  let plainpassword = req.body.password //Esto se puede porque este es el name que tenemos en el formulario de login.ejs

  console.log(email)
  console.log(plainpassword)

  let user = await User.findOne({email: email}) //Revisamos si existe un
  //usuario con el correo recibido. Y obtenemos su referencia.

  // si no existe el usuario
  if (!user) {
    res.redirect('login')
  }

  // si existe el usuario verificamos la contrasena
  else {
    let valid = await bcrypt.compareSync(plainpassword, user.password)

    if (valid) {
      let token = jwt.sign({id:user.email}, process.env.SECRET, {expiresIn:"1h"});
      console.log(token)
      res.cookie("token", token, {httpOnly:true}) //Cookie con nombre token y 
      //el token como valor
      res.redirect('/')
    }
    else {
      res.redirect('login')
    }

  }
})

router.get('/register', async function(req,res){ //20
  res.render('register')
});

router.post('/addUser', async (req,res) => { //20
  let user = new User (req.body)

  //Hash a la contrasena

  user.password = bcrypt.hashSync(user.password,10)
  await user.save()
  //user.password = user.encryptPassword(user.password)

  //console.log(user)
  res.redirect('/login')
})

router.get('/logoff', (req,res) =>{ //20
  res.clearCookie("token")
  res.redirect("/")
})

module.exports = router;
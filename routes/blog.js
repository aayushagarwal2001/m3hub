const { request } = require('express');
const express = require('express');
const route= express.Router();
const blog=require('../db/blog');
const User=require('../db/student')
const catchAsync = require('../utils/catchAsync');
route.use(express.urlencoded({ extended: true }));

route.get('/create',catchAsync(async(req,res)=>
{    try {
    var user_id=req.user._id;
    const b= await User.findById(user_id).populate('content');
    res.render('blog',{blog:b});
} catch (e) {
    req.flash('error', e.message);
    res.redirect('/create');
}
}));

route.post('/create',catchAsync(async (req, res) => {
    try {
    console.log(req.body);
     const {title,author,introduction,editor  } = req.body;
    
        const user = new blog({title,introduction,author,editor});
         await user.save();
     const id=user._id;
    const user_id=req.user.id;
  const a= await User.findById(user_id).exec();
  a.content.push(id);
   await a.save();


         



         var d='/show/'+id;
            res.redirect('show/'+id);
        
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/create');
    }
})
)
route.get('/show/:id',async (req,res)=>{
const id = req.params.id;
const blog_post= await blog.findById(id).exec();
const user=req.user;
if(user)
      { var user_id=user._id;
      const b= await User.findById(user_id).populate('content');
       res.render('blogpage',{blog_post:blog_post,blog:b});}
       else{
           const c="und";
           res.render('blogpage',{blog_post:blog_post});
       }


})
route.get('/edit/:k',async (req,res)=>
{   var user=req.user;
    if(req.params){
    const id = req.params.k;
    const blog_post= await blog.findById(id).exec();
    const b= await User.findById(user._id).populate('content');
    res.render('edit',{blog_post:blog_post,blog:b});}

})
route.put('/show/:k',async (req,res)=>
{
    const id = req.params.k;
    console.log(req.body);
    const blog_post= await blog.findByIdAndUpdate(id,{...req.body});
    const url=id;
    res.redirect(url)

})
route.get('/delete/:id',async (req,res)=>
{
    if(req.user){
    const id = req.params.id;
    const blog_post= await blog.findByIdAndDelete(id).exec();
    const user_id=req.user._id;
   const a= await User.findById(user_id).exec();
   a.content.pull({_id:id});
    a.save();
    res.redirect("/cse");}

})

module.exports = route;
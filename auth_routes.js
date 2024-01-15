//import express, express router as shown in lecture code
import {Router} from 'express';
const router = Router();
import { registerUser,loginUser } from '../data/users.js';
import { checkEmail, checkName, checkPassword, checkRole } from '../helpers.js';

const middleware = (req,res,next) =>{//async ?
  if(!req.session.user){
    return res.redirect('/login');
  }else if(req.session.user.role == 'admin'){
    return res.redirect('/admin');
  }else if(req.session.user.role == 'user'){
    return res.redirect('/protected');
  }
  next();
}


router.route('/').get(middleware,async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});



router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    return res.render('register');
  })
  .post(async (req, res) => {
    //code here for POST
    try{
      let allFields = ['firstNameInput','lastNameInput','emailAddressInput','passwordInput','confirmPasswordInput','roleInput'];
      for(let i = 0; i < allFields.length; i++){
        if(!req.body[allFields[i]]){
          return res.status(400).json({error:`${i} is missing`});
        }
      }

      let {firstNameInput,lastNameInput,emailAddressInput,passwordInput,confirmPasswordInput,roleInput } = req.body;
      firstNameInput = checkName(firstNameInput,'firstNameInput');
      lastNameInput = checkName(lastNameInput,'lastNameInput');
      emailAddressInput = checkEmail(emailAddressInput,'emailAddressInput');
      passwordInput = checkPassword(passwordInput,'passWordInput');
      confirmPasswordInput = checkPassword(confirmPasswordInput,'confirmPasswordInput');
      roleInput = checkRole(roleInput,'roleInput');

      if(passwordInput !== confirmPasswordInput){
        return res.status(400).json({error:"confirmPassword should have the same value as passwordInput"});
      }
      let result = await registerUser(firstNameInput,lastNameInput,emailAddressInput,passwordInput,roleInput);
      if(result.insertedUser && result){
        return res.redirect('/login');
      }else{
        return res.status(500).json({error:"Internal Server Error"});
      }
    }catch(e){
      return res.status(400).json({error:e.message});
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    console.log("loginget")
    res.render('login',{loginfail:false});//attention
  })
  .post(async (req, res) => {
    //code here for POST
    console.log("loginpost")
    try{
      let requiredFields = ['emailAddressInput','passwordInput'];////req fields are defined by myself, should be equal to the values in html
      for(let i = 0; i < requiredFields.length; i++){
        if(!req.body[requiredFields[i]]){
          return res.status(400).json({error:`${i} is missing`});
        }
      }

      let {emailAddressInput,passwordInput} = req.body;
      emailAddressInput = checkEmail(emailAddressInput,'emailAddressInput');
      passwordInput = checkPassword(passwordInput,'passwordInput');

      let user = await loginUser(emailAddressInput,passwordInput);
      req.session.user = {
        firstName:user.firstName,
        lastName:user.lastName,
        emailAddress:user.emailAddress,
        role:user.role
      }
      console.log(req.session.user)

      if(user.role === 'admin'){
        res.redirect('/admin');
      }else{
        res.redirect('/protected');
      }

    }catch(e){
      res.status(400);
      res.render('login',{loginfail:true,errormessage:e});
    }
  });

router.route('/protected').get(async (req, res) => {
  //code here for GET
  if(!req.session.user){
    return res.redirect('/login');
  }

  let isAdmin = false;
  if(req.session.user.role === 'admin'){
    isAdmin = true;
  }
  
  let role = req.session.user.role;
  res.render("protected",{firstName:req.session.user.firstName,lastName:req.session.user.lastName,currentTime:new Date(Date.now()),role:role,isAdmin:isAdmin});
  
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  console.log("admin_get")
  res.render("admin",{firstName:req.session.user.firstName,lastName:req.session.user.lastName,currentTime:new Date(Date.now())});
});

router.route('/error').get(async (req, res) => {
  //code here for GET
  res.render('error');
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  res.render('logout');
});

export default router;

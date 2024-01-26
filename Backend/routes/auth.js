const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//Route 1 create a user  http://localhost:4000/api/auth/createuser
router.post(
  "/createuser",
  [
    body("password", "password must be 5 characters ").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    // console.log(req.body);
    const result = validationResult(req);
    let success=false;
    if (!result.isEmpty()) {
      return res.send({success,errors: result.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.send(success,"email already exist");
      }

      var salt = await bcrypt.genSaltSync(10);
      secpass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      // .then(user => res.json(user))
      // .catch(err => res.json(err.message))
      const data={
        user:{
          id:user.id
        }
      }
      const JWT_SECRET='sdfvdvdzrbzdrbtbvtrhbtbteghter'
      const authtoken=jwt.sign(data,JWT_SECRET)
      success=true
      res.json({success,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error")
    }
  }
);

//Route 2 login  http://localhost:4000/api/auth/login
router.post(
  "/login",
  [
    body("password", "password must be enter ").exists(),
    body("email",'please enter valid email').isEmail(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    let success=false;
    if (!result.isEmpty()) {
      return res.send({ success,errors: result.array() });
    }

    const{email,password}=req.body;
    try {
      let user=await User.findOne({email})
      if(!user){
        return res.status(400).json({success,error: 'Please try to login with corrrect Credentials'})
      }

      const passwordcompare=await bcrypt.compare(password,user.password)
      if(!passwordcompare){
        return res.status(400).json({success,error: 'Please try to login with corrrect Credentials'})
      }

      const data={
        user:{
          id:user.id
        }
      }
      const JWT_SECRET='sdfvdvdzrbzdrbtbvtrhbtbteghter'
      const authtoken=jwt.sign(data,JWT_SECRET)
      success=true
      res.json({success,authtoken})


    } catch (error) {
      console.error(error.message);
      res.send("Internal server Error")
    }

  })

  //Route 3 get login user detail  http://localhost:4000/api/auth/getuser
  router.post(
    "/getuser",fetchuser,async (req, res) => {
  try {
    let userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
  }catch (error) {
    console.error(error.message);
    res.status().send("Internal server Error")
  }

})

module.exports = router;

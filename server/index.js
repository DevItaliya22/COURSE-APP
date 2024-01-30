import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User, Courses } from './db/index.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const secret = "JWT-SECRET";

mongoose.connect("mongodb://127.0.0.1:27017/courses");

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      console.log("user found");
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


app.post("/me",authenticateJwt,async(req,res)=>{
  const user=await User.findOne({email : req.user.email});

  if(!user)
  {
    res.status(404).json({message:"user not found"})
    
  }
  else{
    res.status(200).json({message:"user is logged in",loggedIn:true});
  }

})

app.post('/signup', async (req, res) => {
  const { password, email } = req.body;

  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: 'Admin already exists' });
    } else {
      const newAdmin = new User({ email: email, password: password });
      newAdmin.save();

      const token = jwt.sign({ email }, secret, { expiresIn: '100h' });
      res.json({message:"User created", token:token });
      console.log("user created");
    }
  }
  User.findOne({ email }).then(callback);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email, password });

  if (admin) {
    console.log(admin._id);
    const token = jwt.sign({ email }, secret, { expiresIn: '100h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: "Invalid email or password" });
  }
});



app.post('/addCourses', authenticateJwt, async (req, res) => {
    const course = req.body;
    const user = await User.findOne({ email: req.user.email }).populate('coursesSold');

    console.log("came");
    if (!user) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
    } 
    if (!course) {
        console.log("Course not found in /addcourses");
        return res.status(404).json({ message: "Course not found" });
    }

    const obj = {
        title: course.title,
        price: course.price,
    };

    const newCourse = new Courses(obj);
    await newCourse.save();

    const curr_course = await Courses.findOne({ title: course.title,
      price: course.price,});

    user.coursesSold.push(curr_course._id);

    await user.save();

    console.log("Course uploaded");
    return res.status(200).json({ message: "Course uploaded" });
});

app.post('/buyCourse',authenticateJwt,async(req,res)=>{
    const course=await Courses.findOne({title : req.body.title, price:req.body.price})

    if(!course)return res.status(404).json({message: "course not found"})
    
    const user = await User.findOne({ email: req.user.email });
    
    if(!user) return res.status(404).json({ message: 'User not found' });
    
    if (!user.coursesBought) {
        user.coursesBought = [];
    }
    if (user.coursesBought.includes(course._id)) {
        return res.status(403).json({ message: 'User already owns this course' });
    }
    user.coursesBought.push(course._id)
    await user.save();
    console.log("bought ")
    res.status(200).json({ message: 'Course purchased successfully', courseId: course._id });
})

app.get('/boughtCourses', authenticateJwt, async (req, res) => {
    try {
      const user = await User.findOne({ email: req.user.email }).populate('coursesBought');
  
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.coursesBought && user.coursesBought.length > 0) {
        res.status(200).json(user.coursesBought);
      } else {
        res.status(200).json({ message: "User has no bought courses" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/soldCourses', authenticateJwt, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate('coursesSold');

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.coursesSold && user.coursesSold.length > 0) {
      res.status(200).json(user.coursesSold);
    } else {
      res.status(200).json({ message: "User has no sold courses" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/boughtCourses/:id', authenticateJwt, async (req, res) => {
    try {
      const id=req.params.id;
      const user = await User.findOne({ email: req.user.email }).populate('coursesBought');
  
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.coursesBought && user.coursesBought.length >= id-1) {
        res.status(200).json(user.coursesBought[id-1]);
      } else {
        res.status(403).json({ message: "User has no bought courses" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/users',async(req,res)=>{
    const users=await User.find({})
    if(users)
    return res.status(200).json(users)
    else
    return res.status(404).json({message: " no user found "})
})
  
app.get('/courses',async(req,res)=>{

    const course=await Courses.find({})

   
    if(course)
    return res.status(200).json(course)
    else
    return res.status(404).json({message: " no course found "})

})

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

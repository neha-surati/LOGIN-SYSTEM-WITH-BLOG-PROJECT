const mongoose=require('mongoose');


const database= async()=>{
    try {
     await mongoose.connect("mongodb+srv://nehasurati1605:nehashish@cluster0.1j1m1ey.mongodb.net/BlogDb");
     console.log("Database connected..!")
    } catch (error) {
     console.log(error);
    }
 }
 module.exports= database
 
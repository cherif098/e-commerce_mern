import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import zxcvbn from 'zxcvbn';


const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// user login route 
const loginUser = async (req, res) => {
    try {
        const {email,password} = req.body;

        // mandatory fields validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // check if user exist 
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).json({
                success: false,
                message: "a user with this email does not exist"
            });
        }
        
        // check if password is correct
        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }        

        // token generation
        const token = createToken(user._id);
        return res.status(200).json({
            success: true,
            token,
            userId: user._id 
        });
        
        
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing your request"
        });
    }
}




// user registration route
const registerUser = async (req, res) => {

    try {
        const {name,email,password} = req.body;

        // check if user wrote a name 
        if (!name || name.trim().length < 3 ){
            return res.status(400).json({
                success:false,
                message:"a name is required and must be at least 3 characters long"
            })
        }

        // check if user write an email :
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // check if user already exists
        const normalizedEmail = email.toLowerCase();
        const exist_user = await userModel.findOne({ email: normalizedEmail });
        if (exist_user){
            return res.status(409).json({
            success: false,
            message: "User already exists with this email"
        });
        }

        // validating email and password 
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }
        // check if password is long enough 

        if(!password || password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long."
            })
        }

        // check if password is strong enough

        const result = zxcvbn(password);
        if (result.score < 3) {
            return res.status(400).json({
                success: false,
                message: result.feedback.warning,
                suggestions: result.feedback.suggestions
            });
        }

        // hash useer  password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);

        // add a new user to the database
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        // generate token
        const token = createToken(user.id)

        // send response back to the user
        res.json({success:true,
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }});



    } catch (error) {
        console.error("Error registrating user:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while proceding your request"
        }); 
    }
}


// admin login route 
const adminLogin = async (req,res)=>{
    
}


export {
    loginUser,
    registerUser,
    adminLogin
}
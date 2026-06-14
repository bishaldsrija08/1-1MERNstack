const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

// Regiser User


/*
1. Accept form data
2. Validate form data
3. Check if user already exists
4. Hash the password
5. Create a new user in the database
6. Send a response to the client
*/

const registerUser = async (req, res) => {
    const { userEmail, userPhoneNumber, userName, userPassword } = req.body;
    if (!userEmail || !userPhoneNumber || !userName || !userPassword) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const existingUser = await User.findOne({
        userEmail
    })

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists! Try login instead"
        })
    }

    await User.create({
        userEmail,
        userPhoneNumber,
        userName,
        userPassword: await bcrypt.hash(userPassword, 10)
    })

    return res.status(201).json({
        message: "User registered successfully"
    })
}

// Login User

/*
1. Accept form data
2. Validate form data
3. Check if user exists
4. Compare the password with the hashed password in the database
5. Send a response to the client
*/
const loginUser = async (req, res) => {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const existingUser = await User.findOne({ // Object from the database
        userEmail
    })

    if (!existingUser) {
        return res.status(400).json({
            message: "User not found! Try registering instead"
        })
    }

    const isPasswordValid = await bcrypt.compare(userPassword, existingUser.userPassword);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid password or email"
        })
    }

    return res.status(200).json({
        message: "Login successful",
        token: "dummy-token" // In a real application, you would generate a JWT token here  
    })
}

// Forgot Password



// Reset Password




// Logout User


module.exports = {
    registerUser,
    loginUser
}
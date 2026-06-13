

// Regiser User

const User = require("../../models/userModel");

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
            message: "User already exists"
        })
    }

    await User.create({
        userEmail,
        userPhoneNumber,
        userName,
        userPassword
    })

    return res.status(201).json({
        message: "User registered successfully"
    })
}




// Login User



// Forgot Password



// Reset Password




// Logout User


module.exports = {
    registerUser
}
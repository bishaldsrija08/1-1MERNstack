const bcrypt = require("bcrypt");
const User = require("../../../models/userModel");

// Get my profile - Id
const getMyProfile = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json({
        message: "User profile fetched successfully",
        data: user
    })
}

// Update my profile
const updateMyProfile = async (req, res) => {
    const userId = req.user._id;
    const { userName, userEmail, userPhoneNumber } = req.body;
    if (!userName || !userEmail || !userPhoneNumber) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    const existingUserWithEmail = await User.findOne({
        userEmail: userEmail,
        _id: { $ne: userId }
    })

    if (existingUserWithEmail) {
        return res.status(400).json({ message: "Email already exists" })
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
        userName,
        userEmail,
        userPhoneNumber
    })
    res.status(200).json({
        message: "User profile updated successfully",
        data: updatedUser
    })
}


// Delete my profile
const deleteMyProfile = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    await User.findByIdAndDelete(userId)
    return res.status(200).json({
        message: "User profile deleted successfully"
    })
}


// update my password
const updateMyPassword = async (req, res) => {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword, newPassword, "haahah")

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.userPassword)
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Old password is incorrect" })
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.userPassword = hashedPassword
    await user.save()

    return res.status(200).json({
        message: "User password updated successfully"
    })
}

module.exports = {
    getMyProfile,
    deleteMyProfile,
    updateMyProfile,
    updateMyPassword
}
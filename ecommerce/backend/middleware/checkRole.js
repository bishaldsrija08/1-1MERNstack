const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.userRole
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                message: "Access denied, insufficient permissions"
            })
        }
        next()
    }
}

module.exports = checkRole
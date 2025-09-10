const prisma = require('../Prismaclient/Prismaclient')
const jwt = require('jsonwebtoken')

const check = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        return res.status(401).json("No token provided")
      }

      const verify = jwt.verify(token, process.env.JWT_SECRET)
      const user = await prisma.User.findUnique({ where: { id: verify.id } })

      if (!user) {
        return res.status(404).json("User not found")
      }

     
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json("Access denied")
      }

      req.user = user
      next()
    } catch (error) {
      res.status(401).json("Invalid token")
      console.log("error", error)
    }
  }
}

module.exports = { check }

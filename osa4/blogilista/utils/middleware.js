const errorHandling = async (error, req, res, next) => {
    if (error.name === 'ValidationError'){
        return res.status(400).json({ error: error.message })
    }

    if (error.name === 'JsonWebTokenError'){
        return res.status(401).json({ error: "invalid token" })
    }
}

const tokenExctractor = async (req, res, next) => {
    const auth = req.get('authorization')
  
    if (auth && auth.toLowerCase().startsWith('bearer ')){
      req.token = auth.substring(7)
    }
    next()
  }

module.exports = { errorHandling, tokenExctractor}
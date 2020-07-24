const errorHandling = async (error, req, res, next) => {
    if (error.name === 'ValidationError'){
        return res.status(400).json({ error: error.message })
    }

    if (error.name === 'JsonWebTokenError'){
        return res.status(401).json({ error: "invalid token" })
    }
}

module.exports = { errorHandling, }
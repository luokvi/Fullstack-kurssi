const errorHandling = async (error, req, res, next) => {
    if (error.name === 'ValidationError'){
        return res.status(400).json({ error: error.message })
    }
}

module.exports = { errorHandling, }
module.exports = (res, status, output) => {
    res.status(status).json(output)
}
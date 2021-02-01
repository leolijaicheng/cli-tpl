module.exports = {
    '/api/test':(req,res) => {
        const data = {
            message:'success',
            code:0
        }
        res.send(data)
    },
    '/api/test2':(req,res) => {
        const data = {
            message:'error',
            code:501
        }
        res.send(data)
    }
}
const Task = require("../models/taskSchema")

const createTask = async (req, res, next) => {
    try {
        const data = await Task.create({...req.body});
        console.log(data)
         return res.json({data}) 
         
    } catch (error) {
        return next(error)
    }
}




module.exports = { createTask}
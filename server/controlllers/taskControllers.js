const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Task = require("../models/taskSchema")

const createTask = async (req, res) => {
    try {
        const data = await Task.create({...req.body});
        console.log(data)
         return res.json({data}) 
         
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Internal Server Error", status: "ERROR" });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const token = req.body.userID; 

        const data = await Task.find({refUserId: token});
         return res.json({data, status: "SUCCESS"}) 
         
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Internal Server Error", status: "ERROR" });
    }
}



const updateCard = async (req, res) => {
    const { cardId } = req.params;
    const { checklist, category } = req.body;
  
    try {
      const card = await Task.findById(cardId);
      if (!card) {
        return res.status(404).json({ message: 'Card Not found' });
      }
  
      if (checklist !== undefined) {
        card.checklist = checklist;
      } else if (category !== undefined) {
        card.category = category;
      } else {
        return res.status(400).json({ message: 'Invalid Update Data' });
      }
  
      const updatedCard = await card.save();
  
      res.status(200).json({ message: 'Card updated successfully', updatedCard });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  const getAnalytics = async (req,res) => {
    try {

        const userId = req.body.userID
        const categoryCount = await Task.aggregate([
          {
            $match: { refUserId: new mongoose.Types.ObjectId(userId) }
          },
            {
              $group: {
                _id: '$category', 
                count: { $sum: 1 }, 
              },
            },
          ]);
  
          const priorityCounts = await Task.aggregate([
            {
              $match: { refUserId: new mongoose.Types.ObjectId(userId) }
            },
            {
              $group: {
                _id: '$priority',
                count: { $sum: 1 },
              },
            },
          ]);
          const backlogs = categoryCount.find(item => item._id === "BACKLOGS")?.count;
          const todo = categoryCount.find(item => item._id === "TODO")?.count;
          const progress = categoryCount.find(item => item._id === "IN PROGRESS")?.count;
          const done = categoryCount.find(item => item._id === "DONE")?.count;
          const low = priorityCounts.find(item => item._id === "LOW PRIORITY")?.count;
          const medium = priorityCounts.find(item => item._id === "MEDIUM PRIORITY")?.count;
          const high = priorityCounts.find(item => item._id === "HIGH PRIORITY")?.count;

    
        const dueDateCounts = await Task.countDocuments({ refUserId: new mongoose.Types.ObjectId(userId), dueDate: { $ne: null } });

        res.json({ backlogs,todo, progress, done, medium, high, low , dueDateCounts });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };




module.exports = { createTask, getAllTasks, updateCard, getAnalytics}
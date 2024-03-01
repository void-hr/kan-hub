const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Task = require("../models/taskSchema")

const createTask = async (req, res) => {
    try {
      const refUserId = req.body.userID;
      const {title, category, priority, checklist, dueDate } = req.body
      if( !title || !category || !priority || !checklist) {
        return res.status(400).json({message: "Bad Request", status: "ERROR"});
      }
        const data = await Task.create({title, category, priority, checklist, dueDate, refUserId});
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
        const { filter } = req.query;

        const filterCondition = { refUserId: token};

        if(filter === 'month'){
          filterCondition.createdAt = { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)};
        }else if( filter === 'today') {
          filterCondition.createdAt = { $gte: new Date(new Date().setHours(0, 0, 0, 0)) };

        }else{
          filterCondition.createdAt = {$gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)};
        }
        const data = await Task.find(filterCondition).sort({createdAt: 'asc'});
         return res.json({data, status: "SUCCESS"}) 
         
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Internal Server Error", status: "ERROR" });
    }
}



const updateCard = async (req, res) => {
    const { cardId } = req.params;
    const { checklist, category, priority, dueDate, title } = req.body;
    
    try {
      const card = await Task.findById(cardId);
      if( priority || dueDate || title) {
        card.priority = priority;
        card.dueDate = dueDate || null;
        card.title = title;
      }
      if (!card) {
        return res.status(404).json({ message: 'Card Not found', status: "ERROR" });
      }
  
      if (checklist !== undefined) {
        card.checklist = checklist;
      } else if (category !== undefined) {
        card.category = category;
      } else {
        return res.status(400).json({ message: 'Bad Request', status: "ERROR" });
      }
  
      const updatedCard = await card.save();
  
      res.status(200).json({ data: updatedCard, status: "SUCCESS" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', status: "ERROR" });
    }
  };


  const getAnalytics = async (req,res) => {
    try {

        const userId = req.body.userID
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid User ID", status: "ERROR" });
        }
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
          const moderate = priorityCounts.find(item => item._id === "MODERATE PRIORITY")?.count;
          const high = priorityCounts.find(item => item._id === "HIGH PRIORITY")?.count;

    
        const dueDateCounts = await Task.countDocuments({ refUserId: new mongoose.Types.ObjectId(userId), dueDate: { $ne: null } });

        res.json({ backlogs,todo, progress, done, moderate, high, low , dueDateCounts });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

  const deleteTaskCard = async(req,res) => {
      try {
        const { cardId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(cardId)) {
          return res.status(400).json({ message: "Invalid Card ID", status: "ERROR" });
        }
        const findAndDeleteCard = await Task.findByIdAndDelete(cardId)
        if(!findAndDeleteCard) {
          return res.status(400).json({ message: "Bad Request", status :"ERROR"})
        }
        return res.status(200).json({ message: "Deleted", status: "SUCCESS"})
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error', status: "ERROR" });
        
      }
  }

  const getTaskCard = async(req,res) => {
    try {
      const { cardId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(cardId)) {
        return res.status(400).json({ message: "Invalid Card ID", status: "ERROR" });
      }
      const findCard = await Task.findOne({_id:cardId});
      if(!findCard){
        return res.status(404).json({message: "No Task Found", status: "ERROR"})
      }   
      
      return res.status(200).json({ findCard, status: "SUCCESS"})
      
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', status: "ERROR" });
    }
  }


module.exports = { createTask, getAllTasks, updateCard, getAnalytics, deleteTaskCard, getTaskCard}
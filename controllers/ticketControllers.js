const Ticket = require('../models/ticketModel');
const User= require("../models/userModel")


// creating ticket for  user
const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.body);
    const ticket = new Ticket({
      title,
      description,
      createdBy: req.user.id,
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// view all tickets of login user
const viewAllTickets=async(req,res)=>{
  try{
    const allTickets= await Ticket.find({assignedTo:req.user._id})
    res.status(200).json(allTickets)
    
  }
  catch(err){
    res.status(500).json({ message: "server error"})
  }
}

// delete the user ticket of provided id 
const deleteUserTicket=async(req,res)=>{
  try{
    const deleteticket= await Ticket.findById(req.params.id)
   
    if(!deleteticket){
      res.status(400).json({message:" id is not found"})
    }else{
      const deletedticket=await Ticket.findByIdAndDelete(deleteticket);
      res.status(200).json(deletedticket)
    }
  }
  catch(err){
    res.status(500).json("Server Error")
  }
}

//update the user ticket => title and description

// const updateTickets= async(req,res)=>{
//   const updateTicket=await Ticket.findById(req.params.id);
//   if(!updateTicket){
//     res.status(400).json({message:" id is not found"})

//   }
//   else{
//     const updatedTicket= await Ticket.findByIdAndUpdate(
//       req.params.id,
      
      


//     )
//   }
// }


module.exports = {
  createTicket,
  viewAllTickets,
  deleteUserTicket
};

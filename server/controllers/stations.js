import mongoose from 'mongoose';
import Station from '../models/station.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

export const contact = async (req,res) => {
    {
        console.log(req.body.Name);
      const name = req.body.Name;
      const email = req.body.Email;
      const message = req.body.Message; 
      const mail = {
        from: email,
        to: process.env.GMAIL_RECEIVER,
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Message: ${message}</p>`,
      };
      contactEmail.sendMail(mail, (error) => {
        if (error) {
          res.json({ status: "Error" });
        } else {
          res.json({ status: "Message Sent" });
        }
      });
    }
}
export const getStations = async (req,res) => {
  try {
      const stations = await Station.find();
      console.log(stations);
      res.status(200).json(stations);
  } catch (error) {
      res.status(404).json({message: error.message});
  }
}

export const bookSlot = async (req, res) => {    
   const {id} = req.params;
   console.log({id});
   // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No station with that Id');
   const station = await Station.findOne({stationId: id});
   if(!station){
       const station = new Station({slot: 1,stationId: id});
       await station.save();
       console.log(station);
       res.json(station); 
   }else{
       console.log({station});
   var newSlot;
   if(station.slot < 24)newSlot=station.slot+1;
   else newSlot = 24;
   const updatedStation= await Station.findByIdAndUpdate(station._id,
       {slot: newSlot}, {new: true});
     res.json(updatedStation); 
   }
}
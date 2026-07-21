const express=require("express");

const router=express.Router();

const chatbot=require("../chatbot/chatbotAgent");

const memory=require("../chatbot/memory");

const language=require("../chatbot/language");



router.post("/chat",async(req,res)=>{


try{


const {

message,
startup,
userId,
lang

}=req.body;



const response=await chatbot(

message,

startup,

language(lang)

);



memory.saveMemory(

userId,

message,

response

);



res.json({

success:true,

reply:response

});


}

catch(error){

res.status(500)
.json({

error:error.message

});


}



});


module.exports=router;
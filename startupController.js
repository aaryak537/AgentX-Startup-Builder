import { startupOrchestrator } from "../orchestrator/startupOrchestrator.js";

export async function generateStartup(req,res){

try{

const {prompt}=req.body;

const result=await startupOrchestrator(prompt);

res.json({

success:true,

startup:result

});

}catch(error){

console.error(error);

res.status(500).json({

success:false,

message:error.message

});

}

}
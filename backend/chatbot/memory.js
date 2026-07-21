let conversations={};



function saveMemory(userId,message,response){

if(!conversations[userId]){
    conversations[userId]=[];
}


conversations[userId].push({

user:message,
assistant:response,
time:new Date()

});


}



function getMemory(userId){

return conversations[userId] || [];

}



module.exports={
saveMemory,
getMemory
};
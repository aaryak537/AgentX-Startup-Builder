const toggle =
document.getElementById("chat-toggle");


const windowChat =
document.getElementById("chat-window");


const closeBtn =
document.getElementById("close-chat");


toggle.onclick=function(){

windowChat.style.display="block";

}


closeBtn.onclick=function(){

windowChat.style.display="none";

}



const sendBtn =
document.getElementById("send-chat");


const input =
document.getElementById("chat-message");


const messages =
document.getElementById("messages");



sendBtn.onclick =
async function(){


let text=input.value;


if(!text)return;



addMessage(
text,
"user-message"
);



input.value="";



let startup =
JSON.parse(
localStorage.getItem("startup")
);



let response =
await fetch(
"http://localhost:5000/api/chat",
{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:JSON.stringify({

message:text,

startup,

userId:"agentx-user",

lang:"English"

})


});



let data=
await response.json();



addMessage(

data.reply,

"bot-message"

);



voiceReply(data.reply);



}



function addMessage(
text,
className
){


messages.innerHTML +=

`

<div class="${className}">
${text}
</div>

`;


messages.scrollTop=
messages.scrollHeight;


}



function voiceReply(text){


let speech =
new SpeechSynthesisUtterance(text);


speech.lang="en-US";


speechSynthesis.speak(
speech
);


}



// Voice Input


document
.getElementById("voice-chat")
.onclick=function(){


let recognition =
new webkitSpeechRecognition();


recognition.start();



recognition.onresult=function(e){


input.value =
e.results[0][0].transcript;


}



}
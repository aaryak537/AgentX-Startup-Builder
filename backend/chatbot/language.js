const languages=[

"English",
"Hindi",
"Marathi",
"Spanish",
"French",
"German",
"Chinese",
"Japanese",
"Korean",
"Arabic",
"Portuguese",
"Russian"

];


function detectLanguage(lang){

if(languages.includes(lang))
return lang;


return "English";

}


module.exports=detectLanguage;
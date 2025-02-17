const buttons = document.querySelectorAll(".button-class")
const symbols = document.querySelectorAll(".btn-class")
const input = document.getElementById("input")

 function handelnumber(evt){
const value = evt.target.value
if(input.value === "" && isymbol(value))
{
return
} if( isymbol(value) && isymbol(input.value.slice(-1))) {
return
}
 if (value === "del"){
input.value = input.value.slice(0 , -1)

} else if (value === "del all") {
input.value = ""
} else if (value === "=") {
Result() || "Error"
} else {
    input.value += value
}
}
function isymbol(value){
return ["+" , "-" , "×" , "÷"].includes(value)
}
function Result() {
    try {
        let expression = input.value.replace(/×/g, "*").replace(/÷/g, "/");
        const result = new Function(`return ${expression}`)();
        input.value = result;
    } catch (error) {
        input.value = "Error"; 
    }

} 

for(let i = 0 ; i < buttons.length ; i++){
    buttons[i].addEventListener("click" , handelnumber)
}
for(let i = 0 ; i < symbols.length ; i++){
    symbols[i].addEventListener("click" , handelnumber)
}

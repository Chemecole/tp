//import { dataTP } from "./loadJSON";

divWhereDisplay = document.getElementById("displayFormOfSelectedTP")
tpNameSelect = document.getElementById("tpNameSelect")
result =  document.querySelector(".resultSelectTP");






tpNameSelect.addEventListener("change", (event) => {
    nameOfChoosenTP = event.target.value
    divWhereDisplay.textContent = `You like ${event.target.value}`;
    createFilledForm(dataTP, nameOfChoosenTP)
  });


function createFilledForm(tableau,choosenTP){
    console.log("haa")
    for (let i = 0; i < tableau.length; i++){
        if(tableau[i].name == choosenTP){

            console.log(tableau[i].name,tableau[i].level )
        }
    }


}

function makeList(tableau){
    let option;   
    console.log("tableu", tableau.length)
    for (let i = 0; i < tableau.length; i++) {
        
      option = document.createElement('option');
      option.value = tableau[i].name;
      option.text = tableau[i].name;  
      document.getElementById("tpNameSelect").appendChild(option);
    }
   }


   function displayTPtoModify(tableau){
       
        for (let i = 0; i < tableau.length; i++) {
            option = document.createElement('option');
            option.value = tableau[i].name;
            option.text = tableau[i].name;  
            document.getElementById("tpNameSelect").appendChild(option);
          }

    
   }

   /*window.onload = async function() {  
    };*/

       
       window.addEventListener('load', (event) => {
        makeList(dataTP);
        console.log("load")
        //makeDropdown();
    });


   
   
   
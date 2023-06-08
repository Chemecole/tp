//import { dataTP } from "./loadJSON";

divWhereDisplay = document.getElementById("displayFormOfSelectedTP")
tpNameSelect = document.getElementById("tpNameSelect")
result =  document.querySelector(".resultSelectTP");
window.onload = async function() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    makeDropdown();
    makeList(dataTP);
};

tpNameSelect.addEventListener("change", (event) => {
    divWhereDisplay.textContent = `You like ${event.target.value}`;
  });


function makeList(tableau){
    let option;   
    
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
   
   
   
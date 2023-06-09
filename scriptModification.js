//import { dataTP } from "./loadJSON";
divWhereDisplay = document.getElementById("displayFormOfSelectedTP")
tpNameSelect = document.getElementById("tpNameSelect")
result =  document.querySelector(".resultSelectTP");
btnModidfyTP = document.getElementById("btnModifyTP")



tpNameSelect.addEventListener("change", (event) => {
    nameOfChoosenTP = event.target.value
    createFilledForm(dataTP, nameOfChoosenTP)
  });


function createFilledForm(tableau,choosenTP){
    console.log("haa")
    for (let i = 0; i < tableau.length; i++){
        if(tableau[i].name == choosenTP){
            titre = document.getElementById("titreTP_formMODIFY")
            niveau = document.getElementById("niveau_formMODIFY")
            niveau = document.getElementById("niveau_formMODIFY")
            niveauActuel = document.getElementById("niveauActuel_formMODIFY")
            theme = document.getElementById("theme_formMODIFY")
            elevePDF = document.getElementById("elevePDF_formMODIFY")
            laboPDF = document.getElementById("laboPDF_formMODIFY")
            responsePDF = document.getElementById("responsePDF_formMODIFY")
            titre.value = tableau[i].name
            niveau.value = tableau[i].level
            niveauActuel.innerHTML = tableau[i].level
            theme.value = tableau[i].theme
            elevePDF.value = tableau[i].elevePDF
            laboPDF.value = tableau[i].laboPDF
            responsePDF.value = tableau[i].responsePDF
            console.log(tableau[i].name,tableau[i].level )
        }
    }


}

async function makeList(){

    let option;   
    console.log("tableu", dataTP.length)
    for (let i = 0; i < dataTP.length; i++) {
        
      option = document.createElement('option');
      option.value = dataTP[i].name;
      option.text = dataTP[i].name;  
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

 
    document.addEventListener("DOMContentLoaded", (event) =>{
       console.log("cacaacacac")
       loadFetch()
      
        console.log(dataTP.length)
        //makeDropdown();
    });
    makeList();



   
   
   
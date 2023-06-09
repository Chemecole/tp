//import { dataTP } from "./loadJSON";

//import * as fs from "fs";
const fs = require('fs');

//var fs = require("fs");

//divWhereDisplay = document.getElementById("displayFormOfSelectedTP")
tpNameSelect = document.getElementById("tpNameSelect")
result =  document.querySelector(".resultSelectTP");
btnModidfyTP = document.getElementById("btnModifyTP")
btnAddTP = document.getElementById("buttonSubmit")
formNewTP = document.getElementById("formTP")

titreAdd = document.getElementById("titreTP_form")
chemAdd = document.getElementById("chemForm") //this is really not good coding i think, i use totally different stuff with te same id
niveauAdd = document.getElementById("niveau_form")
themeAdd = document.getElementById("theme_form")
elevePDFAdd = document.getElementById("elevePDF_form")
laboPDFAdd = document.getElementById("laboPDF_form")
responsePDFAdd = document.getElementById("responsePDF_form")
chemToSelectAdd = document.getElementById("chemForm")

tpNameSelect= document.getElementById("tpNameSelect")

window.onload = async function() {    
    loadFetch();   
    await new Promise(resolve => setTimeout(resolve,500));
    makeDropdown(dataProducts,chemToSelectAdd);
    makeListOfTp(dataTP, tpNameSelect)
    };

let formToSend = {
    name: "",
    chemP: [],
    level:[],
    theme:""
};

function addMultipleSelection(menuDropdown){
    var selected = [];

    for (var option of menuDropdown.options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    }

    return selected
}

let tpJSON

btnAddTP.addEventListener("click",function(e){
    console.log("chlicjke")
    e.preventDefault();
    console.log(titreAdd.value)
    console.log(formToSend)
    formToSend.name = titreAdd.value
    
    formToSend.chemP = addMultipleSelection(chemAdd)
    
    formToSend.level = addMultipleSelection(niveauAdd)
    formToSend.theme = themeAdd.value
    tpJSON = JSON.stringify(formToSend,null,2)
})
fs.writeFile("chemistry.json", tpJSON, (error) => {
    // throwing the error
    // in case of a writing problem
    if (error) {
      // logging the error
      console.error(error);
  
      throw error;
    }
  
    console.log("data.json written correctly");
  });


/*formNewTP.addEventListener('submit', (event) => {
    // handle the form data
    console.log("hey i am submitted")
    formToSend.name = titreAdd.value
    formToSend.chemP = chemAdd.value
    formToSend.level = levelAdd.value
    formToSend.theme = themeAdd.value

    console.log(formToSend)
    event.preventDefault()

});*/


tpNameSelect.addEventListener("change", (event) => {
    nameOfChoosenTP = event.target.value
    createFilledForm(dataTP, nameOfChoosenTP)
  });


function createFilledForm(tableau,choosenTP){
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
        }
    }


}


function makeDropdown(tableau,menu){
    let option;   
    for (let i = 0; i < tableau.length; i++) {
      option = document.createElement('option');
      option.value = tableau[i].name;
      option.text = tableau[i].name;
      menu.appendChild(option);
    }
   }




async function makeListOfTp(tableau,whereToMakeList){

    let option;   
    for (let i = 0; i < tableau.length; i++) {
        
      option = document.createElement('option');
      option.value = tableau[i].name;
      option.text = tableau[i].name;  
      whereToMakeList.appendChild(option);
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

 



   
   
   
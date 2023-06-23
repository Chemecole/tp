

//divWhereDisplay = document.getElementById("displayFormOfSelectedTP")
tpNameSelect = document.getElementById("tpNameSelect")
//result =  document.querySelector(".resultSelectTP");
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
const apiUrl = 'https://chemecole.onrender.com/tp';

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

/*
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
*/

btnAddTP.addEventListener('click', function(e) {
    e.preventDefault();
  
    const formData = {
      name: titreAdd.value,
      chemP: addMultipleSelection(chemAdd),
      level: addMultipleSelection(niveauAdd),
      theme: themeAdd.value
    };

    const tpJSON = JSON.stringify(formData, null, 2);

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: tpJSON
  })
  .then(response => {
    if (response.ok) {
      console.log('Données ajoutées avec succès !');
      // Réinitialisez le formulaire ou effectuez toute autre action nécessaire
    } else {
      console.error('Une erreur s\'est produite lors de l\'ajout des données.');
    }
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de l\'envoi de la requête.', error);
  });
});

//const tpDELJSON = JSON.stringify(formData, null, 2);

btnDeleteTP.addEventListener('click', function(e) {
    e.preventDefault();
  
    const selectedIndex = tpNameSelect.selectedIndex; // Récupérer l'index de l'élément sélectionné dans le menu déroulant
  const tpId = selectedIndex - 1; // Ajouter 1 à l'index pour correspondre à l'ID dans la base de données

    const tpName = tpNameSelect.value; // Récupérer le nom du TP à supprimer
  console.log(tpName)
    fetch(`${apiUrl}/${tpId}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json'
      },
      body: tpJSON

      
      
    })
    
    .then(response => {
    console.log(response)
      if (response.ok) {
        console.log('TP supprimé avec succès !');
        // Effectuer toute autre action nécessaire après la suppression du TP
      } else {
        console.error('Une erreur s\'est produite lors de la suppression du TP.');
        return //added while watcihnf 
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de l\'envoi de la requête.', error);
    });
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
            /*elevePDF.value = tableau[i].elevePDF
            laboPDF.value = tableau[i].laboPDF
            responsePDF.value = tableau[i].responsePDF*/
        }
    }


}

//generated by chatGPT
function generateId(database) {
    const idPrefix = 'T';
    const idNumber = database.length + 1;
    const generatedId = idPrefix + idNumber;
    return generatedId;
  }
  
  function checkId(database, id) {
    return database.some(item => item.id === id);
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

 



   
   
   

//url pour la base de donnée qu'on utilise, en ligne
const apiUrl = 'https://chemecole.onrender.com/tp';
const localUrl = "./chemistry.json"


//bon ça c'est la référence HTML de toutes les parties du formulaire "ajouter un TP"
formNewTP = document.getElementById("formTP")
titreAdd = document.getElementById("titreTP_form")
titreAdd.setAttribute('required','ce champs etst obligatoire sacrebvley');
chemAdd = document.getElementById("chemForm")
niveauAdd = document.getElementById("niveau_form")
themeAdd = document.getElementById("theme_form")
elevePDFAdd = document.getElementById("elevePDF_form")
laboPDFAdd = document.getElementById("laboPDF_form")
reponsePDFAdd = document.getElementById("reponsePDF_form")
chemToSelectAdd = document.getElementById("chemForm")

showModify = document.getElementById("modifyTP")

buttonSubmit = document.getElementById("buttonSubmit")
buttonModify= document.getElementById("btnModifyTP")
buttonSectionModify = document.getElementById("sectionButtonModifyTP")
//ici c'est la référence HTML de toutes les parties du formulaire "modifier/supprimer un TP"
titreModify = document.getElementById("titreTP_formMODIFY")
niveauModify = document.getElementById("niveau_formMODIFY")
niveauActuelModify = document.getElementById("niveauActuel_formMODIFY")
themeModify = document.getElementById("theme_formMODIFY")
elevePDFModify = document.getElementById("elevePDF_formMODIFY")
laboPDFModify = document.getElementById("laboPDF_formMODIFY")
reponsePDFModify = document.getElementById("reponsePDF_formMODIFY")
//le idTP ne fait pas partie du formulaire. c'est un paragraphe invisible
// (bon, c'est pas spécialement secret, juste pas intéressant pour l'utilisateur )
//donc un paragraphe invisible dans lequel on met la valeur de l'id qui a été généré automatiquement lors de la méthode POST
//(lors de l'ajout de TPs)
idTP = document.getElementById("idTP_formMODIFY")
//tpNameSelect, dans la partie modifier/supprimer, c'est le menu déroulant depuis lequel tu choisis le nom du TP que tu veux changer
tpNameSelect= document.getElementById("tpNameSelect")




window.onload = async function() {
    //on récupére les données 
    loadFetch();   
    await new Promise(resolve => setTimeout(resolve,500));
    //on fait le menu déroulant des produits chimiques dans la partie ADD
    makeDropdown(dataProducts,chemToSelectAdd);
    //on fait le menu déroulant des produits chimiques dans la partie MODIFy
    // à faire
    //on fait le menu déroulant (par nom) des TPs disponibles. Fianlement j'ai décidé d'enlever ça et de le mettre dépendant d'un bouton
    };

//permet de retourner un tableau lorsque l'on sélectionne plusieurs valeurs.
//autrement ça renvoyait seulement la dernière valeur cliquée si je me souviens bien
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

buttonSectionModify.addEventListener('click',function(e){
    e.preventDefault()
    console.log("hello")

    if(showModify.style.visibility == "visible"){
        showModify.style.visibility="collapse"
    }
    else if(showModify.style.visibility=="collapse"){
        showModify.style.visibility="visible"
    }
    makeDropdown(dataTP, tpNameSelect)


});

//donc quand on clique sur "enregistrer" dans la partie ajouter un TP 
buttonSubmit.addEventListener('click', function(e) {
    e.preventDefault(); 
    console.log(elevePDFAdd)
    const formData = {
      //id: generateId(dataTP) <- pas besoin de ça car l'id est généré automatiquement
      name: titreAdd.value,
      chemP: addMultipleSelection(chemAdd),
      level: addMultipleSelection(niveauAdd),
      theme: themeAdd.value,
      tpEleve: elevePDFAdd.value,
      tpLabo:laboPDFAdd.value,
      tpReponse: reponsePDFAdd.value

    };

       //à faire, ajouter condition pour que tout doit etre remplie 
      //en faite, on va forcer seulement un des deux entre tp eleve et tp laborantin
    
      //à faire, gérer les pdfs de google drive chemecole
  
    //ici on convertit les réponses par l'utilisateur dans le formulaire ADD en format JSON
    const tpJSON = JSON.stringify(formData, null, 2);
    console.log(tpJSON)
    fetch(apiUrl, {
        method: 'POST',
        //les headers permettent de rajouter des informations sur le message (qu'on poste dans ce cas-là)
        headers: {
            //Accept : text/html pour dire qu'on accepte de l'html je crois
        'Content-Type': 'application/json'
        },
        //donc pas vraiment besoin d'un corps quand on fait un GET, mais quand on fait un POST, c'est le body qu'on envoie
        body: tpJSON // donc ici on envoie notre formulaire sous forme JSON
    })
    .then(response => {
        if (response.ok) {
        console.log('Données ajoutées avec succès !');
        //window.location.reload()
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

    const tpName = tpNameSelect.value; // Récupérer le nom du TP à supprimer
  console.log(tpName)
    fetch(`${apiUrl}/${idTP.innerHTML}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json'
      },
      //body: tpJSON
    
    })
    
    .then(response => {
    console.log(response)
      if (response.ok) {
        console.log('TP supprimé avec succès !');
        window.location.reload()
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
 

tpNameSelect.addEventListener("change", (event) => {
    nameOfChoosenTP = event.target.value
    createFilledForm(dataTP, nameOfChoosenTP)
  });



   
//cette fonction, permet de d'auto-remplir, une fois qu'on a choisit le nom du TP qu'on veut modifier, les données actuelles du TP
function createFilledForm(tableau,choosenTP){
    for (let i = 0; i < tableau.length; i++){
        if(tableau[i].name == choosenTP){
            titre.value = tableau[i].name
            niveau.value = tableau[i].level
            niveauActuel.innerHTML = tableau[i].level
            theme.value = tableau[i].theme
            idTP.innerHTML = tableau[i].id
            //à faire
            /*elevePDF.value = tableau[i].elevePDF
            laboPDF.value = tableau[i].laboPDF
            responsePDF.value = tableau[i].responsePDF*/
        }
    }


}


//aussi je sais pas pourquoi, mais c'est deux fonctions, makeDropdown et make List of TP, ça bugait si je mettais pas en fin de code
//bon ça je sais pas pourquoi je l'ai pas sur loadJSON mais si ça marche, on ne va pas se plaindre
//ça permet de faire de le menu déroulant des noms de produits chimiques
function makeDropdown(tableau,menu){
    let option;
    //pour éviter les doublons quand on rappuie plusieurs fois sur menu déroulant de modifier un TP
    menu.innerHTML=""   
    for (let i = 0; i < tableau.length; i++) {
      option = document.createElement('option');
      option.value = tableau[i].name;
      option.text = tableau[i].name;
      menu.appendChild(option);
    }
   }

   //et ça je sais pas pourquoi c'est async mais bon si ça marche, on ne va pas se plaindre
   //ça permet de faire le menu déroulant des noms de tps
/*async function makeListOfTp(tableau,whereToMakeList){
    let option;   
    whereToMakeList.innerHTML=""   
    for (let i = 0; i < tableau.length; i++) { 
      option = document.createElement('option');
      option.value = tableau[i].name;
      option.text = tableau[i].name;  
      whereToMakeList.appendChild(option);
    }
   }
  */ 
   
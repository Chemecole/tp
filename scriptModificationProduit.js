
//url pour la base de donnée qu'on utilise, en ligne
const apiUrl = 'https://chemecole.onrender.com/products';
const localUrl = "./chemistry.json"


//bon ça c'est la référence HTML de toutes les parties du formulaire "ajouter un TP"
formNewProduct = document.getElementById("formProduit")
nameAdd = document.getElementById("name_addProduct")
imgAdd = document.getElementById("img_addProduct")
locAdd = document.getElementById("loc_addProduct")
quantityAdd = document.getElementById("quantity_addProduct")

nameModify = document.getElementById("name_modifyProduct")
//imgModify = document.getElementById("loc_modifyProduct")
locModify = document.getElementById("loc_modifyProduct")
quantityModify = document.getElementById("quantity_modifyProduct")

chemToSelectAdd = document.getElementById("ProductNameSelect")

buttonSubmit = document.getElementById("buttonSubmitProduct")
buttonDelete = document.getElementById("btnDeleteProduct")


//ici c'est la référence HTML de toutes les parties du formulaire "modifier/supprimer un TP"

//le idTP ne fait pas partie du formulaire. c'est un paragraphe invisible
// (bon, c'est pas spécialement secret, juste pas intéressant pour l'utilisateur )
//donc un paragraphe invisible dans lequel on met la valeur de l'id qui a été généré automatiquement lors de la méthode POST
//(lors de l'ajout de TPs)
idModify = document.getElementById("id_modifyProduct")
//tpNameSelect, dans la partie modifier/supprimer, c'est le menu déroulant depuis lequel tu choisis le nom du TP que tu veux changer
productNameSelect= document.getElementById("ProductNameSelect")




window.onload = async function() {
    //on récupére les données 
    loadFetch();   
    await new Promise(resolve => setTimeout(resolve,500));
    //on fait le menu déroulant des produits chimiques dans la partie ADD
    makeDropdown(dataProducts,chemToSelectAdd);
    //on fait le menu déroulant des produits chimiques dans la partie MODIFy
    // à faire

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

//donc quand on clique sur "enregistrer" dans la partie ajouter un TP 
buttonSubmit.addEventListener('click', function(e) {
    e.preventDefault(); 
    const formData = {
      //id: generateId(dataTP) <- pas besoin de ça car l'id est généré automatiquement
      name: nameAdd.value ,
      //strpic: addMultipleSelection(niveauAdd),
      location: locAdd.value,
      quantity: quantityAdd.value
      //docLab, docPoint
      //à faire, ajouter condition pour que tout doit etre remplie

      //à faire, gérer les pdfs de google drive chemecole
    };
    //ici on convertit les réponses par l'utilisateur dans le formulaire ADD en format JSON
    const chemJSON = JSON.stringify(formData, null, 2);
    fetch(apiUrl, {
        method: 'POST',
        //les headers permettent de rajouter des informations sur le message (qu'on poste dans ce cas-là)
        headers: {
            //Accept : text/html pour dire qu'on accepte de l'html je crois
        'Content-Type': 'application/json'
        },
        //donc pas vraiment besoin d'un corps quand on fait un GET, mais quand on fait un POST, c'est le body qu'on envoie
        body: chemJSON // donc ici on envoie notre formulaire sous forme JSON
    })
    .then(response => {
        if (response.ok) {
        console.log('Données ajoutées avec succès !');
        } else {
        console.error('Une erreur s\'est produite lors de l\'ajout des données.');
        }
    })
    .catch(error => {
        console.error('Une erreur s\'est produite lors de l\'envoi de la requête.', error);
    });

    //window.location.reload()
});

//const tpDELJSON = JSON.stringify(formData, null, 2);

buttonDelete.addEventListener('click', function(e) {
    e.preventDefault();
  
    const chemName = productNameSelect.value; // Récupérer le nom du TP à supprimer
  console.log(chemName)
    fetch(`${apiUrl}/${idModify.innerHTML}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json'
      },
      //body: chemJSON

      
      
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
 

productNameSelect.addEventListener("change", (event) => {
    nameOfChoosenProduct = event.target.value
    createFilledFormProd(dataProducts, nameOfChoosenProduct)
  });



   
//cette fonction, permet de d'auto-remplir, une fois qu'on a choisit le nom du TP qu'on veut modifier, les données actuelles du TP
function createFilledFormProd(tableau,choosenProd){
    for (let i = 0; i < tableau.length; i++){
        if(tableau[i].name == choosenProd){
            nameModify.value = tableau[i].name
            locModify.value = tableau[i].location
            quantityModify.value =tableau[i].quantity
            idModify.innerHTML = tableau[i].id
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
    for (let i = 0; i < tableau.length; i++) {
      option = document.createElement('option');
      option.value = tableau[i].name;
      option.text = tableau[i].name;
      menu.appendChild(option);
    }
   }

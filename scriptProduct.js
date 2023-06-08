//let dropdown = document.getElementById('chemistryDropdown');
let selectedProductsSection = document.getElementById("selectedProducts");
let availableTP = document.getElementById("availableTP")
let availableCoolStuff = document.getElementById("availableCoolStuff")
let defaultOption = document.createElement('option');
let arrayUserInp = [];
let btnAddProduct = document.getElementById('btnAddProduct')



//const url ="https://chemecole.github.io/tp/chemistry.json"

//la place de load JSON avanjt la créationde loadJsons



  //once the first product has been chosen, it would be more efficient to make it can only
  //get reduced (because the more you add ingredients, the less choice of TPs)
  //but because of the "remove" button, i think it 
  //will be easier to forget about efficiency

  function actualizeTP(selectedProducts){
    availableTP.innerHTML = ""

    //the reason we have to wait  is that fetch is an async function, so the code continues without
    //the fetching being finished
    //maybe that would be an argument in favor of doing everything inside
    // the fetch function?
    //Look up : fetch 
    if(selectedProducts.length>0){
    for(countTP =0; countTP < dataTP.length; countTP++){
      //so tp[countTP] is one of the experiment of the tp database

      let allProductsAreIn = true // for each TP we check that
      for(countProducts = 0; countProducts < selectedProducts.length; countProducts++){
        //so selectedProducts[countProducts] is one of the products inputed by user


        let productIsIn =false
        let iInExperiment = 0

        //so tp[countTP].chemP[iInExperiment] is one of the ingredient required for this specific tp
        while(productIsIn === false && iInExperiment < dataTP[countTP].chemP.length){
          if(dataTP[countTP].chemP[iInExperiment] === selectedProducts[countProducts]){
            productIsIn = true
          }
  

          iInExperiment += 1
        }

        if(productIsIn ===false){
          allProductsAreIn = false
        }

      }

      //here we do the if allProductsAreIn is true stuff
      if(allProductsAreIn){
        availableTP.innerHTML += '<h3>' + dataTP[countTP].name +'</h3> <p> ingredients : ' + dataTP[countTP].chemP + '</p>'
      }
    }
  }
}



function actualizeCoolStuff(selectedProducts){
   availableCoolStuff.innerHTML = ""

  //the reason we have to wait  is that fetch is an async function, so the code continues without
  //the fetching being finished
  //maybe that would be an argument in favor of doing everything inside
  // the fetch function?
  //Look up : fetch 
  if(selectedProducts.length>0){
    //should be COUNTCOOL BROO BUT to lazy to change the countTP (it's basically an i ++ thing right)
  for(countTP =0; countTP < dataCool.length; countTP++){
    //so tp[countTP] is one of the experiment of the tp database
//or here rather dataCool[countTP] is one of the fun fact of the cool stuff database
    let allProductsAreIn = true // for each TP we check that
    for(countProducts = 0; countProducts < selectedProducts.length; countProducts++){
      //so selectedProducts[countProducts] is one of the products inputed by user


      let productIsIn =false
      let iInExperiment = 0
      //so tp[countTP].chemP[iInExperiment] is one of the ingredient required for this specific tp
      while(productIsIn === false && iInExperiment < dataCool[countTP].chemP.length){
        if(dataCool[countTP].chemP[iInExperiment] === selectedProducts[countProducts]){
          productIsIn = true
        }


        iInExperiment += 1
      }

      if(productIsIn ===false){
        allProductsAreIn = false
      }

    }

    //here we do the if allProductsAreIn is true stuff
    if(allProductsAreIn){
      availableCoolStuff.innerHTML += '<h3>' + dataCool[countTP].name +'</h3> <p> ingredients : ' + dataCool[countTP].chemP + '</p>'
    }
  }
}
}


function canBeAddedToList(arrayUserInp,userInp){
  let dejaSelected = false
  let containedInData = false
  for(i=0; i < arrayUserInp.length; i++){
    if(arrayUserInp[i]===userInp){
      alert('ce produit chimique est déjà selectionné')
      dejaSelected = true
    }
  }
  for(i=0; i< dataProducts.length;i++){
      if(dataProducts[i].name === userInp){
          containedInData = true
      }

  }

  if(containedInData === false){

    alert("désolé ce produit n'est pas présent dans la liste de produits disponibles. Peut-être c'est présent sous un autre nom !")
  }
  let canBeAddedToList = false
  if(dejaSelected === false && containedInData === true){
      canBeAddedToList = true
  }
  return canBeAddedToList
}


function addProduct(arrayUserInp, userInp){
  if(canBeAddedToList(arrayUserInp, userInp)=== true){
    arrayUserInp.push(userInp)
  }
return arrayUserInp
}


async function actualizeProducts(arrayUserInp){
  //dataProducts = recoverDataProducts()
  selectedProductsSection.innerHTML=""
  //await new Promise(resolve => setTimeout(resolve, 200));

  for(i=0; i<arrayUserInp.length;i++){
    
    let i2=0
    let found= false
    while(i2 < dataProducts.length && found === false){
      if(dataProducts[i2].name == arrayUserInp[i]){
      found=true
      selectedProductsSection.innerHTML+='<div class = "oneSelectedProduct"><button class="btn-remove" onclick="btnClickedRemove(this)"></button><img src="source/images/chemicals/' + dataProducts[i2].strpic + ' " width="200px" ><h5>' + dataProducts[i2].name + '</h5><p>Emplacement : ' + dataProducts[i2].location + '</br> Quantité : '+ dataProducts[i2].quantity + '</p> </div>'
    }
    i2++
  }

  
  }

}
  //check tutorials about arrows functions
btnAddProduct.addEventListener('click',e => {
  let userInp = document.getElementById("chemistryDropdown").value.toLowerCase()
  arrayUserInp = addProduct(arrayUserInp,userInp)
  //document.getElementById("input").name =""
  actualizeTP(arrayUserInp)
  actualizeProducts(arrayUserInp)
  actualizeCoolStuff(arrayUserInp)
})


//btnRemoveProduct.addEventListener('click',e =>{
  //var buttonClicked = event.target
  //buttonClicked.parentElement.remove()
//})


function btnClickedRemove(get){
  var buttonClicked = event.target
  var str = buttonClicked.parentElement.innerHTML
  var mySubString = str.substring(
    str.indexOf("<h5>") + 4, 
    str.lastIndexOf("</h5>") 
);
arrayUserInp = arrayUserInp.filter(e => e != mySubString);
actualizeProducts(arrayUserInp)
actualizeTP(arrayUserInp)
actualizeCoolStuff(arrayUserInp)
//buttonClicked.parentElement.remove()
  
}


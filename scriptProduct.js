let dropdown = document.getElementById('chemistryDropdown');
let selectedProductsSection = document.getElementById("selectedProducts");
let availableTP = document.getElementById("availableTP")
let availableCoolStuff = document.getElementById("availableCoolStuff")
let defaultOption = document.createElement('option');
let arrayUserInp = [];
let btnAddProduct = document.getElementById('btnAddProduct')

dropdown.selectedIndex = 0;

const url ="https://chemecole.github.io/tp/chemistry.json"

class Product {
  constructor(id, name, strpic, location, quantity)
 {
    this.id = id;
    this.name = name;
    this.strpic = strpic;
    this.location = location;
    this.quantity = quantity;
  }

}

class Experiment{
  constructor(id, name, chemP, instructions, subject, level, source, theme){
    this.id =id;
    this.name = name;
    this.chemP = chemP;
    this.instructions = instructions;
    this.subject = subject;
    this.level = level;
    this.source = source;
    this.theme = theme;
  }
}
class CoolStuff{
  constructor(id, name, imageOrVideo, chemP, subject, level, source, theme ){
    this.id =id;
    this.name = name;
    this.imageOrVideo = imageOrVideo;
    this.chemP = chemP;
    this.subject = subject;
    this.level = level;
    this.source = source;
    this.theme = theme;
  }

}

let tp
let data
let dataCool

window.onload = async function() {
  
tp = recoverDataTP()
data = recoverDataProducts()
dataCool = recoverDataCoolStuff()
await new Promise(resolve => setTimeout(resolve, 3000));
};
let dataProducts = []
let dataTP = []

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Accédez à la catégorie "products"
    const products = data.products;
    console.log("Category: products");
    products.forEach(product => {
      const productId = product.id;
      const productName = product.name;
      const productStrpic = product.strpic;
      const productLocation = product.location;
      const productQuantity = product.quantity;
      prod = new Product(productId, productName, productStrpic, productLocation, productQuantity)
      dataProducts.append(prod)
      console.log("Product: " + productName);
      console.log("Image: " + productStrpic);
      console.log("Location: " + productLocation);
      console.log("Quantity: " + productQuantity);
    });

    // Accédez à la catégorie "tp"
    
    const tp = data.tp;
    console.log("Category: tp");
    tp.forEach(tpItem => {
      const tpId = tpItem.id;
      const tpName = tpItem.name;
      const tpChemP = tpItem.chemP;
      const tpInstructions = tpItem.instructions;
      const tpSubject = tpItem.subject;
      const tpLevel = tpItem.level;
      const tpSource = tpItem.source;
      const tpTheme = tpItem.theme;

      experiment = new Experiment(tpId,tpName,tpChemP,tpInstructions,tpSubject,tpLevel,tpSource,tpTheme)
      dataTP.append(experiment)
      console.log("TP Name: " + tpName);
      console.log("Chemical Properties: " + tpChemP);
      console.log("Instructions: " + tpInstructions);
    });

    // Accédez à la catégorie "cool"
    const cool = data.cool;
    console.log("Category: cool");
    cool.forEach(coolItem => {
      const coolId = coolItem.id;
      const coolName = coolItem.name;
      const coolImageOrVideo = coolItem.imageOrVideo;
      console.log("Cool Item ID: " + coolId);
      console.log("Cool Item Name: " + coolName);
      console.log("Image/Video: " + coolImageOrVideo);
    });
  })
  .catch(error => {
    // Gérez les erreurs ici
    console.error(error);
  });



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
    for(countTP =0; countTP < tp.length; countTP++){
      //so tp[countTP] is one of the experiment of the tp database

      let allProductsAreIn = true // for each TP we check that
      for(countProducts = 0; countProducts < selectedProducts.length; countProducts++){
        //so selectedProducts[countProducts] is one of the products inputed by user


        let productIsIn =false
        let iInExperiment = 0

        //so tp[countTP].chemP[iInExperiment] is one of the ingredient required for this specific tp
        while(productIsIn === false && iInExperiment < tp[countTP].chemP.length){
          if(tp[countTP].chemP[iInExperiment] === selectedProducts[countProducts]){
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
        availableTP.innerHTML += '<h3>' + tp[countTP].name +'</h3> <p> ingredients : ' + tp[countTP].chemP + '</p>'
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



function addProduct(arrayUserInp, userInp){
  if(isValable(arrayUserInp, userInp)=== true){
    arrayUserInp.push(userInp)
  }
return arrayUserInp
}


async function actualizeProducts(arrayUserInp){
  //data = recoverDataProducts()
  selectedProductsSection.innerHTML=""
  //await new Promise(resolve => setTimeout(resolve, 200));

  for(i=0; i<arrayUserInp.length;i++){
    
    let i2=0
    let found= false
    while(i2 < data.length && found === false){
      if(data[i2].name == arrayUserInp[i]){
      found=true
      selectedProductsSection.innerHTML+='<div class = "oneSelectedProduct"><button class="btn-remove" onclick="btnClickedRemove(this)"></button><img src="source/images/chemicals/' + data[i2].strpic + ' " width="200px" ><h5>' + data[i2].name + '</h5><p>Emplacement : ' + data[i2].location + '</br> Quantité : '+ data[i2].quantity + '</p> </div>'
    }
    i2++
  }

  
  }

}
  //check tutorials about arrows functions
btnAddProduct.addEventListener('click',e => {
  let userInp = document.getElementById("input").value.toLowerCase()
  arrayUserInp = addProduct(arrayUserInp,userInp)
  document.getElementById("input").value =""
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


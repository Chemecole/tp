window.dataTP
window.dataProducts
dataTP = []
dataProducts = []
//export {dataTP}

const url ="https://chemecole.github.io/tp/chemistry.json"

dropdown = document.getElementById('chemistryDropdown');
dropdown.selectedIndex = 0;

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


window.onload = async function() {
  
    //tp = recoverDataTP()
    //dataProducts = recoverDataProducts()
    //dataCool = recoverDataCoolStuff()
    await new Promise(resolve => setTimeout(resolve, 1000));
    //loadFetch();
    makeDropdown();
    };
 
    
  function loadFetch(){

  console.log("hrllo")
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Accédez à la catégorie "products"
        const products = data.products;
        //console.log("Category: products");
        products.forEach(product => {
          const productId = product.id;
          const productName = product.name;
          const productStrpic = product.strpic;
          const productLocation = product.location;
          const productQuantity = product.quantity;
          prod = new Product(productId, productName, productStrpic, productLocation, productQuantity)
          dataProducts.push(prod)
          //console.log(dataProducts)
        
        });
    
        // Accédez à la catégorie "tp"
        
        const tp = data.tp;
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
          dataTP.push(experiment)
      
        });
    
        // Accédez à la catégorie "cool"
        const cool = data.cool;
        cool.forEach(coolItem => {
          const coolId = coolItem.id;
          const coolName = coolItem.name;
          const coolImageOrVideo = coolItem.imageOrVideo;
          
          
        });
      })
      .catch(error => {
        // Gérez les erreurs ici
        console.error(error);
      });
    }

 console.log("yoo dataTP", dataTP)
 function makeDropdown(){
  let option;     
  for (let i = 0; i < dataProducts.length; i++) {
    option = document.createElement('option');
    option.value = dataProducts[i].name;
    option.text = dataProducts[i].name;
    dropdown.appendChild(option);
    //console.log(i)
  }
 }

 //export {dataTP}
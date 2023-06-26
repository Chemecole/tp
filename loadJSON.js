window.dataTP
window.dataProducts
dataTP = []
dataProducts = []

//const url ="https://chemecole.github.io/tp/chemistry.json"
const urlProduct = "https://chemecole.onrender.com/products"
const urlTP = "https://chemecole.onrender.com/tp"

//this page is only to put in arrays the data from json
//keep your makeDropdown on others scripts!!!!

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
    constructor(id, name, chemP, subject, level,theme,tpEleve,tpLabo,tpReponse){
      this.id =id;
      this.name = name;
      this.chemP = chemP;
      this.subject = subject;
      this.level = level;
      this.theme = theme;
      this.tpEleve= tpEleve;
      this.tpLabo = tpLabo;
      this.tpReponse = tpReponse;
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

async function  loadFetch(){
let promiseP = fetch(urlProduct)
promiseP.then(response => response.json())
  .then(json => {
    console.log(json);
    const products = json;
        products.forEach(product => {
          const productId = product.id;
          const productName = product.name;
          const productStrpic = product.strpic;
          const productLocation = product.location;
          const productQuantity = product.quantity;
          prod = new Product(productId, productName, productStrpic, productLocation, productQuantity)
          dataProducts.push(prod)
     
        });
  }
  )
  promiseP.catch((err) => console.log(err));

//possiblement rajouter un await et un throw error devant le fetch?
//bon si jamais y'a un bug, là ça marche sans
  let promiseT = fetch(urlTP)
  promiseT.then(response => response.json())
  .then(json => {
    console.log("hello");
    const tp = json;
    tp.forEach(tpItem => {
      tpId = tpItem.id;
      tpName = tpItem.name;
      tpChemP = tpItem.chemP;
      //const tpInstructions = tpItem.instructions;
      tpSubject = tpItem.subject;
      tpLevel = tpItem.level;
      //const tpSource = tpItem.source;
      tpTheme = tpItem.theme;
      tpEleve= tpItem.tpEleve;
      tpLabo = tpItem.tpLabo;
      tpReponse = tpItem.tpReponse;
      experiment = new Experiment(tpId,tpName,tpChemP,tpSubject,tpLevel,tpTheme,tpEleve,tpLabo,tpReponse)
      dataTP.push(experiment)
     
        });
  }
  )
  promiseT.catch((err) => console.log(err));


}

/*
async function  loadFetch(){
  let responseProd = await fetch(urlProduct)
  let jsonProd = await responseProd.json()
  let responseTP = await fetch(urlTP)
  let jsonTP = await responseTP.json()
  data = [jsonProd,jsonTP]
  return data

}*



/*async function  loadFetch(){
    fetch(url)
      //.then(response => response.json())

      .then( async (response) => {
        let data = await response.json()
  
      //.then(data => {
        // Accédez à la catégorie "products"
        const products = data.products;
        products.forEach(product => {
          const productId = product.id;
          const productName = product.name;
          const productStrpic = product.strpic;
          const productLocation = product.location;
          const productQuantity = product.quantity;
          prod = new Product(productId, productName, productStrpic, productLocation, productQuantity)
          dataProducts.push(prod)
     
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
*/
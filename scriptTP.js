const url ="https://chemecole.github.io/tp/chemistry.json"


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


    let dataTP = [];
    let dataProducts = [];

    window.onload = async function() {
      
        //tp = recoverDataTP()
        //data = recoverDataProducts()
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        };

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
            dataProducts.push(prod)
          
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
            dataTP.push(experiment)
        
          });
      
          // Accédez à la catégorie "cool"
          const cool = data.cool;
          console.log("Category: cool");
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
      

        function change() {
          //on récupere à chaque click l'ensemble des coches qui sont clickés
          //Cbs c'est l'ensemble des trusc à cocher dans une ligne (une classe)
            var subjectCbs = document.querySelectorAll(".subject input[type='checkbox']");
            var levelCbs = document.querySelectorAll(".level input[type='checkbox']");
            var sourceCbs = document.querySelectorAll(".source input[type='checkbox']");
            var themeCbs = document.querySelectorAll(".theme input[type='checkbox']");
           

            //ici ça nous permet de récupérer pour chaque classe séparée ce qui est coché
            var filters = {
              subjectF: getClassOfCheckedCheckboxes(subjectCbs),
              levelF: getClassOfCheckedCheckboxes(levelCbs),
              sourceF: getClassOfCheckedCheckboxes(sourceCbs),
              themeF: getClassOfCheckedCheckboxes(themeCbs)
            };
            
            filterResults(filters);

          }
          
          //cette fonction vérifie à quelle classe appartient la checkbox et que il y en a qui sont cochées et elle retourne
          //une listes du nom des niveaux cochés (par exemple, [Physique, Chimie])
          function getClassOfCheckedCheckboxes(checkboxes) {
            var classes = [];
          
            if (checkboxes && checkboxes.length > 0) {
              for (var i = 0; i < checkboxes.length; i++) {
                var cb = checkboxes[i];
          
                if (cb.checked) {
                  classes.push(cb.getAttribute("rel"));
                }
              }
            }
            
            return classes;
          }
          
          var hiddenElems = [];
          //donc ici lineOfCheckbox, ca fait reference par exemple ) Phtysique, Chimie, SVY
          //lineTitle fait référence à Matière, Niveau, Source (-un des 4...)
          function hideOrShow(lineOfCheckbox, lineTitle)
          {
              for (var i = 0; i < dataTP.length; i++) 
              {
                var experiment = dataTP[i];
            
                if (lineOfCheckbox.length > 0) 
                {
                  var isHidden = true;
            
                  for (var j = 0; j < lineOfCheckbox.length; j++)
                  {
                    //filter here is a singular name, like chimie, 6ème,... i think
                    var filter = lineOfCheckbox[j];
                    switch(lineTitle)
                    {
                      case "subject":
                        if (experiment.subject.includes(filter)) {
                          isHidden = false;                      
                        }
                      break;
                      case "level":
                        if (experiment.level.includes(filter)) {
                          isHidden = false;  
                        }
                      break;
                      case "source":
                        if (experiment.source.includes(filter)) {
                          isHidden = false;
                        }
                      break;
                      case "theme":
                        if (experiment.theme.includes(filter)) {
                          isHidden = false;
                        }
                      break;
                    }
            
                    if (isHidden) 
                    {
                      hiddenElems.push(experiment);
                    }
                  }
              }
            }
          }
              
          
        
          

          function filterResults(filters) {
            //au début, tous les éléments sont cachés.
            //

            //var rElems = document.querySelectorAll(".result div");
            
            hiddenElems = []
            hideOrShow(filters.subjectF, "subject");
            hideOrShow(filters.levelF, "level");
            hideOrShow(filters.sourceF, "source");
            hideOrShow(filters.themeF, "theme");

            /*
            for (var i = 0; i < dataTP.length; i++) {
              var experiment = dataTP[i];
              ///console.log("/n /n this experiment is"+tp[i].name)
              
              if (filters.subjectF.length > 0) {
                var isHidden = true;
          
                for (var j = 0; j < filters.subjectF.length; j++) {
                  var filter = filters.subjectF[j];
                  if (experiment.subject.includes(filter)) {
                    isHidden = false;
                    break;
                  }
                
                }
          
                if (isHidden) {
                  hiddenElems.push(experiment);
                }
              }
      
             if (filters.levelF.length > 0) {
                var isHidden = true;
          
                for (var j = 0; j < filters.levelF.length; j++) {
                  var filter = filters.levelF[j];
          
                  if (experiment.level.includes(filter)) {
                    isHidden = false;
                    break;
                  }
                }
          
                if (isHidden) {
                  hiddenElems.push(experiment);
                }
              }

              
             if (filters.sourceF.length > 0) {
              var isHidden = true;
        
              for (var k = 0; k < filters.sourceF.length; k++) {
                var filter = filters.sourceF[k];
        
                if (experiment.source.includes(filter)) {
                  isHidden = false;
                  break;
                }
              }
        
              if (isHidden) {
                hiddenElems.push(experiment);
              }
            }

            
            if (filters.themeF.length > 0) {
              var isHidden = true;
        
              for (var l = 0; l < filters.themeF.length; l++) {
                var filter = filters.themeF[l];
        
                if (experiment.level.includes(filter)) {
                  isHidden = false;
                  break;
                }
              }
        
              if (isHidden) {
                hiddenElems.push(experiment);
              }
            }
            }
            */
            
            for (var i = 0; i < dataTP.length; i++) {
            if(filters.subjectF =='' && filters.levelF == '' && filters.sourceF == '' && filters.themeF ==''){
              document.getElementById("result").innerHTML=" "
            }
            else{

              if(document.getElementById(dataTP[i].id) === null){
              
                let tpHTML = transformInHTML(dataTP[i])
                document.getElementById("result").appendChild(tpHTML)
                            
                }
                else{
                  tpToShow =  document.getElementById(dataTP[i].id)
                  tpToShow.style.display = "inline-block";
                  tpToShow.parentElement.style.display="inline-block";
                }

            }
            
            }
          
            if (hiddenElems.length <= 0) {
              return;
            }
            else{
            for (var i3 = 0; i3 < hiddenElems.length; i3++) {
              expToHide =document.getElementById(hiddenElems[i3].id)
              expToHide.style.display = "none";
              expToHide.parentElement.style.display = "none";
              

            }}
          }


          function transformInHTML(exp){
            
            divElement = document.createElement("div")
            divElement.className = "oneTP";
            divElement.innerHTML ='<div id="'+exp.id+'"><div class="expHeader"><h4>' + exp.name + '</h4></div><ul><li>Niveau: ' + exp.level + '</li><div class="tooltip-container"><li onmouseover="showLocation(this)" onmouseleave="hideLocation(this)">'+exp.chemP+'</li></div><a href="#" onclick="openPDF(this)" class="popup"><li>PDF Laborantin</li></a><li>PDF Élève</li></ul></div>'
            return divElement
          }

          function showLocation(e){

            let oneTPchemP = e.textContent.split(","); 
            //console.log(e)
            var tooltip= document.createElement('div')
            tooltip.id="tooltip-text"
            for(i=0; i<oneTPchemP.length;i++){
              for(i2=0;i2<dataProducts.length;i2++){
                if(oneTPchemP[i] == dataProducts[i2].name){
                  tooltip.innerHTML += dataProducts[i2].name +": " +dataProducts[i2].location +"</br>"
                  
                }
              }
            }
            e.after(tooltip)
          }

          function hideLocation(e){
            document.getElementById("tooltip-text").remove()
          }

          function openPDF(e){
            window.open('C:\\Users\\Progranma\\Downloads\\javascriptImages\\'+e.parentElement.parentElement.id +'.pdf', '_blank'); 
            return false;
          }
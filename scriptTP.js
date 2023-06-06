const url ="https://chemecole.github.io/tp/chemistry.json/products"
const urlTP ="https://chemecole.github.io/tp/chemistry.json/tp"


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

function recoverDataTP(){

    let dataTP = []
    fetch(urlTP)  
    .then(  
    function(response) {  
        if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
            response.status);  
        return;  
        }
        response.json().then(function(data) {  
        
        for(i=0; i<data.length; i++){
       
            let exp = new Experiment(data[i].id, data[i].name,data[i].chemP,data[i].instructions,data[i].subject,data[i].level,data[i].source,data[i].theme);
            dataTP.push(exp);
        }
    });  
    }
    )  
    .catch(function(err) {  
    console.error('Fetch Error -', err);  
    });

    return dataTP;

    }
    
    function recoverDataProducts (){

      let dataProducts = []
      fetch(url)  
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          console.warn('Looks like there was a problem. Status Code: ' + 
            response.status);  
          return;  
        }
        response.json().then(function(data) {  
          
          for(i=0; i<data.length; i++){
            let Prod = new Product(data[i].id, data[i].name,data[i].strpic, data[i].location, data[i].quantity);
            dataProducts.push(Prod);
          }
   });  
      }
    )  
    .catch(function(err) {  
      console.error('Fetch Error -', err);  
    });
  
    return dataProducts;
    }
  
  
   

    let tp
    let data

    window.onload = async function() {
      
        tp = recoverDataTP()
        data = recoverDataProducts()
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        };

        function change() {
            var subjectCbs = document.querySelectorAll(".subject input[type='checkbox']");
            var levelCbs = document.querySelectorAll(".level input[type='checkbox']");
            var sourceCbs = document.querySelectorAll(".source input[type='checkbox']");
            var themeCbs = document.querySelectorAll(".theme input[type='checkbox']");
           

            
            var filters = {
              subjectF: getClassOfCheckedCheckboxes(subjectCbs),
              levelF: getClassOfCheckedCheckboxes(levelCbs),
              sourceF: getClassOfCheckedCheckboxes(sourceCbs),
              themeF: getClassOfCheckedCheckboxes(themeCbs)
            };
            filterResults(filters);
          }
          
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
          
          function filterResults(filters) {
            
            //var rElems = document.querySelectorAll(".result div");
            var hiddenElems = [];
            for (var i = 0; i < tp.length; i++) {
              var experiment = tp[i];
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
            
            
            for (var i = 0; i < tp.length; i++) {
            if(filters.subjectF =='' && filters.levelF == '' && filters.sourceF == '' && filters.themeF ==''){
              document.getElementById("result").innerHTML=" "
            }
            else{

              if(document.getElementById(tp[i].id) === null){
              
                let tpHTML = transformInHTML(tp[i])
                document.getElementById("result").appendChild(tpHTML)
                            
                }
                else{
                  tpToShow =  document.getElementById(tp[i].id)
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
              for(i2=0;i2<data.length;i2++){
                if(oneTPchemP[i] == data[i2].name){
                  tooltip.innerHTML += data[i2].name +": " +data[i2].location +"</br>"
                  
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
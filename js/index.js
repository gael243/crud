
const manipulateurForm=new ManipulateurForm();

let addbutton=document.querySelector("#save");
let tbody=document.querySelector("tbody"); 

afficherTable();

/**
  * enregistrement des valeurs
  */
 
 addbutton.addEventListener('click',(e) => {
    if(!manipulateurForm.getNom().length){
        let errornom= document.querySelector("#errornom");
        errornom.textContent="ce champs ne doit pas etre vide";
     }
     if(!manipulateurForm.getPrenom().length){
        let errorprenom= document.querySelector("#errorprenom");
        errorprenom.textContent="ce champs ne doit pas etre vide";
     }
     if(!manipulateurForm.getPhone().length){
        let errorphone= document.querySelector("#errorphone");
        errorphone.textContent="ce champs ne doit pas etre vide";
     }
    else if(manipulateurForm.getNom().length || manipulateurForm.getPrenom().length ||  manipulateurForm.getPhone().length ){
        if(manipulateurForm.getMarierOui()){
            axios.post('http://167.71.45.243:4000/api/employes?api_key=urrzckb',{
                numeroTelephone:manipulateurForm.getPhone(),    
                nom:manipulateurForm.getNom(),
                prenom:manipulateurForm.getPrenom(),
                estMarie:manipulateurForm.getMarierOui(),
                pays:manipulateurForm.getPays(),
                email:manipulateurForm.getEmail(),
                poste:manipulateurForm.getPoste()
               })
                .then((response)=>{
                    afficherTable();
                    console.log(response);
                }).catch((err)=>{
                    console.log(err.response.data)
                })
        }else{
            axios.post('http://167.71.45.243:4000/api/employes?api_key=urrzckb',{
                numeroTelephone:manipulateurForm.getPhone(),    
                nom:manipulateurForm.getNom(),
                prenom:manipulateurForm.getPrenom(),
                estMarie:manipulateurForm.getMarierNon(),
                pays:manipulateurForm.getPays(),
                email:manipulateurForm.getEmail(),
                poste:manipulateurForm.getPoste()
               })
                .then((response)=>{
                    afficherTable();
                    console.log(response);
                }).catch((err)=>{
                    console.log(err.response.data)
                })
        }

   manipulateurForm.initializeInput();
    }
   },false);

/**
 * 
 * @param {*}employers
 * @returns {void}
 */
 function afficherTable(){
     ClearTable();

axios.get('http://167.71.45.243:4000/api/employes?api_key=urrzckb')
.then((employers)=>{
    for(let employer of employers.data){

        let tr= document.createElement("tr");
        tr.setAttribute("id",employer._id);   
        let tdNom=document.createElement("td");
        tdNom.textContent=employer.nom;
        let tdPrenom=document.createElement("td");
        tdPrenom.textContent=employer.prenom;
        let tdEstmaries=document.createElement("td");
        tdEstmaries.textContent=employer.estMarie;
        let tdPays=document.createElement("td");
        tdPays.textContent=employer.pays;
        let tdEmail=document.createElement("td");
        tdEmail.textContent=employer.email;
        let tdPoste=document.createElement("td");
        tdPoste.textContent=employer.poste;
        let tdTelephone=document.createElement("td");
        tdTelephone.textContent=employer.numeroTelephone;  
    
        let buttonmodifier=document.createElement("button");
        buttonmodifier.setAttribute("type","button");
        buttonmodifier.setAttribute("class","btn btn-primary");
        buttonmodifier.setAttribute("data-target",employer._id);
        buttonmodifier.addEventListener('click',onUpdate);
        buttonmodifier.textContent="modifier";
        let tdModifier=document.createElement("td").appendChild(buttonmodifier);
        
        let buttondelete=document.createElement("button");
        buttondelete.setAttribute("type","button");
        buttondelete.setAttribute("class","btn btn-danger");
        buttondelete.setAttribute("data-target",employer._id);
        buttondelete.setAttribute("id",employer._id);
        buttondelete.textContent="supprimer";
        buttondelete.addEventListener('click',(e)=>{    
        const message=confirm("etes-vous sure de vouloir supprimer");
            if(message){
          axios.delete(`http://167.71.45.243:4000/api/employes/${employer._id}?api_key=urrzckb`)
                .then(function(reponse){
                    afficherTable();
                }).catch(function(erreur){
                    console.log(erreur.response)
                })
            }else{
                return;
            }
        })
        let tdDelete=document.createElement("td").appendChild(buttondelete);
        tr.appendChild(tdNom);
        tr.appendChild(tdPrenom);
        tr.appendChild(tdEstmaries);
        tr.appendChild(tdPays);
        tr.appendChild(tdEmail);
        tr.appendChild(tdPoste);
        tr.appendChild(tdTelephone); 
        tr.appendChild(tdModifier);
        tr.appendChild(tdDelete);
        tbody.appendChild(tr);
    }

}).catch((err)=>{
    console.log(err);
})
}
 /**
  * 
  *  @returns {void}
  */
 function ClearTable(){
    tbody.textContent="";
    let errornom= document.querySelector("#errornom");
    errornom.textContent="";
    let errorprenom= document.querySelector("#errorprenom");
    errorprenom.textContent="";
    let erroremail= document.querySelector("#erroremail");
    erroremail.textContent="";
    let errorphone= document.querySelector("#errorphone");
    errorphone.textContent="";
    let buttonUpdate=document.querySelector("#update");
    buttonUpdate.style.display="none";
    manipulateurForm.id.style.display="none";
 }


 /**
  * 
  * fill my inputs
  *  @param {e}
  * 
  */
  function onUpdate(e){
      let buttonsave=document.querySelector("#save");
      buttonsave.style.display="none";
      let buttonupdate=document.querySelector("#update");
      buttonupdate.style.display="inherit";
      manipulateurForm.id.style.display="inherit";
      manipulateurForm.makeIdReadOnly();
      let ids=e.target.dataset.target;
      axios.get(`http://167.71.45.243:4000/api/employes/${ids}?api_key=urrzckb`)
      .then(function(response){
        manipulateurForm.setId(response.data._id);
        manipulateurForm.setNom(response.data.nom);
        manipulateurForm.setPrenom(response.data.prenom);
        manipulateurForm.setMarierOui(response.data.estMarie)
        manipulateurForm.appendPost(response.data.poste);
        manipulateurForm.setPhone(response.data.numeroTelephone);
        manipulateurForm.setEmail(response.data.email);
        manipulateurForm.setPays(response.data.pays);
      })
      .catch(function(err){
          console.log(err.response)
      })

  }
  /**
   * 
   * update my table  
   *  
   */
  let buttonupdatedata=document.querySelector("#update");
  let buttonsave=document.querySelector("#save");
  buttonupdatedata.addEventListener('click',(e)=>{
      let index= employer.findIndex(employers => employers.id === manipulateurForm.getId());
       employer.splice(index,1,{
           id:manipulateurForm.getId(),
           nom:manipulateurForm.getNom(),
           prenom:manipulateurForm.getPrenom(),
           email:manipulateurForm.getEmail(),
           age:manipulateurForm.getAge(),
           poste:manipulateurForm.getAge(),
           telephone:manipulateurForm.getPhone(),
           status:manipulateurForm.getStatus(),
           pays:manipulateurForm.getStatus()
       })
       afficherTable(employer);
       buttonupdatedata.style.display="none";
       buttonsave.style.display="inherit";
       manipulateurForm.removeReadOnlyConstraint();
       manipulateurForm.initializeInput();
  })

/**
 * @constructor
 */
 function ManipulateurForm(){
     this.id=document.querySelector("#id");
     this.nom=document.querySelector("#nom");
     this.prenom=document.querySelector("#prenom");
     this.email=document.querySelector("#email");
     this.poste=document.querySelector("#poste");
     this.phone=document.querySelector("#phone");
     this.pays=document.querySelector("#pays");
     this.marieroui=document.querySelector("#oui");
     this.mariernon=document.querySelector("#non")
 }
 /**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getId=function(){
    return this.id.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setId=function(value){
    this.id.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getNom=function(){
    return this.nom.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setNom=function(value){
    this.nom.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getPrenom=function(){
    return this.prenom.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setPrenom=function(value){
    this.prenom.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getEmail=function(){
    return this.email.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setEmail=function(value){
    this.email.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getMarierOui=function(){
    return this.marieroui.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setMarierOui=function(value){
    this.marieroui.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getMarierNon=function(){
    return this.mariernon.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setMarierNon=function(value){
    this.mariernon.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getPoste=function(){
    return this.poste.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setPoste=function(value){
    this.poste.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getPhone=function(){
    return this.phone.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setPhone=function(value){
    this.phone.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getPays=function(){
    return this.pays.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setPays=function(value){
    this.pays.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.appendPost=function(poste){
     let option=document.createElement('option');
     option.value=poste;
     option.textContent=poste;
     document.querySelector("#poste").append(option);  
}

/**
 *  @param {void}
 *  @returns {}
 */
ManipulateurForm.prototype.initializeInput=function(){
    this.setId('');
    this.setNom('');
    this.setPrenom('');
    this.setEmail('');
    this.setMarierOui('');
    this.setMarierNon('');
    this.setPhone('');
}
/**
 * @param {void}
 * @return {}
 */
ManipulateurForm.prototype.makeIdReadOnly = function() {
    this.id.setAttribute('readOnly', 'true');
}
/**
 *  @param {void}
 *  @return {}
 */

ManipulateurForm.prototype.removeReadOnlyConstraint = function() {
    this.id.removeAttribute('readOnly');
}
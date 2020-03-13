var employer=[
    {
    id:"001",
    nom:"mapwata",
    prenom:"gael",
    email:"gmapwata",
    age:"21",
    poste:"dddd",
    telephone:"000000",
    status:"marier",
    pays:"rdc"
}
]

const manipulateurForm=new ManipulateurForm();





let addbutton=document.querySelector("#save");
let tbody=document.querySelector("tbody"); 

afficherTable(employer);

/**
  * enregistrement des valeurs
  */
 
 addbutton.addEventListener('click',(e) => { 
    if(VerificationCles(employer,manipulateurForm.getId()))
    alert("la cles existe deja")
    else{
      employer.push({
          id:manipulateurForm.getId(),
          nom:manipulateurForm.getNom(),
          prenom:manipulateurForm.getPrenom(),
          email:manipulateurForm.getEmail(),
          age:manipulateurForm.getAge(),
          poste:manipulateurForm.getPoste(),
          telephone:manipulateurForm.getPhone(),
          status:manipulateurForm.getStatus(),
          pays:manipulateurForm.getPays()
       });
   
   afficherTable(employer);
   manipulateurForm.initializeInput();
    }
   },false);

/**
 * 
 * @param {*}employers
 * @returns {void}
 */
 function afficherTable(employers){
     ClearTable();



     for(let employer of employers){
    let tr= document.createElement("tr");
    let tdId=document.createElement("td");
    tdId.textContent=employer.id;
    let tdNom=document.createElement("td");
    tdNom.textContent=employer.nom;
    let tdPrenom=document.createElement("td");
    tdPrenom.textContent=employer.prenom;
    let tdEmail=document.createElement("td");
    tdEmail.textContent=employer.email;
    let tdAge=document.createElement("td");
    tdAge.textContent=employer.age;
    let tdPoste=document.createElement("td");
    tdPoste.textContent=employer.poste;
    let tdTelephone=document.createElement("td");
    tdTelephone.textContent=employer.telephone;
    let tdStatus=document.createElement("td");
    tdStatus.textContent=employer.status;
    let tdPays=document.createElement("td");
    tdPays.textContent=employer.pays;

    let buttonmodifier=document.createElement("button");
    buttonmodifier.setAttribute("type","button");
    buttonmodifier.setAttribute("class","btn btn-primary")
    buttonmodifier.textContent="modifier";
    let tdModifier=document.createElement("td").appendChild(buttonmodifier);
    
    let buttondelete=document.createElement("button");
    buttondelete.setAttribute("type","button");
    buttondelete.setAttribute("class","btn btn-danger")
    buttondelete.textContent="supprimer";
    let tdDelete=document.createElement("td").appendChild(buttondelete);

    tr.appendChild(tdId);
    tr.appendChild(tdNom);
    tr.appendChild(tdPrenom);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAge);
    tr.appendChild(tdPoste);
    tr.appendChild(tdTelephone);
    tr.appendChild(tdStatus);
    tr.appendChild(tdPays);
    tr.appendChild(tdModifier);
    tr.appendChild(tdDelete);
    tbody.appendChild(tr);
     }
 }
 /**
  * 
  *  @returns {void}
  */
 function ClearTable(){
    tbody.textContent="";
 }
 

 

 /**
  * @param {array,id}
  *  @returns {boolean}
  */
 
 function VerificationCles(employer,id){
    return employer.findIndex(employers => employers.id === id) >-1;
}
/**
 * @constructor
 */
 function ManipulateurForm(){
     this.id=document.querySelector("#id");
     this.nom=document.querySelector("#nom");
     this.prenom=document.querySelector("#prenom");
     this.email=document.querySelector("#email");
     this.age=document.querySelector("#age");
     this.poste=document.querySelector("#poste");
     this.phone=document.querySelector("#phone");
     this.status=document.querySelector("#marital");
     this.pays=document.querySelector("#pays");
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
 ManipulateurForm.prototype.getAge=function(){
    return this.age.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setAge=function(value){
    this.age.value=value;
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
 ManipulateurForm.prototype.getStatus=function(){
    return this.status.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setStatus=function(value){
    this.status.value=value;
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
 *  @returns {}
 */
ManipulateurForm.prototype.initializeInput=function(){
    this.setId('');
    this.setNom('');
    this.setPrenom('');
    this.setEmail('');
    this.setAge('');
    this.setPhone('');
}
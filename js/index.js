
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
        tdEstmaries.textContent=employer.estMarie ? 'Oui' : 'Non';
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
  */
  function onUpdate(e){ 
      /**
       * Axios fonctionne en asynchrone c'est-à-dire les données qui viendrons de l'API ne seront pas directement
       * disponible au chargement de la page, les données vont arriver avec un petit rétard (dépendamment du réseau)
       * Alors pour ne pas ennuyer l'utilisateur on afficher un message de chargement en attendant que les données
       * arrivent
       */
      manipulateurForm.showOverlay();


      let ids=e.target.dataset.target;

      axios.get(`http://167.71.45.243:4000/api/employes/${ids}?api_key=urrzckb`)
        .then(function(response){

            let buttonsave=document.querySelector("#save");
            buttonsave.style.display="none";
            let buttonupdate=document.querySelector("#update");
            buttonupdate.style.display="inherit";
            manipulateurForm.id.style.display="inherit";
            manipulateurForm.makeIdReadOnly();

            manipulateurForm.setId(response.data._id);
            manipulateurForm.setNom(response.data.nom);
            manipulateurForm.setPrenom(response.data.prenom);
            manipulateurForm.setEstMarie(response.data.estMarie);
            manipulateurForm.appendPost(response.data.poste);
            manipulateurForm.appendPays(response.data.pays);
            manipulateurForm.setPhone(response.data.numeroTelephone);
            manipulateurForm.setEmail(response.data.email);

            /**
             * Toutes les données sont bien arrivées et chargées dans le formulaire, maintenant on cache le 
             * message de chargement.
             */
            manipulateurForm.hideOverlay();
        })
        .catch(function(err){
            /**
             * En cas d'erreur on cache aussi le message de chargement.
             */
            manipulateurForm.hideOverlay();
            console.log(err.response)
        })
    ;

  }
  /**
   * 
   * update my table  
   *  
   */
  let buttonupdatedata=document.querySelector("#update");
  let buttonsave=document.querySelector("#save");
  buttonupdatedata.addEventListener('click',(e) => {
      let ids = manipulateurForm.getId();
      manipulateurForm.showOverlay();

      axios.put(`http://167.71.45.243:4000/api/employes/${ids}?api_key=urrzckb`, {
        nom:manipulateurForm.getNom(),
        prenom:manipulateurForm.getPrenom(),
        email:manipulateurForm.getEmail(),
        poste:manipulateurForm.getPoste(),
        numeroTelephone:manipulateurForm.getPhone(),
        estMarie: manipulateurForm.getEstMarie(),
        pays:manipulateurForm.getPays()
      }).then(response => {
        console.log(response.data);
        afficherTable();  
        manipulateurForm.hideOverlay();
      }).catch(error => {
          console.log(error);
      });

      buttonupdatedata.style.display = "none";
      buttonsave.style.display = "inherit";
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
 * Obtient le status de l'employé. Renvoie true s'il est marié et false dans le cas
 * contraire.
 * 
 * @return {boolean}
 */
ManipulateurForm.prototype.getEstMarie = function() {
     return this.marieroui.checked ? 
        this.marieroui.value :
        this.mariernon.value;
}

/**
 * Indique sur le formulaire si l'employé est marié ou pas.
 * 
 * @param {boolean} value
 * @return {void}
 */
ManipulateurForm.prototype.setEstMarie = function(value) {
    if (value == true) {
        this.setMarierNon(false);
        this.setMarierOui(true);
    } else {
        this.setMarierNon(true);
        this.setMarierOui(false);
    }
}

/**
 *  @param {boolean} value
 *  @returns {void}
 */
ManipulateurForm.prototype.setMarierOui=function(value){
    this.marieroui.checked = value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getMarierNon=function(){
    return this.mariernon.value;
}
/**
 *  @param {boolean} value
 *  @returns {void}
 */
ManipulateurForm.prototype.setMarierNon=function(value){
    this.mariernon.checked = value;
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
    this.phone.value= value ? value : '';
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

ManipulateurForm.prototype.appendPays = function(pays) {
    let paysSelect = document.querySelector('#poste');
    let optionExists = false; // Permet d'indiquer si l'option existe déjà dans le select ou pas.

    /**
     * Vérifie si l'option existe déjà c'est-à-dire si le pays est déjà 
     * dans le select parmi les options pour éviter le doublon.
     */
    for (let option of paysSelect.options) {
        if (option.value == poste) {
            optionExists = true;
            break;
        }
    }

    /**
     * Si l'option n'existe pas alors on l'ajoute en d'autre terme, si le pays n'est pas encore 
     * dans le select on l'ajoute dans le cas contraire on ne l'ajoute pas.
     * 
     */
    if (!optionExists) {
        let option=document.createElement('option');
        option.value= pays;
        option.textContent= pays;
        document.querySelector("#pays").append(option); 
    }

    // Après Avoir ajouté le pays dans le select on le sélectionne directement comme valeur du select
    // Si on efface cette ligne c'est le premier élement du select qui sera sélectionné comme par défaut.
    this.setPays(pays);
}

/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.appendPost=function(poste){
    let posteSelect = document.querySelector('#poste');
    let optionExists = false; // Permet d'indiquer si l'option existe déjà dans le select ou pas.

    /**
     * Vérifie si l'option existe déjà c'est-à-dire si le poste est déjà 
     * dans le select parmi les options pour éviter le doublon.
     */
    for (let option of posteSelect.options) {
        if (option.value == poste) {
            optionExists = true;
            break;
        }
    }

    /**
     * Si l'option n'existe pas alors on l'ajoute en d'autre terme, si le poste n'est pas encore 
     * dans le select on l'ajoute dans le cas contraire on ne l'ajoute pas.
     * 
     */
    if (!optionExists) {
        let option=document.createElement('option');
        option.value=poste;
        option.textContent=poste;
        document.querySelector("#poste").append(option); 
    }

    // Après Avoir ajouté le poste dans le select on le sélectionne directement comme valeur du select
    // Si on efface cette ligne c'est le premier élement du select qui sera sélectionné comme par défaut.
    this.setPoste(poste);
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
    this.setMarierOui(false);
    this.setMarierNon(false);
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

/**
 * Affiche le div de chargement
 * 
 * @return {void}
 */
ManipulateurForm.prototype.showOverlay = function() {
    document.querySelector('div.overlay').style.visibility = 'visible';
}

/**
 * Cache le div de chargement
 * 
 * @return {void}
 */
ManipulateurForm.prototype.hideOverlay = function() {
    document.querySelector('div.overlay').style.visibility = 'hidden';
}
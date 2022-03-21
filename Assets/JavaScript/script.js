class DateFormular {
    img;
    nume;
    prenume;
    sex;
    dataNasterii;
    cnp;
    nrTel;
    email;
    jud;
    oras;
    adresa;
    codPostal;
    parola1;
    parola2;
    newsletter;
    termeni = false;
}

const GIF_NAME = "imageonline-extractgif-65153-";
const NO_OF_GIFS = 10;
const GIFS_EXTENSION = ".gif";

var inputDataPas1 = new Array();
var inputDataPas2 = new Array();
var inputDataPas3 = [];

var btnNext1= document.getElementById("Next1");
var btnNext2= document.getElementById("Next2");
var btnSubmit= document.getElementById("Submit");
var btnsNext=[btnNext1,btnNext2];

var pasi=document.getElementsByTagName("fieldset");

var btnBack1= document.getElementById("Back1");
var btnBack2= document.getElementById("Back2");
var btnsBack=[btnBack1,btnBack2];

var pasCurent = 0;

var dateForm = new DateFormular();

for(let i=0 ; i<btnsNext.length ; i++){
    btnsNext[i].addEventListener('click', e=>{
        var x = verificaPas(pasCurent);
        if (x) {
            displayNoneToggle(pasi[pasCurent], pasi[pasCurent+1]);
            pasCurent++;
        }
        // else
        // {
        //     alert("Completeaza toate campurile obligatorii");
        // }
    })
}

btnSubmit.addEventListener('click', event => {
    event.preventDefault();
    var x= verificaPas(pasCurent);
    if(x){
        $(".box").hide();
        console.log(dateForm);

        for(let i = 0; i < gifImages.length; i++ ){
            $("body").append(gifImages[i]);
        }

        $("body").append("<p>Multumim pentru completarea formularului, "
            +dateForm.prenume+" "+dateForm.nume+"!</p>")
            .css("text-align", "center");
        $("body").append('<iframe src="https://giphy.com/embed/kddEqIIhp4soHjT6dP" width="480" height="320" frameBorder="0" class="giphy-embed"></iframe>');
        
    }
});

for(let i=0; i<btnsBack.length; i++){
    btnsBack[i].addEventListener('click', event => {
        displayNoneToggle(pasi[pasCurent-1], pasi[pasCurent]);
        pasCurent--;
    });
}

function displayNoneToggle(x1, x2) {
    x1.classList.toggle("hidden"); 
    x2.classList.toggle("hidden");
}

function verificaPas(pasCurent){
    switch(pasCurent){
        case 0 : 
        var ok = true;
        if(verificaInputRequiredEmpty(0)){
            for(let i=0; i<inputDataPas1.length; i++){
                if(!inputDataPas1[i]()){
                    ok = false;
                }
            }
        }
        else{
            ok = false;
            alert("Completeaza toate campurile obligatorii");
        }
        return ok;
        break;

        case 1 : 
        var ok = true;
        if(verificaInputRequiredEmpty(1)){
            for(let i=0; i<inputDataPas2.length; i++){
                if(!inputDataPas2[i]()){
                    ok = false;
                }
            }
        }
        else{
           ok = false;
            alert("Completeaza toate campurile obligatorii");
        }
        return ok;
        break;
        case 2 : 
        var ok = true;
        if(verificaInputRequiredEmpty(2)){
            for(let i=0; i<inputDataPas3.length; i++){
                if(!inputDataPas3[i]()){
                    ok = false;
                }
            }
        }
        else{
            ok = false;
            alert("Completeaza toate campurile obligatorii");
        }
        return ok;
        break;
        default : return true;
    }
}

inputDataPas1.push(function adaugaImg(){
    var img = document.getElementById("img");
    dateForm.img=img.value; 
    return true;
});

inputDataPas1.push(
    function verificaNume(){
        var nume = document.getElementById("nume");
        var aux = verificaDoarLitere(nume.value) && verificaLungimeMinim(nume.value,3);
        if(aux){
            dateForm.nume=nume.value; 
            nume.classList.remove("invalid"); 
        } 
        else{
            $("#numeMsg").remove();
            $(nume).after('<p id="numeMsg">Acest nume nu este valid</p>');
            //$(nume).after("Acest nume nu este valid");
            nume.classList.add("invalid");  
        }
        return aux; 
    }
);

inputDataPas1.push(
    function verificaPrenume(){
        var prenume= document.getElementById("prenume");
        var aux= verificaDoarLitere(prenume.value) && verificaLungimeMinim(prenume.value,3); 
        if(aux){
            dateForm.prenume=prenume.value; 
            prenume.classList.remove("invalid"); 
        } 
        else{
            $("#prenumeMsg").remove();
            $(prenume).after('<p id="prenumeMsg">Acest prenume nu este valid</p>');
            //$(prenume).after("Acest prenume nu este valid");
            prenume.classList.add("invalid");  
        }
        return aux;
    }
);

function verificaDoarLitere(nume){
    var regex= /^[A-Za-z]+$/;
    if(nume.match(regex)){
        return true;
    }
    else 
        return false;
}
function verificaDoarNr(nr){
    var regex= /^[0-9]+$/;
    if(nr.match(regex))
        return true;
    else 
        return false;
}

function verificaLungimeMinim(input,minim){
    if(input.length>=minim){
        return true;
    }
    return false;
}
function verificaLungimeMaxim(input,maxim){
    if(input.length<=maxim){
        return true;
    }
    return false;
}

inputDataPas1.push(
    function verificaSex(){
        var radioBtns = document.getElementsByClassName("radio-btn");
        var sex = getChecked(radioBtns);
        if( sex == -1 ){
            cnp.classList.add("invalid");
            return false;
        }
        else{
            cnp.classList.remove("invalid");
            dateForm.sex = (sex==1) ? "M" : "F";
            return true;
        }
    }
);

function getChecked(radioBtns){
    var i;
    var ok = false;
    for( i=0; i<radioBtns.length; i++){
        if(radioBtns[i].checked){
            ok = true;
            stop;
        }
    }
    return ok ? i : -1;
}

inputDataPas1.push(
    function verificaDataNasterii(){
        var dataNasterii= document.getElementById("datanasterii").value;
        
        // TODO verifica pe aici sa fie in parametri!
        dateForm.dataNasterii=dataNasterii;
        cnp.classList.remove("invalid");
        return true;
        
    }
);

inputDataPas1.push(
    function verificaCNP(){
        var cnp= document.getElementById("cnp");
        
        // X YY MM DD cod.... 
        // dim=13 , X= sex si data
        
        let nr = 1;
        if( dateForm.sex == "F") nr = 2;

        var data = new Date(dateForm.dataNasterii);
        let an = data.getFullYear().toString().substr(2,2);
        let luna = data.getMonth()+1;
        let zi = data.getDate();

        if(cnp.value.length==13 && verificaDoarNr(cnp.value))
            if(parseInt(cnp.value.substr(0,1))%2==nr%2)
            if(cnp.value.substr(1,2)==an && cnp.value.substr(3,2)==luna && cnp.value.substr(5,2)==zi)
            {   
                cnp.classList.remove("invalid");
                dateForm.cnp=cnp.value;
                return true;
            }
        $("#cnpMsg").remove();
        $(cnp).after('<p id="cnpMsg">Acest CNP nu este valid</p>');
        cnp.classList.add("invalid");
        return false;
    }
);

inputDataPas2.push(
    function verificaTelefon(){
        var nrTel= document.getElementById("nrtel");
        
        if(nrTel.value.length==10 && verificaDoarNr(nrTel.value)){
            if(nrTel.value.substr(0,2)=="07"){
                dateForm.nrTel=nrTel.value;
                return true;
            }
        }
        $("#nrTelMsg").remove();
        $(nrTel).after('<p id="nrTelMsg">Acest nr nu este valid. Incercati 07--------</p>');
        //$(nrTel).after("Acest nr nu este valid. Incercati 07--------");
        nrTel.classList.add("invalid");
        return false;
    }
);

inputDataPas2.push(
    function verificaMail(){
        var email= document.getElementById("email");
        
        var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.value.match(regex)){
            dateForm.email = email.value;
            return true;
        }
        $("#emailMsg").remove();
        $(email).after('<p id="emailMsg">Acest mail nu este valid</p>');
        //$(email).after("Acest mail nu este valid");
        email.classList.add("invalid");
        return false;
    }
)

inputDataPas2.push(function adaugaJudet(){
    var jud = document.getElementById("judete");
    dateForm.jud = jud.value; 
    return true;
});

inputDataPas2.push(function adaugaOras(){
    var oras = document.getElementById("orase");
    dateForm.oras = oras.value; 
    return true;
});

inputDataPas2.push(function adaugaAdresa(){
    var adresa = document.getElementById("adresa").value;
    dateForm.adresa = adresa; 
    return true;
});

inputDataPas2.push(function adaugaCodPostal(){
    var codP = document.getElementById("codPostal").value;
    dateForm.codPostal = codP; 
    return true;
});

var parola1 = document.getElementById("parola");

inputDataPas3.push( verificaParola1 );
function verificaParola1(){
    console.log(parola1.value);
    var regex=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(parola1.value.match(regex)){
        dateForm.parola1=parola1.value;

        parola1.classList.remove("invalid");
        parola1.classList.add("pass");
        return true;
    }
    else{
        parola1.classList.remove("pass");
        $("#parolaHintText").show();
        parola1.classList.add("invalid");
        return false;
    }
}

var parola2= document.getElementById("parolaConfirm");

inputDataPas3.push(verificaParola2);
function verificaParola2(){
        
    if(parola1.value===parola2.value){
        dateForm.parola2=parola2.value;

        parola2.classList.add("pass");
        parola2.classList.remove("invalid");
        return true;
    }
    else{
        parola2.classList.remove("pass");
        $("#parola2HintText").show();
        parola2.classList.add("invalid");
        return false;
    }
}

inputDataPas3.push(function adaugaNewsletterOp(){
    var newsletter = document.getElementById("newsletter");
    dateForm.newsletter = newsletter.checked;
    return true;
});

inputDataPas3.push(
    function verificaTC(){
        var termeni= document.getElementById("termeni");
        
        if(termeni.checked){
            dateForm.termeni = true;
            return true;
        }
        else{
            return false;
        }
    }
);

parola1.oninput = verificaParola1;
parola2.oninput = verificaParola2;
//parola2.addEventListener("input", verificaParola2);


for(let i=0; i < $(".required").length; i++){
    $(".required")[i].firstElementChild.innerText+="*";
}

// function resetValidare(elemente){
//     for(let i=0; i < elemente.length; i++){
//         elemente[i].lastElementChild.classList.remove("invalid");
//     }
// }

function verificaInputRequiredEmpty(n){
    var ok = true;
    var elemente = $("#pas"+(n+1)+" .required");
    //resetValidare(elemente);
    for(let i=0; i < elemente.length; i++){
        if(elemente[i].lastElementChild.tagName.toLowerCase() === 'input'){
            if(elemente[i].lastElementChild.value=="") {
                ok = false;
                elemente[i].lastElementChild.classList.add("invalid");
            }
            else{
                elemente[i].lastElementChild.classList.remove("invalid");
            }
        }
        else
        {
            //e radio btn
            if(getChecked($("#pas"+(n+1)+" .required .check"))==-1){
                ok = false;
            }
        }
    }
    return ok;
}


/////////////// ====== GIF ====== \\\\\\\\\\\\\\\
setInterval(displayGIF, 200);

var count = 0;
var gifImages = [];
// adauga pozele
for(let i = 0; i < NO_OF_GIFS; i++ ){
    var img = new Image();
    img.src = "./Assets/Media/gifs/"+GIF_NAME+(i+1)+GIFS_EXTENSION;
    img.classList.add("hidden");
    img.classList.add("img-gifs");
    gifImages.push(img);
}
gifImages[0].classList.remove("hidden");

function displayGIF() {
    if(count == gifImages.length-1){
        gifImages[count].classList.add("hidden");
        count = 0;
        gifImages[count].classList.remove("hidden");
    }
    else{
        gifImages[count].classList.add("hidden"); //5
        gifImages[count+1].classList.remove("hidden"); //6
        count++;
    }
}


//////////////// ==== GENERARE PAROLA =====\\\\\\\\\\\  

// generare parola:
var genereazaParola = (
    length = 10,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
    ) =>
    Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join('')
console.log(genereazaParola());



// tooltip-ul
let p = $('#parola');
p.attr("title","Apasati tasta ↓(sageata-jos) pentru a genera o parola");
console.log(p.title);
$('#parola').tooltip({
    trigger:"focus manual"
});

parola1.addEventListener("keyup", e =>{
    if(e.key === "ArrowDown"){
        parola1.value = genereazaParola();
    }
});

/////////////========== EYE PASSWORD ========\\\\\\\\\\\

$("#veziParola").mousedown(function () {
    parola1.setAttribute("type","text");
    
    this.classList.remove("bi-eye");
    this.classList.add("bi-eye-fill");
});

$("#veziParola").mouseup(function () {
    parola1.setAttribute("type","password");
    
    this.classList.remove("bi-eye-fill");
    this.classList.add("bi-eye");
});

$("#veziParola2").mousedown(function () {
    parola2.setAttribute("type","text");
    
    this.classList.remove("bi-eye");
    this.classList.add("bi-eye-fill");
});

$("#veziParola2").mouseup(function () {
    parola2.setAttribute("type","password");
    
    this.classList.remove("bi-eye-fill");
    this.classList.add("bi-eye");
});




////////// ===== INTERVIU TRIAL =====\\\\\\\\\\\

// for(let i=1; i<=100; i++){
// 	switch (true){
//         case (i % 15 == 0) : console.log("FizzBuzz"); break;
//         case (i % 3 == 0) : console.log("Fizz"); break;
//         case (i % 5 == 0) : console.log("Buzz"); break;
//         default: console.log(i);
//     }
// }

// for(let i=1; i<=100; i++){
//     if(i % 15 == 0)
//         console.log("FizzBuzz");
//     else{
//         if(i % 5 == 0)
//             console.log("Buzz");
//         else{
//             if(i % 3 == 0)
//                 console.log("Fizz");
//             else{
//                 console.log(i);
//             }
//         }
//     }
// }


// var v = [];
// let i = 0;

// function f(){
//     if(i < 100){
//         v.push(i + 1);
//         console.log( v[i] );
//         i ++;
//         f();
//     }
//     else 
//     console.log("done");
// }

// function f2(v){
//     if(v.length == 100){
//         return v;
//     }
//     v.push(v.length + 1);
//     return f2(v);
// }
// console.log(f2([])); //// e mai ok sa facem fara param din afara


// while(i < 100){
//     v.push( i + 1 );
//     i++;
// } 


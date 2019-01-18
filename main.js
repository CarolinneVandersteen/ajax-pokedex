function search() {
    xhr = new XMLHttpRequest();
    let name = document.getElementById("naam");
    let url = "https://pokeapi.co/api/v2/pokemon/" + name.value + "/"; // webdata die we nodig hebben voor de site
    xhr.open("GET", url, true); // data opvragen bij webserver - (=altijd true!)
    let prevname ;



    xhr.onload = function(){ 
        if (this.status == 200){
            // start-up = leeg
            document.getElementById("moves").innerHTML ="";
            document.getElementById("img").innerHTML ="";
            document.getElementById("name").innerHTML = "";

            // JSON aangemaakt (data website)
            let poke = JSON.parse(this.responseText);
            console.log(poke);

            // naam + ID + img opvragen bij webdata
            document.getElementById("name").innerHTML = poke.name
            document.getElementById("id").innerHTML = poke.id;
            document.getElementById("img").innerHTML = "<img src='" + poke.sprites.front_default+ "'>";

            // als er minder dan 5 moves zijn: 
            if (poke.moves.length <5) {
                for (let i = 0; i < poke.moves.length; i++) {
                    document.getElementById("moves").innerHTML += "<li>" + poke.moves[i].move.name +"</li>";
                }
            } 
            // anders: 
            else {
                for (let i = 0; i < 4; i++) {
                    document.getElementById("moves").innerHTML += "<li>" + poke.moves[i].move.name +"</li>";
                }
            }
        }   
    }
    xhr.send(); // data vesturen naar site

    x = new XMLHttpRequest();
    let evol = "https://pokeapi.co/api/v2/pokemon-species/" + name.value+ "/";
    x.open("GET", evol, true);

    x.onload = function(){
        if (this.status == 200){
            // start-up = leeg
            document.getElementById("evol").innerHTML = "";

            // JSON aangemaakt (data website)
            let e = JSON.parse(this.responseText);
            console.log(e);

            // evolutie van pokemon opvragen
            prevname = e.evolves_from_species.name;
            document.getElementById("evol").innerHTML = e.evolves_from_species.name;
           doeiets();
        }
    }
    x.send();
     
function doeiets(){
    y = new XMLHttpRequest();
    y.open('GET', "https://pokeapi.co/api/v2/pokemon/"+ prevname+"/", true);
    y.onload = function(){
        if (this.status == 200){
            // start-up = leeg
            document.getElementById("evolimg").src = "";

            // JSON aangemaakt (data website)
            let z = JSON.parse(this.responseText);
            console.log(z);

            // evolutie van pokemon opvragsen
            document.getElementById("evolimg").innerHTML ="<img src='" + z.sprites.front_default+ "'>";
        }
    }
    y.send();
}
   
}

const myGallery$$=document.querySelector(".gallery");
const myInput$$=document.querySelector(".input");

const pokemonAPI="https://pokeapi.co/api/v2/pokemon?limit=151";

const llamada=async()=>{
    let dataPokemonURL= await fetch(pokemonAPI);
    let dataPokemonJSON= await dataPokemonURL.json();

    const pintarCartas=async()=>{
        if (!myInput$$.value) {
            for(let i=0; i<151; i++){
                let urlPokemon = dataPokemonJSON.results[i].url;
                let urlPokemonFetch = await fetch(urlPokemon);
                let urlPokemonJSON= await urlPokemonFetch.json();
                let finalData=urlPokemonJSON;

                //CREACIÓN ELEMENTOS
                let myDiv$$ = document.createElement("div");
                myDiv$$.setAttribute("class", "carta");            
                let datosHTML$$ = `
                    <div class="cajaDatos">
                        <h2 class="namePokemon">${finalData.species.name}</h2>
                        <p class="numberPokemon">${finalData.id}</p>
                    </div>
                    <img src=${finalData.sprites.other.dream_world.front_default} alt="imagen ${finalData.species.name}" class="imagen"}/>
                    <p class="typePokemon">${finalData.types[0].type.name}</p>
                    `;

                myDiv$$.innerHTML=datosHTML$$;
                myGallery$$.appendChild(myDiv$$);
            };  
        }else{
            myGallery$$.innerHTML = ``;
            for (let i = 0; i < 151; i++) {
                let urlPokemon = dataPokemonJSON.results[i].url;
                let urlPokemonFetch = await fetch(urlPokemon);
                let urlPokemonJSON= await urlPokemonFetch.json();
                let finalData=urlPokemonJSON;
                
                if (finalData.species.name.includes(myInput$$.value)) {
    
                    //CREACIÓN ELEMENTOS
                    let myDiv$$ = document.createElement("div");
                    myDiv$$.setAttribute("class", "carta");            
                    let datosHTML$$ = `
                        <div class="cajaDatos">
                            <h2 class="namePokemon">${finalData.species.name}</h2>
                            <p class="numberPokemon">${finalData.id}</p>
                        </div>
                        <img src=${finalData.sprites.other.dream_world.front_default} alt="imagen ${finalData.species.name}" class="imagen"}/>
                        <p class="typePokemon">${finalData.types[0].type.name}</p>
                        `;

                myDiv$$.innerHTML=datosHTML$$;
                myGallery$$.appendChild(myDiv$$);
                }
            }
        }
    }
pintarCartas();   
myInput$$.addEventListener("input", pintarCartas);
}

llamada();

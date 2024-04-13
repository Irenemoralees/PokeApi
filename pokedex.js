let ol$ = document.querySelector (`#pokedex`);
let results =[];

let main$ =document.querySelector(`main`);

const getCharacters = async () => {
    for (let i = 1; i <151; i++) { 
        let url = "https://pokeapi.co/api/v2/pokemon/" + i ;
        const response = await fetch(url);
        const data = await response.json();
    results.push(data);
        
        
    }
    return results;
}

const mapCharacters = (getCharactersSinMap) =>{
    return getCharactersSinMap.map ((character) => ({
    
        name: character.name,
        image: character.sprites['front_default'],
        type: character.types.map(type => type.type.name).join(', '),
        id: character.id 
    }));
};

const drawCharacters = (characters) =>{
ol$.innerHTML = "";
    for (let character of characters){
let characterDiv$ = document.createElement(`div`);
characterDiv$.className = `divPokemon`;
ol$.appendChild(characterDiv$);

let spritesPokemon$ = document.createElement(`img`);
spritesPokemon$.setAttribute(`src`, character.image);
spritesPokemon$.setAttribute(`alt`, character.name);
characterDiv$.appendChild(spritesPokemon$);

let namePokemon$ = document.createElement(`h2`);
namePokemon$.textContent = character.name;
characterDiv$.appendChild(namePokemon$);

let pokemonParagraf$ = document.createElement(`p`);
pokemonParagraf$.textContent= character.type;
characterDiv$.appendChild(pokemonParagraf$);

}}

const inputDraw = (characters) => {
    let input$ = document.querySelector(`.modifyInput`);
    input$.addEventListener(`input`, () =>searchCharacters(characters, input$.value));
}

const searchCharacters = ( array, filter) =>{
   let filterCharacters = array.filter ((character) => character.name.toLowerCase().includes(filter.toLowerCase()));
   drawCharacters(filterCharacters);
   console.log(filterCharacters);
    
}



    

const init =async () => {
   const getCharactersSinMap = await getCharacters(); 
const charactersmapp = mapCharacters(getCharactersSinMap);
 drawCharacters(charactersmapp);
inputDraw(charactersmapp);
searchCharacters();
 
};

init();

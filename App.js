import React, { Component } from 'react';
import './App.css';
// import Request from 'superagent';
import axios from 'axios';

class Ewftest extends Component {
  
  
 constructor(props) {
    super(props);
    this.state = {
      name: "",
      habitat: "",
      picFront: "",
      types: [],
      ability: "",
      stats: [],
      evolves: null,
      isLoading: true,
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value.toLowerCase()
    
    });
  }



  handleSubmit(event) {
    axios.all([
      axios.get("https://pokeapi.co/api/v2/pokemon/"+this.state.value),
      axios.get("https://pokeapi.co/api/v2/pokemon-species/"+this.state.value),
      // axios.get("https://pokeapi.co/api/v2/evolution-chain/"+this.state.value),
      
    ])
    .then(axios.spread((response, response_species) => {

      // RESPONSE api call
      const name = response.data.name;
      const picFront = response.data.sprites.front_default;
      const types = response.data.types.map(function(object, i){ return object.type.name;})
      const stats = response.data.stats.map(function(object, i){ return object.stat.name + ": " + object.base_stat + `\n` ;})
      const ability = "Ability: " + response.data.abilities[0].ability.name;

      // RESPONSE "SPECIES" api call
      const evolves = response_species.data.evolution_chain.url.replace(/https:\/\/pokeapi.co\/api\/v2\/evolution-chain\//, '').slice(0, -1);
      // const evolution = evolves + response.data.chain.species.name;
      const habitat = "This pokemon is usually found in " + response_species.data.habitat.name + "s";
      const description = response_species.data.flavor_text_entries[response_species.data.flavor_text_entries.length-1].flavor_text;

      this.setState({
        name: name,
        habitat: habitat,
        picFront: picFront,
        types: types,
        ability: ability,
        evolves: evolves,
        description: description,
        stats: stats,
        isLoading: false,
      });

      pokemonTypesColor();

    }))      
    .catch((e) => {

      this.setState({

        error: true,
        isLoadingButtonText: false,

      })

    });
    
    event.preventDefault();
  }


  loading() {

    const playSound = () => {

      const givenSound = new Audio('/click-sound.mp3');
      givenSound.play();
      console.log("Play Sumthin");

      setTimeout(() => {
      this.setState({
        
        isLoadingButtonText:true,
      });
    }, 0.1);

    }

    const { isLoadingButtonText, error } = this.state;

    return (

      <div className="wrapper">

        <img className="prof" src="/prof.png" alt="professor"/>

        <div className="searchwrapper">

          <div className="text">Hello and welcome to my pokedex created with React.JS</div>

          <form onSubmit={this.handleSubmit}>

            <input className={error ? 'error' : null} placeholder="Search for a pokémon..." type="text" value={this.state.value} onChange={this.handleChange} />
            <p>{error ? "The pokémon you're trying to find, doesnt exist." : null}</p>

            <button 
              onClick={playSound} 
              type="submit" 
              disabled={isLoadingButtonText}
            >
                {!isLoadingButtonText ? 'Search' : 'Loading...'}
            </button>

          </form>

          <img className="text-box" src="/text-box.png" alt="professor"/>

        </div>

      </div>

    )
  }

  pokemonList(){
    // this.state.description = this.state.description;
    const pictureSize = {
      width: 400,
     
    };
    return (
      <div className="pokemonresults">

        <h1>{ this.state.name }</h1>

        <p>{ this.state.description.replace(/\s/g, " ") }</p>

        <h1>{ this.state.habitat }</h1>

        <ul>
          Base Stats:
          { this.state.stats.map((stat,i) => 
            <li style={{ whiteSpace: 'pre-wrap' }} key={ i }>
              { stat }
            </li>
          ) }

        </ul>

        <h1>{ this.state.ability }</h1>
        
        <h1>{ this.state.evolves }</h1>

        { this.state.types.map((type,i) => <h1 key={ i } id={`pokemonType-${ i }`}>{ type }</h1>) }

        <img style={pictureSize} alt={ this.state.name } src={ this.state.picFront }/>


      </div>
    );
  }


  render() {

    const { isLoading } = this.state;

  
    return (

        <div className="begin">

          {isLoading ? this.loading() : this.pokemonList()}

        </div>

    ); // return

  } // render
  
}; // class



export default Ewftest;


function pokemonTypesColor() {

  let firstPokemonType = document.getElementById("pokemonType-0");

  if (firstPokemonType.innerHTML === 'normal') {
    firstPokemonType.style.backgroundColor = "burlywood";
  }
  else if (firstPokemonType.innerHTML === 'fire') {
    firstPokemonType.style.backgroundColor = "orange";
  }
  else if (firstPokemonType.innerHTML === 'water') {
    firstPokemonType.style.backgroundColor = "dodgerblue";
  }
  else if (firstPokemonType.innerHTML === 'grass') {
    firstPokemonType.style.backgroundColor = "limegreen";
  }
  else if (firstPokemonType.innerHTML === 'electric') {
    firstPokemonType.style.backgroundColor = "gold";
  }
  else if (firstPokemonType.innerHTML === 'ice') {
    firstPokemonType.style.backgroundColor = "paleturquoise";
  }
  else if (firstPokemonType.innerHTML === 'psychic') {
    firstPokemonType.style.backgroundColor = "deeppink";
  }
  else if (firstPokemonType.innerHTML === 'dark') {
    firstPokemonType.style.backgroundColor = "darkslategray";
  }
  else if (firstPokemonType.innerHTML === 'dragon') {
    firstPokemonType.style.backgroundColor = "blue";
  }
  else if (firstPokemonType.innerHTML === 'rock') {
    firstPokemonType.style.backgroundColor = "chocolate";
  }
  else if (firstPokemonType.innerHTML === 'ground') {
    firstPokemonType.style.backgroundColor = "goldenrod";
  }
  else if (firstPokemonType.innerHTML === 'steel') {
    firstPokemonType.style.backgroundColor = "silver";
  }
  else if (firstPokemonType.innerHTML === 'fighting') {
    firstPokemonType.style.backgroundColor = "firebrick";
  }
  else if (firstPokemonType.innerHTML === 'flying') {
    firstPokemonType.style.backgroundColor = "deepskyblue";
  }
  else if (firstPokemonType.innerHTML === 'ghost') {
    firstPokemonType.style.backgroundColor = "indigo";
  }
  else if (firstPokemonType.innerHTML === 'poison') {
    firstPokemonType.style.backgroundColor = "purple";
  }
  else if (firstPokemonType.innerHTML === 'bug') {
    firstPokemonType.style.backgroundColor = "yellowgreen";
  }
 

  let secondPokemonType = document.getElementById("pokemonType-1");

  if(secondPokemonType){

  if (secondPokemonType.innerHTML === 'normal') {
    secondPokemonType.style.backgroundColor = "burlywood";
  }
  else if (secondPokemonType.innerHTML === 'fire') {
    secondPokemonType.style.backgroundColor = "orange";
  }
  else if (secondPokemonType.innerHTML === 'water') {
    secondPokemonType.style.backgroundColor = "dodgerblue";
  }
  else if (secondPokemonType.innerHTML === 'grass') {
    secondPokemonType.style.backgroundColor = "limegreen";
  }
  else if (secondPokemonType.innerHTML === 'electric') {
    secondPokemonType.style.backgroundColor = "gold";
  }
  else if (secondPokemonType.innerHTML === 'ice') {
    secondPokemonType.style.backgroundColor = "paleturquoise";
  }
  else if (secondPokemonType.innerHTML === 'psychic') {
    secondPokemonType.style.backgroundColor = "deeppink";
  }
  else if (secondPokemonType.innerHTML === 'dark') {
    secondPokemonType.style.backgroundColor = "darkslategray";
  }
  else if (secondPokemonType.innerHTML === 'dragon') {
    secondPokemonType.style.backgroundColor = "blue";
  }
  else if (secondPokemonType.innerHTML === 'rock') {
    secondPokemonType.style.backgroundColor = "chocolate";
  }
  else if (secondPokemonType.innerHTML === 'ground') {
    secondPokemonType.style.backgroundColor = "goldenrod";
  }
  else if (secondPokemonType.innerHTML === 'steel') {
    secondPokemonType.style.backgroundColor = "silver";
  }
  else if (secondPokemonType.innerHTML === 'fighting') {
    secondPokemonType.style.backgroundColor = "firebrick";
  }
  else if (secondPokemonType.innerHTML === 'flying') {
    secondPokemonType.style.backgroundColor = "deepskyblue";
  }
  else if (secondPokemonType.innerHTML === 'ghost') {
    secondPokemonType.style.backgroundColor = "indigo";
  }
  else if (secondPokemonType.innerHTML === 'poison') {
    secondPokemonType.style.backgroundColor = "purple";
  }
  else if (secondPokemonType.innerHTML === 'bug') {
    secondPokemonType.style.backgroundColor = "yellowgreen";
  }
  }
}

// let evolution = null;
// if ("evolves_to" in this.state.evolutionChain && this.state.detailsLoaded) {
//   evolution = <Evolution evolution={this.state.evolutionChain} />
// }
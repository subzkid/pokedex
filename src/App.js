import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Request from 'superagent';
import axios from 'axios';
import { PokemonTypes } from './pokemontypes';
import AreaArray from './AreaArray.js';
// import { ShowLocation } from './ShowLocation.js';
// import * as ShowLocation from './ShowLocation.js';
import * as Routes from './Test';

// var constants = require('./ShowLocation.js');


// { water ? 'water' : vuur ? 'vuur' : grond ? 'grond' : steen ? 'steen' : 'iets anders' }

class Ewftest extends Component {
  
  
 constructor(props) {
    super(props);
    this.state = {
      value: '',

      id: "",
      name: "",
      weight: "",
      height: "",
      habitat: "",
      genera: "",
      picFront: "",
      types: [],
      ability: "",
      stats: [],
      locationLink: "",
      location: [],
      isLoading: true,
      error: null,
      loading_map: true,
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
        
    // test1()+this.state.value, test2()+this.state.value
    axios.all([
      axios.get("https://pokeapi.co/api/v2/pokemon/" + this.state.value ),
      
      axios.get("https://pokeapi.co/api/v2/pokemon-species/" + this.state.value ),
      // axios.get("https://pokeapi.co/api/v2/evolution-chain/"+this.state.value),   
    ])
    .then(axios.spread((response, response_species) => {
      // RESPONSE api call
      const typesv1 = response.data.types[0].type.name;
      const name = response.data.name;
      const id = response.data.id;
      const height = response.data.height;
      const weight = response.data.weight;
      
      const picFront = response.data.sprites.front_default;
      const types = response.data.types.map(function(object, i){ return object.type.name;})
      const stats = response.data.stats.map(function(object, i){ return object.stat.name + ": " + object.base_stat + `\n` ;})
      const ability = "Ability: " + response.data.abilities[0].ability.name;

      // RESPONSE "SPECIES" api call
      const locationLink = response.data.location_area_encounters;
      // const evolution = locationLink + response.data.chain.species.name;
      const genera = response_species.data.genera[2].genus;
      const habitat = "This pokemon is usually found in " + response_species.data.habitat.name + "s";
      const description = response_species.data.flavor_text_entries[response_species.data.flavor_text_entries.length-1].flavor_text;

      this.setState({
        id: id,
        name: name,
        weight: weight,
        height: height,
        habitat: habitat,
        genera: genera,
        picFront: picFront,
        types: types,
        typesv1: typesv1,
        ability: ability,
        locationLink: locationLink,
        description: description,
        stats: stats,
        isLoading: false,
      })

      // where to find the pokemon
      const locationLinkFinal = "https://pokeapi.co" + this.state.locationLink;
      axios.get(locationLinkFinal)
        .then((response) => {
            const location = response.data.map(function(object, i){ return object.location_area.name;});
            // console.log("response data single", response.data.map(function(object, i){ return object.location_area.name;}));

            this.setState({
              location: location,
              loading_map: false,
            })
            // console.log("https://pokeapi.co" + this.state.locationLink);
            // console.log("response", response);
            // console.log(this.state.location);
            // console.log(location);
            // console.log("response data whole", response.data);

        })

      PokemonTypes();

    }))   

    .catch((e) => {

      this.setState({

        error: true,
        isLoadingButtonText: false,

      })

    })


    event.preventDefault();
  }
  clickReload() {
  
    window.location.reload();
    
    
  }

  loading() {

    const playSound = () => {

      const givenSound = new Audio('/click-sound.mp3');
      givenSound.play();
      // console.log("Play Sumthin");

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
            {error ? (<p>The pokémon you're trying to find, doesnt exist.</p>) : null}

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

    let indents = [];

    for (let number = 0; number < 391; number++) {

      indents.push(<span className='indent' key={number} id={'block-' + number}></span>);

    };

    var locationarray = AreaArray.data;
    let locationFinal = [];
 
    for(let i = 0; i <= locationarray.length; i++){

      if (this.state.location.indexOf(locationarray[i]) >= 0) {

          // console.log("Locatie van pokemon: " + locationarray[i]);
          
          locationFinal.push(<li className='location' key={i}>{locationarray[i]}</li>);
          // for(let j = 1; j <= 34; j++){
          switch(true){
            // kijk in AreaArray.js voor de locationarray[cijfer]
            case locationarray[i] === locationarray[0]:
              Routes.route_1();
              break;

            case locationarray[i] === locationarray[1]:
              Routes.route_2();
              break;
           
            case locationarray[i] === locationarray[2]:
              Routes.route_3();
              break;
           
            case locationarray[i] === locationarray[3]:
              Routes.route_4();
              break;
           
            case locationarray[i] === locationarray[4]:
              Routes.route_5();
              break;
           
            case locationarray[i] === locationarray[5]:
              Routes.route_6();
              break;
           
            case locationarray[i] === locationarray[6]:
              Routes.route_7();
              break;
           
            case locationarray[i] === locationarray[7]:
              Routes.route_8();
              break;
           
            case locationarray[i] === locationarray[8]:
              Routes.route_9();
              break;
           
            case locationarray[i] === locationarray[9]:
              Routes.route_10();
              break;
           
            case locationarray[i] === locationarray[10]:
              Routes.route_11();
              break;
           
            case locationarray[i] === locationarray[11]:
              Routes.route_12();
              break;
           
            case locationarray[i] === locationarray[12]:
              Routes.route_13();
              break;
           
            case locationarray[i] === locationarray[13]:
              Routes.route_14();
              break;
           
            case locationarray[i] === locationarray[14]:
              Routes.route_15();
              break;
           
            case locationarray[i] === locationarray[15]:
              Routes.route_16();
              break;
           
            case locationarray[i] === locationarray[16]:
              Routes.route_17();
              break;
           
            case locationarray[i] === locationarray[17]:
              Routes.route_18();
              break;
           
            case locationarray[i] === locationarray[18]:
              Routes.route_19();
              break;
           
            case locationarray[i] === locationarray[19]:
              Routes.route_20();
              break;
           
            case locationarray[i] === locationarray[20]:
              Routes.route_21();
              break;
           
            case locationarray[i] === locationarray[21]:
              Routes.route_22();
              break;
           
            case locationarray[i] === locationarray[22]:
              Routes.route_23();
              break;
           
            case locationarray[i] === locationarray[23]:
              Routes.route_24();
              break;
           
            case locationarray[i] === locationarray[24]:
              Routes.route_25();
              // document.write(locationarray[24]);
              
              break;

            // end routes, begin places
            case locationarray[i] === locationarray[25]:
              Routes.diglet_cave();
              break;
  
            case locationarray[i] === locationarray[26]:
              Routes.viridian_forest();
              break;
  
            case locationarray[i] === locationarray[27, 36, 37, 38, 39]:
              Routes.mt_moon();
              break;
  
            case locationarray[i] === locationarray[28]:
              Routes.power_plant();
              break;
  
            case locationarray[i] === locationarray[29]:
              Routes.rock_tunnel();
              break;
  
            case locationarray[i] === locationarray[30, 33, 34, 35]:
              Routes.seafoam_islands();
              break;
  
            case locationarray[i] === locationarray[31]:
              Routes.victory_road();
              break;
  
            case locationarray[i] === locationarray[32, 40, 41, 42, 43]:
              Routes.safari_zone();
              break;
  

            default:

          }
        // }
     
      } else {

        // console.log("nothing :: debug");

      }

    }

        // this.setState({
          
        //   loading_map:true,
        // });

    const { loading_map } = this.state;

    return (

      <div className="pokemonresults">
      
      <p className="return" onClick={this.clickReload}>return</p>

      <div className="container-fluid">

          <div className="row">
          
            <div className="wrapper-info-1">

                <div className="col-xs-12 col-sm-6">

                  <h1 className="name">{ "No." + this.state.id + " " + this.state.name }</h1>       
                  
                  <h3> The { this.state.genera } </h3>

                  <h3>{ "HT " + this.state.height  / 10 }</h3>


                  <h3>{ "WT " +this.state.weight / 10 + " lbs."}</h3>

                </div>

                <div className="col-xs-12 col-sm-6">

                  <img className="pictureSize" alt={ this.state.name } src={ this.state.picFront }/>

                </div>

            </div>

          </div>

          <div className="row">

              <div className="wrapper-info-2">

                  <div className="col-xs-12">

                      <p>{ this.state.description.replace(/\s/g, " ") }</p>

                  </div>

              </div>
          </div>

          <br/>

          <div className="row">

            <div className="wrapper-info-3">

              <div className="col-xs-12 col-md-6">

                  <div className='wrapperblocks' id="wrapperblocks">
                    {loading_map ? (<div className="loader"></div>) : null}

                    {/* {indents.replace(/ /g,"_")} */}
                    {indents}

                    <img className={loading_map ? 'opacity wrapperblocks' : null} src="kanto.png" alt="pokemon map van kanto"/>

                  </div>

                  <br/>

              </div>
              <div className="col-xs-12 col-md-12 col-lg-6">

                <ul id="locationwrapper">

                  {locationFinal}

                </ul>

              </div>
              
            </div>

          </div>

        </div>

        <br/><br/>

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

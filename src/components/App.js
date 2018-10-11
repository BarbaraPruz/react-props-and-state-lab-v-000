import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (filterType) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: filterType
      }
    });
  }

  onFindPetsClick = () => {
    let url='/api/pets';
    if (this.state.filters.type !== 'all') {
      url+=`?type=${this.state.filters.type}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({pets: data }));
  }

  onAdoptPet = (petId) => {
    let updatedPets = this.state.pets
    let petToUpdate = updatedPets.findIndex( (p) => p.id === petId);
    updatedPets[petToUpdate].isAdopted = true;
    this.setState({
      pets: updatedPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

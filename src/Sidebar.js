//adapted from https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/


import React, { Component } from 'react';

class Sidebar extends Component {


  constructor(props) {
    super(props)

    this.state = {
      query: '',

    }
  }


  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }



  render() {
    return (

      <div className="options-box">
        <h1>Find Your Way</h1>

        <div>
          <input id="show-listings" type="text" onChange={(event) => this.updateQuery(event.target.value)} />

          <input id="filter" type="button" value="Filter"
            onClick={() => this.props.onSearch(this.state.query)}
          />
          <hr />
          <ul>
            {this.props.places.map(place => {
              return (<li key={place.id}>{place.name}</li>)
            })}
          </ul>
        </div>
      </div>

    )

  }
}

export default Sidebar;
//adapted from https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/

import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import Sidebar from './Sidebar'



export class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      places: [],
      pagination: null,
      searchItem: 'cafe',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.onReady = this.onReady.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }

  }



  renderMarkers = () => {
    if (!this.state.places) { return null; }
    return this.state.places.map(place => {
      return (<Marker key={place.id}
        name={place.id}
        position={place.geometry.location}
        onClick={this.onMarkerClick}
      >
        {
          this.state.showingInfoWindow &&

          <InfoWindow onCloseClick={() => this.setState({ showingInfoWindow: false })}>
            <div>
              <h4>{place.name} hi</h4>
            </div>
          </InfoWindow>

        }
      </Marker>)
    })
  }


  onReady = (mapProps, map) => this.searchNearby(map, map.center);

  searchNearby = (map, center) => {
    const { google } = this.props;

    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: center,
      radius: '500',
      type: this.state.searchItem
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK)
        this.setState({ places: results });
    });
  };

  searchItem = (query) => {
    if (query) {
      this.setState({ searchItem: query })
    }

  }


  render() {
    console.log(this.state.searchItem)
    return (
      <div className="container">
        <div id="map">
          <Map
            google={this.props.google}
            onReady={this.onReady.bind(this)}
            onClick={this.onMapClicked}
          >

            {this.renderMarkers()}

          </Map>
        </div>
        <Sidebar places={this.state.places}
          onSearch={(query) => {
            this.searchItem(query)
          }}

        />

      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDyDTQYZsO56VMhkOel5aPghLH2nX_3SIQ'
})(MapContainer)
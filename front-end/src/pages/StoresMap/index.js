import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Header from '../../components/Header';

const stores = [
  {
    lat: -19.930693,
    lng: -43.934909,
  },
  {
    lat: -19.932977,
    lng: -43.937686,
  },
  {
    lat: -19.934443,
    lng: -43.934534,
  },
  {
    lat: -19.939882,
    lng: -43.934737,
  },
  {
    lat: -19.933639,
    lng: -43.932935,
  },
];

const sellers = [
  {
    stoeName: "Bebidas SL",
    products: ["Água: R$: 0.99", "Refrigente: R$: 1.99"],
  },
  {
    stoeName: "Distribuidora AM",
    products: ["Água: R$: 0.99", "Refrigente: R$: 1.99", "Suco: R$: 2.39"],
  },
  {
    stoeName: "Mercado Sparta",
    products: ["Água: R$: 0.99"],
  },
  {
    stoeName: "Store",
    products: ["Água: R$: 0.99", "Refrigente: R$: 1.99"],
  },
  {
    stoeName: "Drinks 24h",
    products: ["Suco: R$: 2.39", "Refrigente: R$: 1.99"],
  },
];

const onMarkerClick = (e, setState) => {
  setState({
    selectedPlace: e.name,
    selectedPlaceProducts: e.products,
    activeMarker: e.position,
    showingInfoWindow: true,
  });
};

const onMapClicked = (state, setState) => {
  if (state.showingInfoWindow) {
    setState({
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: "",
      selectedPlaceProducts: [],
    });
  }
};

const StoresMap = (props) => {
  const [state, setState] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: "",
    selectedPlaceProducts: [],
  });
  return (
    <div>
      <Header categories={["700m", "2km", "5km ou mais"]}/>
      <Map
        google={props.google}
        zoom={16}
        initialCenter={{ lat: -19.934344, lng: -43.935169 }}
        onClick={() => onMapClicked(state, setState)}
        mapTypeControl={false}
        style={{ width: "414px", height: "100hv" }}
      >
        {stores.map((marker, index) => (
          <Marker
            name={sellers[index].stoeName}
            products={sellers[index].products}
            key={`${sellers[index].stoeName}-${index}`}
            position={marker}
            onClick={(e) => onMarkerClick(e, setState)}
          />
        ))}
        <InfoWindow
          position={state.activeMarker}
          visible={state.showingInfoWindow}
        >
          <div>
            <h2>{state.selectedPlace}</h2>
            {state.selectedPlaceProducts.map((product) => (
              <p>{product}</p>
            ))}
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCWoGhhC5t7sdxEZg1h3ggFz24RWoFHzuE",
})(StoresMap);

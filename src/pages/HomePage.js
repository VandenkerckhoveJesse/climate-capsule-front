import { useState, useMemo } from "react";
import { MapContainer, TileLayer, useMapEvents, ZoomControl, Marker, Popup } from "react-leaflet";
import SideBar from "../components/SideBar/SideBar";
import storyClosed from "../components/Map/storyClosed";
import storyOpen from "../components/Map/storyOpen";
import Locations from "./locations";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { useSuggestions } from "../hooks/useSuggestions";

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.setZoom(13);
            map.flyTo(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>Current Location</Popup>
        </Marker>
    );
}

function MultipleMarkers({ onMarkerClick }) {

  return Locations.location.map((x) => {
    return <Markers place={x} markerClick={onMarkerClick} />
  })
}

function Markers({ place, markerClick })
 {
  const eventHandlers = useMemo(
    () => ({
      click() {
        markerClick(place);
      }
    }),
    [],)

  return (
    <Marker position={place}
      icon={storyClosed}
      eventHandlers={eventHandlers}>
      <Popup>Marker</Popup>
    </Marker>
  )
 }
const HomePage = () => {
  const [icon, setIcon] = useState(storyClosed)
  const changeIcon = () => {
    setIcon(storyOpen)
  }

    const [searchPlace, setSearchPlace] = useState("");
    const [searchRadius, setSearchRadius] = useState(1);

    const [selectedPlace, setSelectedPlace] = useState(null);

    const { suggestions, isLoading } = useSuggestions({
        place: searchPlace,
        radius: searchRadius,
    });

    const handleSuggestionSelect = place => {
        // we can here do something with the selected suggestion,
        // for example, move the map to the suggestion location
        setSelectedPlace(place);
    };

    const handleGoBackToSearch = () => {
        setSelectedPlace(null);
    };

    return (
        <div>
            <SideBar
                setSearchPlace={setSearchPlace}
                setSearchRadius={setSearchRadius}
                suggestions={suggestions}
                isLoading={isLoading}
                onSuggestionSelect={handleSuggestionSelect}
                onGoBackToSearch={handleGoBackToSearch}
                selectedPlace={selectedPlace}
            />
            <MapContainer
                className="map-container"
                center={[50.8476, 4.3572]}
                zoom={8}
                scrollWheelZoom={false}
                zoomControl={false}>
                <ZoomControl position="bottomright" />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
                <Marker icon={icon} position={[50.62984, 4.86382]} onClick={() => changeIcon()}>
                    <Popup>A Story</Popup>
                </Marker>
                <MultipleMarkers onMarkerClick={handleSuggestionSelect} />
            </MapContainer>
        </div>
    );
};

export default HomePage;

import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, ZoomControl, Marker, Popup } from "react-leaflet";
import SideBar from "../components/SideBar/SideBar";
import storyClosed from "../components/Map/storyClosed";
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

const handleClick = () => {};

const HomePage = () => {
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
                <Marker icon={storyClosed} position={[50.62984, 4.86382]} onClick={handleClick}>
                    <Popup>A Story</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default HomePage;

import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, ZoomControl, Marker, Popup } from "react-leaflet";
import SideBar from "../components/SideBar/SideBar";
import storyClosed from "../components/Map/storyClosed";
import storyOpen from "../components/Map/storyOpen";
import Locations from "./locations";
import * as L from "leaflet";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { usePlaces } from "../hooks/usePlaces";

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

function MultipleMarkers() {
    return Locations.location.map(x => {
        let position = L.latLng(x["lat"], x["lng"]);
        return (
            <Marker position={position} icon={storyClosed}>
                <Popup>Marker</Popup>
            </Marker>
        );
    });
}

const DEFAULT_FILTERS = {
    searchPlace: "",
    searchRadius: 1,
};

const HomePage = () => {
    const [icon, setIcon] = useState(storyClosed);
    const changeIcon = () => {
        setIcon(storyOpen);
    };

    const [searchPlace, setSearchPlace] = useState(DEFAULT_FILTERS.searchPlace);
    const [searchRadius, setSearchRadius] = useState(DEFAULT_FILTERS.searchRadius);

    const [selectedPlace, setSelectedPlace] = useState(null);

    const { places, isLoading } = usePlaces({
        place: searchPlace,
        radius: searchRadius,
    });

    const handlePlaceSelect = place => {
        // we can here do something with the selected place,
        // for example, move the map to the place location
        setSelectedPlace(place);
    };

    const handleGoBackToSearch = () => {
        setSelectedPlace(null);
    };

    return (
        <div>
            <SideBar
                searchPlace={searchPlace}
                setSearchPlace={setSearchPlace}
                searchRadius={searchRadius}
                setSearchRadius={setSearchRadius}
                places={places}
                isLoading={isLoading}
                onPlaceSelect={handlePlaceSelect}
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
                <MultipleMarkers />
            </MapContainer>
        </div>
    );
};

export default HomePage;

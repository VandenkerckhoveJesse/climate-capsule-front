import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, ZoomControl, Marker, Popup, Polyline } from "react-leaflet";
import SideBar from "../components/SideBar/SideBar";
import storyClosed from "../components/Map/storyClosed";
import { usePlaces, useFilter, useAdventure } from "../hooks/usePlaces";
import redLocator from "../components/Map/RedMarker";
import NewAdventure from "../components/Adventure/newAdventure";

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        locationfound(e) {
            setPosition(e.latlng);
            map.setZoom(13);
            map.flyTo(e.latlng);
        },
    });

    useEffect(() => {
        map.locate();
    }, [map]);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>Current Location</Popup>
        </Marker>
    );
}

const SelectedLocationMarker = ({ selectedLocation, setSelectedLocation }) => {
    const map = useMapEvents({
        click(e) {
            map.setZoom(13);
            setSelectedLocation(e.latlng);
            map.flyTo(e.latlng);
        },
    });

    return selectedLocation === null ? null : (
        <Marker position={selectedLocation} icon={redLocator}>
            <Popup>Selected Location</Popup>
        </Marker>
    );
};

const DEFAULT_FILTERS = {
    searchPlace: "",
    searchRadius: 1,
};

function MultipleMarkers({ places, onMarkerClick }) {
    return places.map(place => <SingleMarker place={place} onMarkerClick={onMarkerClick} />);
}

function SingleMarker({ place, onMarkerClick }) {
    const eventHandlers = {
        click() {
            onMarkerClick(place);
        },
    };

    return (
        <Marker position={place.location} icon={storyClosed} eventHandlers={eventHandlers}>
            <Popup>Marker</Popup>
        </Marker>
    );
}

const HomePage = () => {
    const [searchPlace, setSearchPlace] = useState(DEFAULT_FILTERS.searchPlace);
    const [searchRadius, setSearchRadius] = useState(DEFAULT_FILTERS.searchRadius);
    const [isAddStoryMode, setIsAddStoryMode] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const [selectedPlace, setSelectedPlace] = useState(null);

    const { places, isLoading } = usePlaces({});

    const { filteredPlaces, isLoading: loading } = useFilter({
        place: searchPlace,
        radius: searchRadius,
    });

    const { adventure, isLoading: loaingAdventure } = useAdventure({});
    const greenOptions = { color: 'red' }

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
                filteredPlaces={filteredPlaces}
                loading={loading}
                onPlaceSelect={handlePlaceSelect}
                onGoBackToSearch={handleGoBackToSearch}
                selectedPlace={selectedPlace}
                isAddStoryMode={isAddStoryMode}
                setIsAddStoryMode={setIsAddStoryMode}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
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
                <LocationMarker isAddStoryMode={isAddStoryMode} onLocationSelected={setSelectedLocation} />
                {isAddStoryMode && (
                    <SelectedLocationMarker
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                    />
                )}
                {places && <MultipleMarkers places={places} onMarkerClick={handlePlaceSelect} />}
                {loaingAdventure ? (<div>Loading...</div>) : <Polyline pathOptions={greenOptions} positions={adventure.path.coordinates} />}
            </MapContainer>
        </div>
    );
};

export default HomePage;

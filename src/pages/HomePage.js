import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import SideBar from "../components/SideBar/SideBar";

const HomePage = () => {
    return (
        <div>
            <SideBar />
            <MapContainer className="map-container" center={[51.0, 19.0]} zoom={4} maxZoom={18}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </div>
    );
};

export default HomePage;

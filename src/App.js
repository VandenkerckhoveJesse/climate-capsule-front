import './App.css';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

function App() {
    const handleSubmit = event => {
        if (event.key === 'Enter') {
            alert(event.target.value);
        }
    }

    return (
        <div className="App">
            <h1>home page</h1>
            <div>
                {/*  write a basic search field */}
                <input type="text" placeholder="search" onKeyDown={handleSubmit}/>
                <h1>map container</h1>
                <MapContainer
                    className="markercluster-map"
                    center={[51.0, 19.0]}
                    zoom={4}
                    maxZoom={18}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            </div>
        </div>
    );
}

export default App;

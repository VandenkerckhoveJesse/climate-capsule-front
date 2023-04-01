import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, ZoomControl } from "react-leaflet";
import SideBar from "../components/SideBar/SideBar";

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map =useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  // return position === null ? null : (
  //   <Marker position={position}>
  //     <Popup>Current Location</Popup>
  //   </Marker>
  // )
}


const HomePage = () => {
    return (
        <div>
            <SideBar />
            <MapContainer
              className="map-container"
              center={[51.0, 19.0]}
              zoom={4}
              maxZoom={18}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
              <LocationMarker />
            </MapContainer>
        </div>
    );
};

export default HomePage;

import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, ZoomControl, Marker, Popup } from "react-leaflet";
import SideBar from "../components/SideBar/SideBar";

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map =useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.setZoom(13)
      map.flyTo(e.latlng)
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Current Location</Popup>
    </Marker>
  )
}


const HomePage = () => {
    return (
        <div>
            {/* <SideBar /> */}
            <MapContainer
              className="map-container"
              center={[50.8476, 4.3572]}
              zoom={8}
              scrollWheelZoom={false}>
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

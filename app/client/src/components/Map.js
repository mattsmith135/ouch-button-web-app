import React from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map({ coordinates, zoom, radius, color }) {
    return (
        <MapContainer center={coordinates} zoom={zoom}>
            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {coordinates && (
                <Circle center={coordinates} radius={radius} pathOptions={{color: color}}/>
            )}
        </MapContainer>
    )
}

export default Map; 
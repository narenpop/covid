import React from 'react'
import './Map.css'
import {Map as leaflet,TileLayer} from 'react-leaflet'

export default function Map({centre,zoom}) {
    return (
        <div className="map">
        <leaflet center={centre} zoom={zoom}>
                <TileLayer
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution='&copy; <a href="https://osm.org/copyright">
                       OpenStreetMap
                   </a>contributors'
                />
            </leaflet>
            
        </div>
    )
}

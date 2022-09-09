import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api'
import React, { useState } from 'react'

interface IMap {
    lat?: number,
    lng?: number
}

const Map = ({ lat, lng }: IMap) => {

    if (lat === null || lng === null) {
        lat = 46.30;
        lng = 16.33;
    }

    return (
        <>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '500px' }}
                center={{ lat: lat, lng: lng }}
                zoom={13}
            >
                <Marker position={{ lat: lat, lng: lng }}></Marker>
            </GoogleMap >)
        </>
    )
}

export default Map
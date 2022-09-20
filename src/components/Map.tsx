import { GoogleMap, Marker } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'

interface IMap {
    lat?: number,
    lng?: number
}

const Map = ({ lat, lng }: IMap) => {

    const [latLng, setLatLng] = useState<IMap>({
        lat: 46.30,
        lng: 16.33
    })

    useEffect(() => {
        setLatLng({ lat: lat, lng: lng })
    }, [lat, lng])

    return (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '500px' }}
            center={{ lat: latLng.lat, lng: latLng.lng }}
            zoom={13}
        >
            <Marker position={{ lat: latLng.lat, lng: latLng.lng }}></Marker>
        </GoogleMap >
    )
}

export default Map
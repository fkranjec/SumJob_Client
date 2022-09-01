import { GoogleMap, LoadScript } from '@react-google-maps/api'
import React from 'react'


const Map = (props: any) => {


    return (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '500px' }}
            center={{ lat: 45.12, lng: 16.7 }}
            zoom={13}
        >

        </GoogleMap>
    )
}

export default Map
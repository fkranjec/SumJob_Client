import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const params = useParams();
    useEffect(() => {
        console.log(params);
    }, [])
    return (
        <div>Profile {params.id}</div>
    )
}

export default Profile
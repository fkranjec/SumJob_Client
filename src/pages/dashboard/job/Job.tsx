import React from 'react'
import { useParams } from 'react-router-dom';

const Job = () => {
    const params = useParams();
    return (
        <div>Job {params.id}</div>
    )
}

export default Job
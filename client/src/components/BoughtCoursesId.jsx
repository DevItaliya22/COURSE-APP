import React from 'react'
import { useParams } from 'react-router-dom'

function BoughtCoursesId() {

    const {id}=useParams();

  return (
    <div>{id}</div>
  )
}

export default BoughtCoursesId
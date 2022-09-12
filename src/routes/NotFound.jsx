import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../components/Title'

const NotFound = () => {
  return (
    <div className='container'>
        <Title text='404'></Title>
        <Link to="/" >Voler</Link>
    </div>
  )
}

export default NotFound
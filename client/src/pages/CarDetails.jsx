import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCarById, deleteCar } from '../services/CarsAPI'
import '../App.css'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)

  useEffect(() => {
    const loadCar = async () => {
      const data = await getCarById(id)
      setCar(data)
    }
    loadCar()
  }, [id])

  const handleDelete = async () => {
    await deleteCar(id)
    navigate('/customcars')
  }

  if (!car) {
    return <p>Loading...</p>
  }

  return (
    <div className='car-details-page'>
      <h1>{car.name}</h1>

      <ul>
        <li>Exterior Color: {car.exterior_color}</li>
        <li>Wheels: {car.wheels}</li>
        <li>Roof: {car.roof}</li>
        <li>Interior: {car.interior}</li>
        <li>Price: ${Number(car.price).toLocaleString()}</li>
      </ul>

      <Link to={`/edit/${car.id}`}>Edit This Car</Link>
      <button onClick={handleDelete}>Delete This Car</button>
      <Link to='/customcars'>Back to All Cars</Link>
    </div>
  )
}

export default CarDetails
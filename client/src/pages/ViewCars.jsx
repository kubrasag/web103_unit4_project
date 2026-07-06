import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import '../App.css'

const ViewCars = () => {
  const [cars, setCars] = useState([])

  const loadCars = async () => {
    const data = await getAllCars()
    setCars(data)
  }

  useEffect(() => {
    loadCars()
  }, [])

  const handleDelete = async (id) => {
    await deleteCar(id)
    loadCars()
  }

  return (
    <div className='view-cars-page'>
      <h1>My Custom Cars</h1>

      {cars.length === 0 && <p>No cars yet. Go customize one!</p>}

      <div className='cars-list'>
        {cars.map((car) => (
          <div key={car.id} className='car-card'>
            <h2>{car.name}</h2>
            <p>Color: {car.exterior_color}</p>
            <p>Wheels: {car.wheels}</p>
            <p>Roof: {car.roof}</p>
            <p>Interior: {car.interior}</p>
            <p>Price: ${Number(car.price).toLocaleString()}</p>

            <Link to={`/customcars/${car.id}`}>View Details</Link>
            <Link to={`/edit/${car.id}`}>Edit</Link>
            <button onClick={() => handleDelete(car.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewCars
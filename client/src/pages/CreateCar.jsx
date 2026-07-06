import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/CarsAPI'
import { exteriorColors, wheelOptions, roofOptions, interiorOptions } from '../utilities/carOptions'
import { calculateTotalPrice } from '../utilities/calcPrice'
import { validateCombination } from '../utilities/validation'
import '../App.css'
import { renderWheel, renderRoof } from '../utilities/carVisuals'


const CreateCar = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [exteriorColor, setExteriorColor] = useState(exteriorColors[0].name)
  const [wheels, setWheels] = useState(wheelOptions[0].name)
  const [roof, setRoof] = useState(roofOptions[0].name)
  const [interior, setInterior] = useState(interiorOptions[0].name)
  const [error, setError] = useState('')

  const selections = { exteriorColor, wheels, roof, interior }
  const totalPrice = calculateTotalPrice(selections)
  const selectedColorHex = exteriorColors.find((c) => c.name === exteriorColor)?.hex

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Please give your car a name.')
      return
    }

    const validation = validateCombination(selections)
    if (!validation.valid) {
      setError(validation.message)
      return
    }

    const newCar = {
      name,
      exterior_color: exteriorColor,
      wheels,
      roof,
      interior,
      price: totalPrice
    }

    await createCar(newCar)
    navigate('/customcars')
  }

  return (
    <div className='create-car-page'>
      <h1>Customize Your Car</h1>

      {/* Görsel önizleme: renk, jant ve tavan seçime göre değişir */}
      <svg viewBox="0 0 200 100" width="300" height="150">
        <rect x="10" y="50" width="180" height="30" rx="10" fill={selectedColorHex} />
        {renderRoof(roof, selectedColorHex)}
        {renderWheel(50, 85, wheels)}
        {renderWheel(150, 85, wheels)}
      </svg>

      {error && <p className='error-message' style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Car Name
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='My Dream Car'
          />
        </label>

        <label>
          Exterior Color
          <select value={exteriorColor} onChange={(e) => setExteriorColor(e.target.value)}>
            {exteriorColors.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} {c.price > 0 ? `(+$${c.price})` : ''}
              </option>
            ))}
          </select>
        </label>

        <label>
          Wheels
          <select value={wheels} onChange={(e) => setWheels(e.target.value)}>
            {wheelOptions.map((w) => (
              <option key={w.name} value={w.name}>
                {w.name} {w.price > 0 ? `(+$${w.price})` : ''}
              </option>
            ))}
          </select>
        </label>

        <label>
          Roof
          <select value={roof} onChange={(e) => setRoof(e.target.value)}>
            {roofOptions.map((r) => (
              <option key={r.name} value={r.name}>
                {r.name} {r.price > 0 ? `(+$${r.price})` : ''}
              </option>
            ))}
          </select>
        </label>

        <label>
          Interior
          <select value={interior} onChange={(e) => setInterior(e.target.value)}>
            {interiorOptions.map((i) => (
              <option key={i.name} value={i.name}>
                {i.name} {i.price > 0 ? `(+$${i.price})` : ''}
              </option>
            ))}
          </select>
        </label>

        <h2>Total Price: ${totalPrice.toLocaleString()}</h2>

        <button type='submit'>Save My Car</button>
      </form>
    </div>
  )
}

export default CreateCar
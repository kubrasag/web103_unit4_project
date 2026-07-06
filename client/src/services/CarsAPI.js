const BASE_URL = 'http://localhost:3000/api/cars'


const getAllCars = async () => {
  try {
    const response = await fetch(BASE_URL)
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Error fetching cars:', err)
    return []
  }
}


const getCarById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`)
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Error fetching car:', err)
  }
}


const createCar = async (car) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car)
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Error creating car:', err)
  }
}


const updateCar = async (id, car) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car)
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Error updating car:', err)
  }
}


const deleteCar = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Error deleting car:', err)
  }
}

export { getAllCars, getCarById, createCar, updateCar, deleteCar }
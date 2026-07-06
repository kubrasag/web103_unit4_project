import { pool } from '../config/database.js'


const getAllCars = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY id ASC')
    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch cars' })
  }
}


const getCarById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM cars WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }

    res.status(200).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch car' })
  }
}


const createCar = async (req, res) => {
  try {
    const { name, exterior_color, wheels, roof, interior, price } = req.body

    const result = await pool.query(
      `INSERT INTO cars (name, exterior_color, wheels, roof, interior, price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, exterior_color, wheels, roof, interior, price]
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create car' })
  }
}


const updateCar = async (req, res) => {
  try {
    const { id } = req.params
    const { name, exterior_color, wheels, roof, interior, price } = req.body

    const result = await pool.query(
      `UPDATE cars
       SET name = $1, exterior_color = $2, wheels = $3, roof = $4, interior = $5, price = $6
       WHERE id = $7
       RETURNING *`,
      [name, exterior_color, wheels, roof, interior, price, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }

    res.status(200).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update car' })
  }
}


const deleteCar = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }

    res.status(200).json({ message: 'Car deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete car' })
  }
}

export { getAllCars, getCarById, createCar, updateCar, deleteCar }
import { pool } from './database.js'

const createCarsTable = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS cars;

      CREATE TABLE cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        exterior_color VARCHAR(50) NOT NULL,
        wheels VARCHAR(50) NOT NULL,
        roof VARCHAR(50) NOT NULL,
        interior VARCHAR(50) NOT NULL,
        price NUMERIC(10, 2) NOT NULL
      );
    `)
    console.log('Cars table created successfully')
  } catch (err) {
    console.error('Error creating cars table:', err)
  } finally {
    pool.end()
  }
}

createCarsTable()
 import { BASE_PRICE, exteriorColors, wheelOptions, roofOptions, interiorOptions } from './carOptions'

const findPrice = (options, name) => {
  const match = options.find((opt) => opt.name === name)
  return match ? match.price : 0
}

export const calculateTotalPrice = (selections) => {
  const { exteriorColor, wheels, roof, interior } = selections

  const total =
    BASE_PRICE +
    findPrice(exteriorColors, exteriorColor) +
    findPrice(wheelOptions, wheels) +
    findPrice(roofOptions, roof) +
    findPrice(interiorOptions, interior)

  return total
}
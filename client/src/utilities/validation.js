export const validateCombination = (selections) => {
  const { roof, wheels } = selections

  if (roof === 'Convertible' && wheels === 'Off-road') {
    return {
      valid: false,
      message: 'Convertible roof cannot be combined with Off-road wheels.'
    }
  }

  return { valid: true, message: '' }
}
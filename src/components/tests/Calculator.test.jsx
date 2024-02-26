import { describe, expect, it } from 'vitest'
import { suma } from '../Calculator'

describe('Suma', () => {
  it('Suma should be function', () => {
    expect(typeof suma).toBe('function')
  })

  it('Suma should sumar', () => {
    expect(suma(3, 4)).toBe(7)
  })
})

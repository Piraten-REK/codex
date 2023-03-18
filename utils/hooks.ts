import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export const useToggle = (initialValue: boolean): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(initialValue)
  const toggleValue = (): void => setValue(prev => !prev)

  return [value, toggleValue, setValue]
}

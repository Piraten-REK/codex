import { useMemo, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export const useToggle = (initialValue: boolean): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(initialValue)
  const toggleValue = (): void => setValue(prev => !prev)

  return [value, toggleValue, setValue]
}

export const useClassName = (stylesClass: string, ...classes: Array<string | undefined | false>): string => {
  return useMemo(
    () => [stylesClass].concat(classes.filter(Boolean)).join(' '),
    [classes]
  )
}

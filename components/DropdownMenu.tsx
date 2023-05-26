import { useDropdownMenu, DropdownMenuProps as BaseProps } from '@restart/ui/DropdownMenu'
import { ElementType, FC, PropsWithChildren, useLayoutEffect } from 'react'
import styles from '@/styles/Dropdown.module.css'
import { useClassName } from '@/utils'

export interface DropdownMenuProps extends Omit<BaseProps, 'children'> {
  className?: string
  as?: ElementType
}

const DropdownMenu: FC<PropsWithChildren<DropdownMenuProps>> = ({ className: additionalClassName, as: Component = 'ul', ...props }) => {
  const className = useClassName(styles.menu, additionalClassName)

  const [menuProps, meta] = useDropdownMenu(props)

  useLayoutEffect(() => {
    meta.popper?.update()
  }, [])

  return (
    <Component className={className} {...props} {...menuProps} aria-hidden={!meta.show} />
  )
}

export default DropdownMenu

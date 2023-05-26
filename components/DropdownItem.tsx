import { useDropdownItem, DropdownItemProps as BaseProps } from '@restart/ui'
import { ElementType, FC, PropsWithChildren } from 'react'
import styles from '@/styles/Dropdown.module.css'
import { useClassName } from '@/utils'

export interface DropdownItemProps extends Omit<BaseProps, 'children'> {
  className?: string
  as?: ElementType
}

const DropdownItem: FC<PropsWithChildren<DropdownItemProps>> = ({ className: additionalClassName, as: Component = 'button', ...props }) => {
  const className = useClassName(styles.item, additionalClassName)

  const [itemProps] = useDropdownItem(props)

  return <Component className={className} {...props} {...itemProps} />
}

export default DropdownItem

import { useClassName } from '@/utils'
import { useDropdownToggle } from '@restart/ui'
import { ElementType, FC, PropsWithChildren } from 'react'
import styles from '@/styles/Dropdown.module.css'

export interface DropdownToggleProps {
  className?: string
  tabIndex?: number
  as?: ElementType
}

const DropdownToggle: FC<PropsWithChildren<DropdownToggleProps>> = ({ className: additionalClassName, as: Component = 'button', tabIndex = 0, ...props }) => {
  const className = useClassName(styles.toggle, additionalClassName)

  const [toggleProps] = useDropdownToggle()

  return <Component className={className} tabIndex={tabIndex} {...props} {...toggleProps} />
}

export default DropdownToggle

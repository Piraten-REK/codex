import { Dropdown } from '@restart/ui'
import DropdownItem from './DropdownItem'
import DropdownMenu from './DropdownMenu'
import DropdownToggle from './DropdownToggle'

export default Object.assign(Dropdown, {
  Item: DropdownItem,
  Menu: DropdownMenu,
  Toggle: DropdownToggle
})

export type { DropdownItemProps } from './DropdownItem'
export type { DropdownMenuProps } from './DropdownMenu'
export type { DropdownToggleProps } from './DropdownToggle'

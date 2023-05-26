import { FC, PropsWithChildren } from 'react'
import { useNavItem, UseNavItemOptions } from '@restart/ui'

export interface TabProps {
  eventKey: NonNullable<UseNavItemOptions['key']>
}

export const Tab: FC<PropsWithChildren<TabProps>> = ({ eventKey, children }) => {
  const [navItemProps] = useNavItem({
    key: eventKey
  })

  return (
    <button {...navItemProps}>{children}</button>
  )
}

export { Tabs, Nav as Menu, TabPanel } from '@restart/ui'

import { FC, useCallback } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { useRouter } from 'next/router'

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & {
  activeClassName?: string
} & NextLinkProps

const Link: FC<LinkProps> = ({ activeClassName = 'active', className = '', href, ...props }) => {
  const router = useRouter()

  const getClassName = useCallback(() => {
    let classes = className

    if (router.asPath === href) classes += (classes.length > 0 ? ' ' : '') + activeClassName

    return classes
  }, [activeClassName, className, router])

  return <NextLink className={getClassName()} href={href} {...props} />
}

export default Link

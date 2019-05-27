import React from 'react'
import styles from './styles.module.scss'
import { NavLink } from 'react-router-dom'
import Icon from '@base/Icon/index'
interface Props {
    children?: React.ReactNode,
    className?: string | undefined,
    isRouter?: Boolean,
    path?: string,
    target?: string,
    hasLine?: Boolean
}
const defaultPath = window.location.pathname
export default function Entry({ isRouter = true, className, path = defaultPath, children, target, hasLine = false }: Props) {
    const classList = [styles.entryItem, className ? className : undefined, hasLine ? styles.line : undefined].join(' ')
    if (isRouter && path !== defaultPath) {
        return <NavLink to={path} className={classList} target={target}>{children}<Icon className={styles.entryIcon} icon="nav_icon_go" /></NavLink>
    }
    return <a href={path} className={classList} target={target}> {children} <Icon className={styles.entryIcon} icon="nav_icon_go" /></a>
}
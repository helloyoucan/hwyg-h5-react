import React, { Component } from 'react'
import styles from './styles.module.scss'
import { NavLink } from 'react-router-dom'
interface Props {
    children?: React.ReactNode,
    className?: string | undefined,
    isRouter?: Boolean,
    path: string,
    target: string
}
export default function Entry(props: Props) {
    return (
        <NavLink
            to={props.path}
            className={[styles.entryGroup, props.className ? props.className : undefined].join(' ')}>
            {props.children}
        </NavLink>)
}
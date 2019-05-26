import React, { Component } from 'react'
import styles from './styles.module.scss'
interface Props {
    children?: React.ReactNode,
    className?: string | undefined
}
export default function EntryGroup(props: Props) {
    return (<div className={[styles.entryGroup, props.className ? props.className : undefined].join(' ')}>{props.children}</div>)
}
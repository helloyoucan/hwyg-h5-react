import React from 'react'
import styles from './index.module.scss'
interface Props{
    className?:String,
    onClick?:(event)=>void,
    icon?:String
}
export default class Icon extends React.Component<any,{}>{
    render(){
        const icon:Props = this.props.icon
        let {className,onClick}:Props = this.props
        const classNameList:[String] = [styles.icon]
        className&&classNameList.push(className)
        return (
            <svg className={[styles.icon,className].join(' ')} onClick={onClick} aria-hidden="true">
                <use xlinkHref={`#${icon}`}></use>
            </svg>
        )
    }
}
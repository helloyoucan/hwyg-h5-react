import React, { Component } from 'react'
import './index.module.scss'
interface Props {
    className?: String,
    onClick?: (event: any) => void,
    icon?: String
}
export default class Icon extends Component<Props, any>{
    render() {
        const icon: any = this.props.icon
        let { className, onClick }: Props = this.props
        const classNameList: [String] = ["global_icon"]
        className && classNameList.push(className)
        return (
            <svg className={classNameList.join(' ')} onClick={onClick} aria-hidden="true">
                <use xlinkHref={`#${icon}`}></use>
            </svg>
        )
    }
}
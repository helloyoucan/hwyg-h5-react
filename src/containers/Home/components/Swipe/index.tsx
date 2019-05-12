import React, { Component } from 'react'
import styles from './styles.module.scss'
function renderChildren(children: React.ReactNode | [] | any) {//遍历所有子组件
    return React.Children.map(children, child => {
        //克隆每一个对象
        return React.cloneElement(child, { width: `${(1 / children.length) * 100}%` })
    })
}
export default class Swipe extends Component {
    state = {
        childrenNodeList: [],
        swipeContainerStyles: {},
        timeId: undefined
    }
    constructor(props:any) {
        super(props)
        this.stratChangeSwipeItem = this.stratChangeSwipeItem.bind(this)
    }
    stratChangeSwipeItem() {
        const timeId = setInterval(() => {
            const swipeContainerStyles = { transform: `translate3d(-${(1 / this.state.childrenNodeList.length) * 100}%,0,0)`, transition: 'transform 1s' }
            this.setState({ swipeContainerStyles }, () => {
                const childrenNodeList: Array<any> = this.state.childrenNodeList
                setTimeout(() => {
                    const swipeContainerStyles = { transform: 'translate3d(0,0,0)', transition: 'none' }
                    childrenNodeList.push(childrenNodeList.shift())
                    this.setState({ swipeContainerStyles, childrenNodeList })
                }, 1000)
            })
        }, 5000)
        this.setState({ timeId })
    }
    componentDidMount() {
        this.setState({
            childrenNodeList: renderChildren(this.props.children)
        }, () => {
            this.stratChangeSwipeItem()
        })
    }
    componentWillReceiveProps() {
        this.state.timeId && clearInterval(this.state.timeId)
        this.setState({
            childrenNodeList: renderChildren(this.props.children)
        }, () => {
            this.stratChangeSwipeItem()
        })
    }
    componentWillUnmount() {
        this.state.timeId && clearInterval(this.state.timeId)
    }
    render() {
        let { childrenNodeList, swipeContainerStyles } = this.state
        return (
            <div className={styles.swipe}>
                <div className={styles.swipeContainer}
                    style={{ width: `${childrenNodeList.length * 100}%`,...swipeContainerStyles}}>
                    {renderChildren(childrenNodeList)}
                </div>
            </div>
        )
    }
}
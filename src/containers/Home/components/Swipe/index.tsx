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
        timeId: undefined,
        activeIndex: 0
    }
    constructor(props: any) {
        super(props)
        this.stratChangeSwipeItem = this.stratChangeSwipeItem.bind(this)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
    }
    //启动卡片切换
    stratChangeSwipeItem() {
        const length = this.state.childrenNodeList.length
        if (length > 1) {
            const timeId = setInterval(() => {
                const swipeContainerStyles = { transform: `translate3d(-${(1 / length) * 100}%,0,0)`, transition: 'transform 1s' }
                const activeIndex = (this.state.activeIndex + 1) % length //更新索引
                this.setState({ swipeContainerStyles, activeIndex }, () => {
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
    }
    handleTouchStart(e: any) {
        console.log(e)

    }
    handleTouchMove(e: React.TouchEvent) {
        // console.log(e)

    }
    handleTouchEnd(e: React.TouchEvent) {
        // console.log(e)

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
        let { childrenNodeList, swipeContainerStyles, activeIndex } = this.state
        return (
            <div className={styles.swipe}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
            >
                <div className={styles.swipeContainer}
                    style={{ width: `${childrenNodeList.length * 100}%`, ...swipeContainerStyles }}>
                    {childrenNodeList}
                </div>
                <ul className={styles.dotsList}>
                    {childrenNodeList.map((_, index) => {
                        return (<li key={index} className={index === activeIndex ? styles.active : undefined}></li>)
                    })}
                </ul>
            </div>
        )
    }
}
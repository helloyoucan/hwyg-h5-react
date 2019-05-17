import React, { Component } from 'react'
import styles from './styles.module.scss'
function cloneChildren(children: React.ReactNode | [] | any) {//遍历所有子组件
    return React.Children.map(children, child => {
        //克隆每一个对象
        return React.cloneElement(child, { width: `${(1 / children.length) * 100}%` })
    })
}
export default class Swipe extends Component {
    state = {
        swipeContainerStyles: {},
        activeIndex: 0,
        canMove: true,
        timeId: undefined,
        childrenNodes: []
    }
    constructor(props: any) {
        super(props)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
    }
    //向右平移
    swipeToRight() {
        const childrenLength = React.Children.toArray(this.props.children).length
        const swipeContainerStyles = { transform: `translate3d(${((childrenLength > 2 ? -2 : -1) / childrenLength) * 100}%,0,0)`, transition: 'transform 1s' }//********
        const activeIndex = (this.state.activeIndex + 1 + childrenLength) % childrenLength //更新索引//********
        this.setState({ swipeContainerStyles, activeIndex, canMove: false }, () => {
            setTimeout((childrenLength,swipeContainerStyles) => {
                if (childrenLength > 2) {
                    const childrenNodes: Array<any> = this.state.childrenNodes
                    childrenNodes.push(childrenNodes.shift())//********
                    this.setState({ swipeContainerStyles: this.getResetSwipeContainerStyles(), childrenNodes, canMove: true })
                } else {
                    swipeContainerStyles.transition = 'none'
                    this.setState({ swipeContainerStyles, canMove: true })
                }
            }, 1000, childrenLength,swipeContainerStyles)
        })
    }
    //向左平移
    swipeToleft() {
        const childrenLength = React.Children.toArray(this.props.children).length
        const swipeContainerStyles = { transform: `translate3d(${(childrenLength > 2 ? 0 : 0) * 100}%,0,0)`, transition: 'transform 1s' }//********
        const activeIndex = (this.state.activeIndex - 1 + childrenLength) % childrenLength //更新索引//********
        this.setState({ swipeContainerStyles, activeIndex, canMove: false }, () => {
            setTimeout((childrenLength,swipeContainerStyles) => {
                if (childrenLength > 2) {
                    const childrenNodes: Array<any> = this.state.childrenNodes
                    childrenNodes.unshift(childrenNodes.pop())//********
                    this.setState({ swipeContainerStyles: this.getResetSwipeContainerStyles(), childrenNodes, canMove: true })
                } else {
                    swipeContainerStyles.transition = 'none'
                    this.setState({ swipeContainerStyles, canMove: true })
                }
            }, 1000, childrenLength,swipeContainerStyles)
        })
    }
    handleTouchStart(e: React.TouchEvent) {
        if (!this.state.canMove) return
        e.persist()
    }

    handleTouchMove(e: React.TouchEvent) {
        if (!this.state.canMove) return
        e.persist()
    }
    handleTouchEnd(e: React.TouchEvent) {
        if (!this.state.canMove) return
        e.persist()
    }
    stratSwitchSwipeItem() {
        this.state.timeId && clearInterval(this.state.timeId)
        const childrenLength = React.Children.toArray(this.props.children).length
        if ( childrenLength> 1) {
            const timeId = setInterval(() => {
                if(childrenLength>2||this.state.activeIndex===0){
                    this.swipeToRight()
                }else if(this.state.activeIndex===1){
                    this.swipeToleft()
                }
            }, 5000)
            this.setState({ timeId })
        }
    }
    getResetSwipeContainerStyles() {
        const children = React.Children.toArray(this.props.children)
        return { transform: `translate3d(${((children.length > 2 ? -1 : 0) / children.length) * 100}%,0,0)`, transition: 'none' }
    }
    initChildren() {
        const children = React.Children.toArray(this.props.children)
        children.length > 2 && children.unshift(children.pop()) //子组件大于2
        this.setState({
            swipeContainerStyles: this.getResetSwipeContainerStyles(),
            childrenNodes: cloneChildren(children)
        }, () => {
            this.stratSwitchSwipeItem()
        })
    }
    componentDidMount() {
        this.initChildren()
    }
    componentWillReceiveProps() {
        this.initChildren()
    }
    render() {
        const { activeIndex, swipeContainerStyles, childrenNodes } = this.state
        const children = React.Children.toArray(this.props.children)
        const childrenLength = React.Children.count(children)
        const dotsList = (<ul className={styles.dotsList}>{children.map((_, index) => (<li key={index} className={index === activeIndex ? styles.active : undefined}></li>))}</ul>)
        return (
            <div className={styles.swipe}
                onTouchStart={(e) => { childrenLength > 1 && this.handleTouchStart(e) }}
                onTouchMove={(e) => { childrenLength > 1 && this.handleTouchMove(e) }}
                onTouchEnd={(e) => { childrenLength > 1 && this.handleTouchEnd(e) }}
            >
                <div className={styles.swipeContainer}
                    style={{ width: `${childrenLength * 100}%`, ...swipeContainerStyles }}>
                    {childrenNodes}
                </div>
                {dotsList}
            </div>
        )
    }
}
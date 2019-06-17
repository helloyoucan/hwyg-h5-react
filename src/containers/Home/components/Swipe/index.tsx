import React, { Component } from 'react'
import styles from './styles.module.scss'
function cloneChildren(children: React.ReactNode | [] | any) {//遍历所有子组件
    return React.Children.map(children, child => {
        //克隆每一个对象
        return React.cloneElement(child, { width: `${(1 / children.length) * 100}%` })
    })
}
interface TargetTouche {
    pageX: number
}
interface State {
    childrenNodes: Array<React.ReactNode>,
    swipeContainerStyles: Object,
    timeId: any,
    activeIndex: number,
    targetTouche: TargetTouche,
    canMove: Boolean
}
export default class Swipe extends Component {
    state: State = {
        swipeContainerStyles: {},
        activeIndex: 0,
        canMove: true,
        timeId: undefined,
        childrenNodes: [],
        targetTouche: {
            pageX: 0
        }
    }
    $refSwipe:any = React.createRef()
    constructor(props: any) {
        super(props)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
    }
    //向右平移
    swipeToRight() {
        const childrenLength = React.Children.toArray(this.props.children).length
        const swipeContainerStyles = childrenLength > 2
            ? { transform: `translate3d(${(-2 / childrenLength) * 100}%,0,0)`, transition: 'transform 1s' }
            : { transform: `translate3d(${(-1 / childrenLength) * 100}%,0,0)`, transition: 'transform 1s' }//********
        const newActiveIndex = (this.state.activeIndex + 1 + childrenLength) % childrenLength //更新索引//********
        this.setState({ swipeContainerStyles, activeIndex: newActiveIndex, canMove: false }, () => {
            setTimeout((childrenLength, swipeContainerStyles) => {
                if (childrenLength > 2) {
                    //切换卡片位置并恢复平移位置
                    const childrenNodes: Array<any> = this.state.childrenNodes
                    childrenNodes.push(childrenNodes.shift())//********
                    this.setState({ swipeContainerStyles: this.getResetSwipeContainerStyles(), childrenNodes, canMove: true })
                } else {
                    //设置禁止过渡
                    swipeContainerStyles.transition = 'none'
                    this.setState({ swipeContainerStyles, canMove: true })
                }
            }, 1000, childrenLength, swipeContainerStyles)
        })
    }
    //向左平移
    swipeToLeft() {
        const childrenLength = React.Children.toArray(this.props.children).length
        const swipeContainerStyles = { transform: `translate3d(${0 * 100}%,0,0)`, transition: 'transform 1s' }//********
        const newActiveIndex = (this.state.activeIndex - 1 + childrenLength) % childrenLength //更新索引//********
        this.setState({ swipeContainerStyles, activeIndex: newActiveIndex, canMove: false }, () => {
            setTimeout((childrenLength, swipeContainerStyles) => {
                if (childrenLength > 2) {
                    //切换卡片位置并恢复平移位置
                    const childrenNodes: Array<any> = this.state.childrenNodes
                    childrenNodes.unshift(childrenNodes.pop())//********
                    this.setState({ swipeContainerStyles: this.getResetSwipeContainerStyles(), childrenNodes, canMove: true })
                } else {
                    //设置禁止过渡
                    swipeContainerStyles.transition = 'none'
                    this.setState({ swipeContainerStyles, canMove: true })
                }
            }, 1000, childrenLength, swipeContainerStyles)
        })
    }
    handleTouchStart(e: React.TouchEvent) {
        if (!this.state.canMove) return
        e.persist()
        this.setState({ targetTouche: { pageX: e.targetTouches[0].pageX } })
        this.state.timeId && clearInterval(this.state.timeId)
    }

    handleTouchMove(e: React.TouchEvent) {
        if (!this.state.canMove) return
        e.persist()
        const startPageX = this.state.targetTouche.pageX
        const activeIndex = this.state.activeIndex
        const movePageX = e.targetTouches[0].pageX
        const childrenLength = React.Children.toArray(this.props.children).length
        const swipeContainerStyles = childrenLength > 2
            ? { transform: `translate3d(calc(${movePageX - startPageX}px + ${(-1 / childrenLength) * 100}%),0,0)`, transition: 'none' }
            : { transform: `translate3d(calc(${movePageX - startPageX}px + ${(-activeIndex / childrenLength) * 100}%),0,0)`, transition: 'none' }
        this.setState({ swipeContainerStyles })

    }
    handleTouchEnd(e: React.TouchEvent) {
        if (!this.state.canMove) return
        e.persist()
        const startPageX = this.state.targetTouche.pageX
        const activeIndex = this.state.activeIndex
        const endPageX = e.changedTouches[0].pageX
        const clientWidth = this.$refSwipe.current.clientWidth
        const childrenLength = React.Children.toArray(this.props.children).length
        const recover = () => {
            const swipeContainerStyles = childrenLength > 2
                ? this.getResetSwipeContainerStyles()
                : { transform: `translate3d(${(-activeIndex / childrenLength) * 100}%,0,0)`, transition: 'none' }
            swipeContainerStyles.transition = 'transform .5s'
            this.setState({ swipeContainerStyles, canMove: false }, () => {
                setTimeout((swipeContainerStyles) => {
                    swipeContainerStyles.transition = 'none'
                    this.setState({ swipeContainerStyles, canMove: true })
                }, 500, swipeContainerStyles);
            })
        }
        if (Math.abs(startPageX - endPageX) > clientWidth / 3) {//滑动超过1/3
            if (endPageX > startPageX) {//触点从左往右移动，即卡片应往左切换
                if (childrenLength > 2 || activeIndex === 1) {
                    this.swipeToLeft()
                } else {//只有两个子组件且一句话到达边缘，则复原
                    recover()
                }
            } else {//触点从右往左移动，即卡片应往右切换
                if (childrenLength > 2 || activeIndex === 0) {
                    this.swipeToRight()
                } else {//只有两个子组件且一句话到达边缘，则复原
                    recover()
                }
            }
        } else {
            recover()
        }
        this.stratSwitchSwipeItem()
    }
    stratSwitchSwipeItem() {
        this.state.timeId && clearInterval(this.state.timeId)
        const childrenLength = React.Children.toArray(this.props.children).length
        if (childrenLength > 1) {
            const timeId = setInterval(() => {
                if (childrenLength > 2 || this.state.activeIndex === 0) {
                    this.swipeToRight()
                } else if (this.state.activeIndex === 1) {
                    this.swipeToLeft()
                }
            }, 5000)
            this.setState({ timeId })
        }
    }
    getResetSwipeContainerStyles() {
        const childrenLength = React.Children.toArray(this.props.children).length
        return { transform: `translate3d(${((childrenLength > 2 ? -1 : 0) / childrenLength) * 100}%,0,0)`, transition: 'none' }
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
    componentDidUpdate(prevProps:any) {
        if (this.props.children !== prevProps.children) {
            this.initChildren()
          }
        
    }
    componentWillUnmount(){
        this.state.timeId && clearInterval(this.state.timeId)
    }
    render() {
        const { activeIndex, swipeContainerStyles, childrenNodes } = this.state
        const children = React.Children.toArray(this.props.children)
        const childrenLength: number = React.Children.count(children)
        const dotsList = (<ul className={styles.dotsList}>{children.map((_, index) => (<li key={index} className={index === activeIndex ? styles.active : undefined}></li>))}</ul>)
        return (
            <div className={styles.swipe}
                ref={this.$refSwipe}
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
import React, { Component } from 'react'
import styles from './styles.module.scss'
import { number } from 'prop-types';
function renderChildren(children: React.ReactNode | [] | any) {//遍历所有子组件
    return React.Children.map(children, child => {
        //克隆每一个对象
        return React.cloneElement(child, { width: `${(1 / children.length) * 100}%` })
    })
}
interface TargetTouche{
    pageX:number,
    pageY:number
}
interface swipe{
    clientWidth:number
}
interface State{
    childrenNodeList:Array<React.ReactNode>,
    swipeContainerStyles:Object,
    timeId:any,
    activeIndex:number,
    targetTouche:TargetTouche,
    $swipe:null|React.ReactNode|swipe
}
export default class Swipe extends Component {
    state:State = {
        childrenNodeList: [],
        swipeContainerStyles: {},
        timeId: undefined,
        activeIndex: 0,
        targetTouche:{
            pageX:0,
            pageY:0
        },
        $swipe:null
    }
    constructor(props:any) {
        super(props)
        this.stratChangeSwipeItem = this.stratChangeSwipeItem.bind(this)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
    }
    changeSwipeItem(){
        const length = this.state.childrenNodeList.length
        const swipeContainerStyles = { transform: `translate3d(${(-1 / length) * 100}%,0,0)`, transition: 'transform 1s' }
        const activeIndex = (this.state.activeIndex + 1) % length //更新索引
        this.setState({ swipeContainerStyles, activeIndex }, () => {
            const childrenNodeList: Array<any> = this.state.childrenNodeList
            setTimeout(() => {
                const swipeContainerStyles = { transform: 'translate3d(0,0,0)', transition: 'none' }
                childrenNodeList.push(childrenNodeList.shift())
                this.setState({ swipeContainerStyles, childrenNodeList })
            }, 1000)
        })
    }
    //启动卡片切换
    stratChangeSwipeItem() {
        if (this.state.childrenNodeList.length > 1) {
            const timeId = setInterval(() => {
                this.changeSwipeItem()
            }, 5000)
            this.setState({ timeId })
        }
    }
    handleTouchStart(e:React.TouchEvent) {
        e.persist()
        this.setState({
            targetTouche:{
                pageX:e.targetTouches[0].pageX,
                pageY:e.targetTouches[0].pageY
            }
        })
        console.log(e)
        this.state.timeId && clearInterval(this.state.timeId)
    }
       
    handleTouchMove(e: React.TouchEvent) {
        e.persist()
        // const clientWidth = (this.state.$swipe as swipe).clientWidth
        const {pageX,pageY} = this.state.targetTouche
        const movePageX = e.targetTouches[0].pageX
        const movePageY = e.targetTouches[0].pageY
        console.log(this.state.targetTouche.pageX,movePageX)
        const swipeContainerStyles = { transform: `translate3d(${movePageX-pageX}px,0,0)`, transition: 'none' }
        console.log(swipeContainerStyles)
        this.setState({
            swipeContainerStyles
        })
    }
    handleTouchEnd(e: React.TouchEvent) {
        e.persist()
        console.log(e)
        const clientWidth = (this.state.$swipe as swipe).clientWidth
        const {pageX,pageY} = this.state.targetTouche
        const endPageX = e.changedTouches[0].pageX
        const endPageY = e.changedTouches[0].pageY
        if(Math.abs(pageX-endPageX)>clientWidth/2){//滑动超过一半
            this.changeSwipeItem()
        }else{
            const swipeContainerStyles = { transform: 'translate3d(0,0,0)', transition: 'transform 1s' }
            this.setState({ swipeContainerStyles })
        }

        this.stratChangeSwipeItem()

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
                ref={(el)=>(this.state.$swipe = el)}
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
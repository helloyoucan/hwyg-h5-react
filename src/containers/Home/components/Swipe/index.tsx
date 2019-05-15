import React, { Component } from 'react'
import styles from './styles.module.scss'
function renderChildren(children: React.ReactNode | [] | any) {//遍历所有子组件
    return React.Children.map(children, child => {
        //克隆每一个对象
        return React.cloneElement(child, { width: `${(1 / children.length) * 100}%` })
    })
}
interface TargetTouche{
    pageX:number
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
    $swipe:null|React.ReactNode|swipe,
    canMove:Boolean
}
export default class Swipe extends Component {
    el=React.createRef()
    state:State = {
        childrenNodeList: [],
        swipeContainerStyles: {},
        timeId: undefined,
        activeIndex: 0,
        targetTouche:{
            pageX:0
        },
        $swipe:null,
        canMove:true
    }
    constructor(props:any) {
        super(props)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
        this.el=React.createRef()
    }
    //向右切换
    swipeToRight(){
        const length = this.state.childrenNodeList.length
        const swipeContainerStyles = { transform: `translate3d(${(-2 / length) * 100}%,0,0)`, transition: 'transform 1s' }
        const activeIndex = (this.state.activeIndex + 1) % length //更新索引
        this.setState({ swipeContainerStyles, activeIndex,canMove:false }, () => {
            const childrenNodeList: Array<any> = this.state.childrenNodeList
            setTimeout(() => {
                const swipeContainerStyles = { transform: `translate3d(${(-1 / length) * 100}%,0,0)`, transition: 'none' }
                childrenNodeList.push(childrenNodeList.shift())
                this.setState({ swipeContainerStyles, childrenNodeList,canMove:true })
            }, 1000)
        })
    }
    //向左切换
    swipeToLeft(){
        const length = this.state.childrenNodeList.length
        const swipeContainerStyles = { transform: `translate3d(0,0,0)`, transition: 'transform 1s' }
        const activeIndex = (this.state.activeIndex - 1 + length) % length //更新索引
        this.setState({ swipeContainerStyles, activeIndex,canMove:false }, () => {
            const childrenNodeList: Array<any> = this.state.childrenNodeList
            setTimeout(() => {
                const swipeContainerStyles = { transform: `translate3d(${(-1 / length) * 100}%,0,0)`, transition: 'none' }
                childrenNodeList.unshift(childrenNodeList.pop())
                this.setState({ swipeContainerStyles, childrenNodeList,canMove:true })
            }, 1000)
        })
    }
    //启动卡片切换
    stratChangeSwipeItem() {
        if (this.state.childrenNodeList.length > 1) {
            this.state.timeId && clearInterval(this.state.timeId)
            const timeId = setInterval(() => {
                this.swipeToRight()
            }, 5000)
            this.setState({ timeId })
        }
    }

    handleTouchStart(e:React.TouchEvent) {
        if(!this.state.canMove) return
        e.persist()
        this.setState({
            targetTouche:{
                pageX:e.targetTouches[0].pageX
            }
        })
        this.state.timeId && clearInterval(this.state.timeId)
    }
       
    handleTouchMove(e: React.TouchEvent) {
        if(!this.state.canMove) return
        e.persist()
        const {pageX} = this.state.targetTouche
        const movePageX = e.targetTouches[0].pageX
        const length = this.state.childrenNodeList.length
        const swipeContainerStyles = { transform: `translate3d(calc(${movePageX-pageX}px + ${(-1 / length) * 100}%),0,0)`, transition: 'none' }
        this.setState({
            swipeContainerStyles
        })
    }
    handleTouchEnd(e: React.TouchEvent) {
        if(!this.state.canMove) return
        e.persist()
        const clientWidth = (this.state.$swipe as swipe).clientWidth
        const {pageX} = this.state.targetTouche
        const endPageX = e.changedTouches[0].pageX
        if(Math.abs(pageX-endPageX)>clientWidth/3){//滑动超过1/3
            if(endPageX-pageX>0){//从左往右
                this.swipeToLeft()
            }else{//从右往左
                this.swipeToRight()
            }
        }else{//回复原位置
            const length = this.state.childrenNodeList.length
            const swipeContainerStyles = { transform: `translate3d(${(-1 / length) * 100}%,0,0)`, transition: 'transform 1s' }
            this.setState({ swipeContainerStyles })
        }

        this.stratChangeSwipeItem()

    }
    // 初始化子组件
    initChildren(){
        if(this.props.children instanceof Array){//子组件1个以上
            this.state.timeId && clearInterval(this.state.timeId)
            const children = React.Children.toArray(this.props.children)
            let swipeContainerStyles = {}
            if(children.length>2){//子组件大于2
                children.unshift(children.pop()) 
                swipeContainerStyles = { transform: `translate3d(${(-1 / children.length) * 100}%,0,0)`, transition: 'none' }
            }
            this.setState({
                swipeContainerStyles,
                childrenNodeList: renderChildren(children)
            }, () => {
                this.stratChangeSwipeItem()
            })
        }else{//子组件只有一个时
            this.setState({
                childrenNodeList: renderChildren(React.Children.toArray(this.props.children))
            })
        }
    }
    componentDidMount() {
        this.initChildren()
    }
    componentWillReceiveProps() {
        this.initChildren()
    }
    componentWillUnmount() {
        this.state.timeId && clearInterval(this.state.timeId)
    }
    render() {
        let { childrenNodeList, swipeContainerStyles, activeIndex } = this.state
        const isBindEvent = childrenNodeList.length>1
        const {children} = this.props
        return (
            <div className={styles.swipe}
                ref={(el)=>(this.state.$swipe = el)}
                // ref={this.el}
                onTouchStart={(e)=>{isBindEvent&&this.handleTouchStart(e)}}
                onTouchMove={(e)=>{isBindEvent&&this.handleTouchMove(e)}}
                onTouchEnd={(e)=>{isBindEvent&&this.handleTouchEnd(e)}}
            >
                <div className={styles.swipeContainer}
                    style={{ width: `${childrenNodeList.length * 100}%`, ...swipeContainerStyles }}>
                    {childrenNodeList}
                </div>
                {
                    (children instanceof Array)&&children.length>1?(
                        <ul className={styles.dotsList}>
                        {children.map((_, index) => {
                            return (<li key={index} className={index === activeIndex ? styles.active : undefined}></li>)
                        })}
                    </ul>
                    ):''
                }
               
            </div>
        )
    }
}
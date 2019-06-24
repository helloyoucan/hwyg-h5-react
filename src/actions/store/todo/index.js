import { createStore } from 'redux'
import todoApp from './reducer'

//2.
import {
    addTodo,
    toggleTodo,
    setVisibilityFilter,
    VisibilityFilters
  } from './actions'


// 1.
// let store = createStore(todoApp)
const initDate = {}
const store = createStore(todoApp,initDate)


//2.
// 打印初始状态
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意unsubscribe() 返回一个函数与用来注销监听器
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState())
})

// 发起一系列action
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// 停止监听 state 更新
unsubscribe();

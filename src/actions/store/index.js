import {createStore} from 'redux'

/**
 * 这是一个reducer函数，是一个形式为(state,action)=>state的纯函数
 * 描述了action如何吧state转变成下一个state
 * 
 * state的形式取决于你，可以说基本类型、数组、对象。
 * 但是，当时state变化时，需要返回全新的对象，而不是修改传入的参数
 * 
 * 下面的例子使用switch语句和字符串做判断，
 * 也可以写帮助类(helper)，根据不同的约定（如方法映射）来判断，只要使用项目即可
 * 
 */
// reducer函数
function counter(state = 0, action){
  switch(action.type){
    case 'INCREMENT': return state + 1
    case 'DECREMENT': return state - 1
    default: return state
  }
}


// 创建 Redux store 来存放应用的状态
// API是{subscribe,dispatch,getState}
let store = createStore(counter)

//可以收到订阅更新，也可以时间绑定到视图层
store.subscribe(()=>{
  console.log(store.getState())
})

// 改变内容部state 唯一的方法是 dispatch 一个 action
// action 可以被序列化，用日记记录和存储下来，后期还可以以回放的方式执行
store.dispatch({ type:'INCREMENT' })
// 1
store.dispatch({ type:'INCREMENT' })
// 2
store.dispatch({ type:'DECRMENT' })
// 1
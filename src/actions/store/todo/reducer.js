import { 
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
 } from './actions.js'
import { combineReducers } from 'redux'
const initialState = {
    visibilityFilter:VisibilityFilters.SHOW_ALL,
    todos:[]
}
//1.
/*function todoApp(state,action){
    if(typeof state === 'undefined'){
        return initialState
    }
    // 这里暂不处理任何 action，
    // 仅返回传入的 state。
    return state
}*/

//2.
/*function todoApp(state = initialState,action){
     // 这里暂不处理任何 action，
    // 仅返回传入的 state。
    return state
}*/

//3.
/*function todoApp(state = initialState, action){
   switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign({},state,{
                visibilityFilter:action.filter
            })
        case ADD_TODO:
            return Object.assign({},state,{
                todos:[
                    ...state.todos,
                    {
                        text:action.text,
                        completed:false
                    }
                ]
            })
        case TOGGLE_TODO:
            return Object.assign({},state,{
                todos:state.todos.map((todo,index)=>{
                    if(index === action.index){
                        return Object.assign({},todo,{
                            completed:!todo.completed
                        })
                    }
                    return todo
                })
            })
        default:
            return state
   }
}*/

//4.
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL,action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}
function todos(state = [], action) {
    switch (action.type) {
      case ADD_TODO:
        return [
          ...state,
          {
            text: action.text,
            completed: false
          }
        ]
      case TOGGLE_TODO:
        return state.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      default:
        return state
    }
  }

  /* export default function todoApp(state = {},action){
      return {
          visibilityFilter:visibilityFilter(state.visibilityFilter,action),
          todos:todos(state.todos,action)
      }
  }*/
  
  // 5. Redux 提供了 combineReducers() 工具类来做上面 todoApp 做的事情
  const todoApp = combineReducers({
      visibilityFilter,
      todos
  })
  export default todoApp
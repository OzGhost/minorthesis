import ActionType from './ActionType.js';

const Action = {
  addTodo: (todoContent) => {
    return {
      type: ActionTypes.ADD_TODO,
      text: todoContent
    };
  }
};

export default Action;


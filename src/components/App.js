import React, {Component} from 'react';
import TodoItem from './TodoItem';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      visibility: 'ALL',
      filterText: ''
    };
  }

  componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=8')
    .then(response => response.json())
    .then(data => {
      let todo = [];
      data.forEach(item => {
        todo.push({
          title: item.title,
          completed: item.completed
        });
      });
      this.setState({todos: todo});
    });
  }

  changeVisibleTodos(visibility) {
    this.setState({visibility: visibility});
  }

  addNewTodo(e) {
    if(e.nativeEvent.keyCode === 13) { // 13 = Enter
      if(e.target.value) {
        let todos = this.state.todos;
        todos.push({
          title: e.target.value,
          completed: false
        });
        this.setState({todos: todos});
      }
      e.target.value = '';
    }
  }

  updateTodo(item) {
    let todo = this.state.todos;
    let index = todo.indexOf(item);
    todo[index].completed = !todo[index].completed;
    this.setState({todos: todo});
  }

  deleteTodo(item) {
    let todo = this.state.todos;
    let index = todo.indexOf(item);
    todo.splice(index, 1);
    this.setState({todos: todo});
  }

  filterTodos(e) {
    this.setState({filterText: e.target.value});
  }

  render() {
    let todoList = [];
    let activeTab = ['active', '', ''];
    let currentTodos = this.state.todos.filter(todo => {
      return todo.title.toLowerCase().includes(this.state.filterText.toLowerCase());
    });

    switch(this.state.visibility) {
      case 'COMPLETED':
        activeTab = ['', 'active', ''];
        currentTodos.forEach((todo) => {
          if(todo.completed) {
            todoList.push(todo);
          }
        });
        break;
      case 'REMAINING':
        activeTab = ['', '', 'active'];
        currentTodos.forEach((todo) => {
          if(!todo.completed) {
            todoList.push(todo);
          }
        });
        break;
      default :
        activeTab = ['active', '', ''];
        todoList = currentTodos;
    }

    return (
      <div className="todo-wrapper">
        <input placeholder="Add New Item" type="text" onKeyPress={this.addNewTodo.bind(this)} />
        <div className="todo-container">
          <ul className="todo-tabs">
            <li className={activeTab[0]} onClick={this.changeVisibleTodos.bind(this, 'ALL')}>All Todos</li>
            <li className={activeTab[1]} onClick={this.changeVisibleTodos.bind(this, 'COMPLETED')}>Completed</li>
            <li className={activeTab[2]} onClick={this.changeVisibleTodos.bind(this, 'REMAINING')}>Remaining</li>
            <input type="search" onChange={this.filterTodos.bind(this)} placeholder="Search" />
          </ul>
          <ul>
            {todoList.map((todo, index) => {
              return (<TodoItem key={index} text={todo.title} completed={todo.completed} updateHandler={this.updateTodo.bind(this, todo)} deleteHandler={this.deleteTodo.bind(this, todo)} />);
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

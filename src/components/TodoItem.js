import React, {Component} from 'react';

class TodoItem extends Component {

  render() {
    let className = this.props.completed ? 'done' : 'remaining';
    return (
      <li className={className}>
        <span className="text" onClick={this.props.updateHandler}>{this.props.text}</span>
        <span className="delete-todo" onClick={this.props.deleteHandler}>&#10005;</span>
      </li>
    );
  }
}

export default TodoItem;
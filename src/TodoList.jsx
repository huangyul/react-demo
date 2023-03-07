import { Component } from 'react'

class TodoInput extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.addItem()
  }
  handleChange(e) {
    this.props.onHandleChange(e.target.value)
  }
  render() {
    const inputValue = this.props.value
    return (
      <div>
        <input value={inputValue} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Add</button>
      </div>
    )
  }
}

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleDelete() {
    this.props.onDelete(this.props.value)
  }
  render() {
    return (
      <li>
        {this.props.label}
        <button onClick={this.handleDelete}>delete</button>
      </li>
    )
  }
}

class TodoList extends Component {
  render() {
    const list = this.props.list.map((i) => (
      <TodoItem
        key={i.value}
        label={i.label}
        value={i.value}
        onDelete={this.props.onDelete}
      ></TodoItem>
    ))
    return (
      <div>
        <ul>{list}</ul>
      </div>
    )
  }
}
class Todo extends Component {
  constructor(props) {
    super(props)
    this.onHandleChange = this.onHandleChange.bind(this)
    this.addItem = this.addItem.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.state = {
      value: '',
      list: [
        { value: 999, label: 'aaa' },
        { value: 888, label: 'bbb' },
      ],
      id: 1,
    }
  }
  onHandleChange(value) {
    this.setState({ value: value })
  }
  addItem() {
    if (this.state.value) {
      this.setState((state) => ({
        list: [...state.list, { value: state.id++, label: state.value }],
        value: '',
      }))
    }
  }
  handleDelete(value) {
    console.log(value)
    this.setState((state) => ({
      list: state.list.filter((i) => i.value !== value),
    }))
  }

  render() {
    return (
      <div>
        <TodoInput
          value={this.state.value}
          onHandleChange={this.onHandleChange}
          addItem={this.addItem}
        ></TodoInput>
        <TodoList
          list={this.state.list}
          onDelete={this.handleDelete}
        ></TodoList>
      </div>
    )
  }
}

export default Todo

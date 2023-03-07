import { Component, useState } from 'react'

function TodoInput(props) {
  const [inputValue, setInputValue] = useState('')
  const handleClick = () => {
    props.addItem()
  }
  const handleChange = (e) => {
    setInputValue(e.target.value)
    props.onHandleChange(e.target.value)
  }
  return (
    <div>
      <input value={inputValue} onChange={handleChange}></input>
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

function TodoItem(props) {
  const handleDelete = () => {
    props.onDelete(props.value)
  }
  return (
    <li>
      {props.label}
      <button onClick={handleDelete}>delete</button>
    </li>
  )
}

function TodoList(props) {
  const list = props.list.map((i) => (
    <TodoItem
      key={i.value}
      label={i.label}
      value={i.value}
      onDelete={props.onDelete}
    ></TodoItem>
  ))
  return (
    <div>
      <ul>{list}</ul>
    </div>
  )
}

function Todo(props) {
  const [value, setValue] = useState('')
  const [list, setList] = useState([
    { value: 999, label: 'aaa' },
    { value: 888, label: 'bbb' },
  ])
  const [id, setId] = useState(1)
  const onHandleChange = (val) => {
    setValue(val)
  }
  const addItem = () => {
    if (value) {
      setList([...list, { value: id, label: value }])
      setId(id + 1)
      setValue('')
    }
  }
  const handleDelete = (value) => {
    const res = list.filter((i) => i.value !== value)
    setList([...res])
  }
  return (
    <div>
      <TodoInput
        value={value}
        onHandleChange={onHandleChange}
        addItem={addItem}
      ></TodoInput>
      <TodoList list={list} onDelete={handleDelete}></TodoList>
    </div>
  )
}

export default Todo

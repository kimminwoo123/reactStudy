import { Button } from 'antd'
import React, { useState } from 'react'

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: '눈사람' },
    { id: 2, text: '얼음' },
    { id: 3, text: '눈' },
    { id: 4, text: '바람' },
  ])

  const [inputText, setInputText] = useState('')

  const [nextId, setNextId] = useState(5)

  const onChange = (e) => setInputText(e.target.value)

  const onClick = () => {
    const nextNames = names.concat({
      id: nextId,
      text: inputText,
    })

    if (inputText) {
      setNextId(nextId + 1)
      setNames(nextNames)
      setInputText('')
    }
  }

  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id)
    setNames(nextNames)
  }

  const nameList = names.map((v) => (
    <li key={v.id} onDoubleClick={() => onRemove(v.id)}>
      {v.text}
    </li>
  ))

  return (
    <>
      <input value={inputText} onChange={onChange} />
      <Button onClick={onClick}>추가</Button>
      <ul>{nameList}</ul>
    </>
  )
}

export default IterationSample

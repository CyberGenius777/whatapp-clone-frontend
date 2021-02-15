import React, { useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import './Chat.css'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import axios from './axios'
//prettier-ignore
function Chat({ messages }) {
  const [input, setInput] = useState('')
  const dateOptions = { dateStyle: 'short', timeStyle: 'medium' }
  const sendMessage = async (e) => {
    e.preventDefault()

    await axios.post('/messages/new', {
      message: input,
      name: 'Name2',
      timestamp: new Date().toLocaleString('ru-RU', dateOptions) + '...',
      received: true,
    })

    setInput('')
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Название чата</h3>
          <p>Последний раз был...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message,index) => (
          <p key={message + index} className={`chat__message ${message.received && 'chat__reciever'}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Напишите сообщение"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Отправить сообщение
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat

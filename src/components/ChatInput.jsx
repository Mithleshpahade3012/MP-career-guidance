import React from 'react'

export default function ChatInput({value,onChange,onSend,onClear,loading,placeholder}){
  return (
    <div className="chat-input">
      <input className="input" placeholder={placeholder||'Ask your question...'} value={value} onChange={e=>onChange(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); onSend() } }} />
      <button className="btn bg-white text-gray-700 border" onClick={onClear} title="Clear">Clear</button>
      <button className="btn bg-gradient-to-r from-blue-500 to-sky-400 text-white" onClick={onSend} disabled={loading}>{loading? 'Thinking...':'Send'}</button>
    </div>
  )
}

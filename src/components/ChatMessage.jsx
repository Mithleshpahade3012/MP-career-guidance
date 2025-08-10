import React from 'react'

export default function ChatMessage({msg}){
  const isUser = msg.sender==='user'
  return (
    <div className={isUser? 'msg user' : 'msg'}>
      {!isUser && (
        <div style={{width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:8,background:'#eef8ff',color:'#2F80ED'}}>🤖</div>
      )}

      <div className={isUser? 'bubble user' : 'bubble bot'}>
        <div style={{whiteSpace:'pre-wrap'}}>{msg.text}</div>
        <div className="timestamp">{new Date(msg.time).toLocaleString()}</div>
      </div>

      {isUser && (
        <div style={{width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:8,background:'#f3f4f6',color:'#374151'}}>👤</div>
      )}
    </div>
  )
}

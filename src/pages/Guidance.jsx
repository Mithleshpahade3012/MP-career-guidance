import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import { motion, AnimatePresence } from 'framer-motion'

function TypingDots(){ 
  return <div style={{display:'flex',gap:6,alignItems:'center'}}><div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div><div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{animationDelay:'0.12s'}}></div><div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{animationDelay:'0.24s'}}></div></div>
}

export default function Guidance(){
  const [messages,setMessages] = useState([])
  const [input,setInput] = useState('')
  const [loading,setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(()=>{
    if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  },[messages,loading])

  const send = async ()=> {
    if(!input.trim()) return
    const userMsg = { sender:'user', text: input.trim(), time: new Date().toISOString() }
    setMessages(prev=>[...prev, userMsg])
    setInput('')
    setLoading(true)
    try{
      const res = await axios.post('https://swift-guests-wash.loca.lt/chat', { question: userMsg.text })
      const botText = res.data.answer || res.data.reply || JSON.stringify(res.data)
      // simulate typing
      await new Promise(r=>setTimeout(r, 500))
      setMessages(prev=>[...prev, { sender:'bot', text: botText, time: new Date().toISOString() }])
    }catch(err){
      setMessages(prev=>[...prev, { sender:'bot', text: 'Error contacting server. Please ensure backend is running at http://127.0.0.1:8000', time: new Date().toISOString() }])
    }finally{
      setLoading(false)
    }
  }

  const clearChat = ()=> setMessages([])
  const newSession = ()=>{ setMessages([]); setInput('') }

  return (
    <div className="card chat-wrapper">
      <div className="flex items-center justify-between p-3 border-b">
        <div style={{fontWeight:700}}>Guidance Chat</div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn bg-white text-gray-700 border" onClick={newSession}>New Session</button>
          <button className="btn bg-white text-gray-700 border" onClick={clearChat}>Clear chat</button>
        </div>
      </div>

      <div className="chat-history" ref={scrollRef}>
        {messages.length===0 && <div className="center p-6" style={{color:'#64748b'}}>Start a guidance session — ask about MP government courses, colleges or schemes.</div>}
        {messages.map((m,idx)=> <motion.div key={idx} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.18}}><ChatMessage msg={m} /></motion.div>)}
        {loading && <div className="p-2"><TypingDots /></div>}
      </div>

      <ChatInput value={input} onChange={setInput} onSend={send} onClear={()=>setInput('')} loading={loading} />
    </div>
  )
}

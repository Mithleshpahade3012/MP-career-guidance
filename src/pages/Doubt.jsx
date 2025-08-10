import React, {useState, useRef} from 'react'
import axios from 'axios'
import ChatInput from '../components/ChatInput'
import ChatMessage from '../components/ChatMessage'
import { motion } from 'framer-motion'

const SAMPLE_DOUBTS = [
  {id:1, q:'What is the last date to apply for MP scholarship?', tag:'Top Doubt', time:new Date().toISOString()},
  {id:2, q:'Which colleges in MP offer B.Sc. Computer Science?', tag:'Recently Asked', time:new Date().toISOString()}
]

export default function Doubt(){
  const [doubts,setDoubts] = useState(SAMPLE_DOUBTS)
  const [selected, setSelected] = useState(null)
  const [input,setInput] = useState('')
  const [loading,setLoading] = useState(false)
  const scrollRef = useRef(null)

  const submit = async ()=> {
    if(!input.trim()) return
    const newD = { id: Date.now(), q: input.trim(), tag:'New', time: new Date().toISOString() }
    setDoubts(prev=>[newD, ...prev])
    setSelected({...newD, a: null})
    setInput('')
    setLoading(true)
    try{
      const res = await axios.post('https://swift-guests-wash.loca.lt/chat', { question: newD.q })
      const answer = res.data.answer || res.data.reply || JSON.stringify(res.data)
      setSelected({...newD, a: answer})
    }catch(err){
      setSelected({...newD, a: 'Error contacting server. Ensure backend is running.'})
    }finally{ setLoading(false) }
  }

  return (
    <div style={{display:'grid',gridTemplateColumns:'320px 1fr',gap:16}}>
      <div className="card" style={{height:'72vh',overflowY:'auto'}}>
        <div className="flex items-center justify-between mb-2">
          <h3 style={{margin:0}}>Recent Doubts</h3>
          <div style={{fontSize:12,color:'#64748b'}}>Scroll to explore</div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {doubts.map(d=> (
            <motion.div key={d.id} initial={{opacity:0}} animate={{opacity:1}} className="p-3 rounded-lg border" onClick={()=>setSelected(d)} style={{cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:600}}>{d.q}</div>
                <div style={{fontSize:12,color:'#64748b',marginTop:6}}>{new Date(d.time).toLocaleString()}</div>
              </div>
              <div style={{background:'linear-gradient(90deg,#34D399,#10B981)',color:'white',padding:'6px 10px',borderRadius:999,fontWeight:700,fontSize:12}}>{d.tag}</div>
            </motion.div>
          ))}
        </div>

        <div style={{marginTop:12}}>
          <ChatInput value={input} onChange={setInput} onSend={submit} onClear={()=>setInput('')} loading={loading} placeholder="Ask your doubt..." />
        </div>
      </div>

      <div className="card" style={{height:'72vh',overflowY:'auto'}} ref={scrollRef}>
        {!selected && <div style={{color:'#64748b'}}>Select a doubt to view answers or submit one using the left panel.</div>}
        {selected && (
          <div>
            <h3 style={{marginTop:0}}>{selected.q}</h3>
            <div style={{color:'#64748b',fontSize:13,marginBottom:8}}>Asked: {new Date(selected.time).toLocaleString()}</div>
            <div style={{marginTop:12}}>
              <h4>Answer</h4>
              <div style={{marginTop:8}} className="card">
                {selected.a ? <div>{selected.a}</div> : <div style={{color:'#64748b'}}>Waiting for answer...</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

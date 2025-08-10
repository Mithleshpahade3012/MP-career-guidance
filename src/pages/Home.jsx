import React, {useState, useEffect, useRef} from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

export default function Home(){
  const [show,setShow] = useState(false)
  const titleRef = useRef(null)

  useEffect(()=>{
    gsap.fromTo(titleRef.current, {y:30, opacity:0}, {y:0, opacity:1, duration:1.2, ease:'power3.out'})
  },[])

  return (
    <div>
      <section className="hero">
        <div className="hero-inner container">
          <motion.h1 ref={titleRef} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}} className="hero-title">Shape Your Future with Expert Career Advice</motion.h1>
          <motion.p initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.2}} className="hero-sub">We connect students with the best career mentors and guidance bots tailored to their journey.</motion.p>
          <motion.button whileHover={{scale:1.03}} onClick={()=>setShow(true)} className="mt-6 px-6 py-3 rounded-lg shadow-soft text-white" style={{background:'linear-gradient(90deg,#2F80ED,#56CCF2)'}}>Show Guidance Tips</motion.button>
        </div>
      </section>

      {show && (
        <div style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(2,6,23,0.5)'}}>
          <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} style={{background:'white',padding:24,borderRadius:12,maxWidth:720,boxShadow:'0 10px 40px rgba(2,6,23,0.2)'}}>
            <h3 style={{margin:0,color:'#2F80ED'}}>Mentor's Tip</h3>
            <p style={{marginTop:8}}>“Your career is a journey. Explore, learn, and grow — the opportunities are endless.”</p>
            <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:12}}>
              <button className="btn bg-white border" onClick={()=>setShow(false)}>Close</button>
            </div>
          </motion.div>
        </div>
      )}

      <section style={{marginTop:24}}>
        <div className="card">
          <h3>How CareerGuide helps</h3>
          <p>Get guidance for MP government schemes, colleges, courses and opportunities — curated for students of Madhya Pradesh.</p>
        </div>
      </section>
    </div>
  )
}

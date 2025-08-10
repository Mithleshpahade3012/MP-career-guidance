import React, {useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const items = [ {name:'Home',to:'/'},{name:'Guidance',to:'/guidance'},{name:'Doubt',to:'/doubt'} ]

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between py-3">
        <div className="brand text-xl">🎓 CareerGuide</div>

        <div className="hidden md:flex gap-8">
          {items.map(i=> (
            <Link key={i.name} to={i.to} className={loc.pathname===i.to? 'text-blue-600 font-semibold':''}>
              <motion.span whileHover={{y:-3}} transition={{type:'spring',stiffness:300}}>{i.name}</motion.span>
            </Link>
          ))}
        </div>

        <button className="md:hidden" onClick={()=>setOpen(v=>!v)} aria-label="menu">{open? '✕' : '☰'}</button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} style={{overflow:'hidden'}}>
            <div style={{display:'flex',flexDirection:'column'}}>
              {items.map(i=> (
                <Link key={i.name} to={i.to} onClick={()=>setOpen(false)} style={{padding:'12px 16px',borderBottom:'1px solid #eef2f7'}}>{i.name}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

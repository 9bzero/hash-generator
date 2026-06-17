import{useState,useEffect}from'react'
  async function hashText(text:string,algo:string){
    const enc=new TextEncoder()
    const buf=await crypto.subtle.digest(algo,enc.encode(text))
    return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("")
  }
  const ALGOS=[{name:"SHA-256",algo:"SHA-256"},{name:"SHA-512",algo:"SHA-512"},{name:"SHA-1",algo:"SHA-1"},{name:"SHA-384",algo:"SHA-384"}]
  export default function App(){
    const[input,setInput]=useState("Hello, World!")
    const[hashes,setHashes]=useState<{[k:string]:string}>({})
    const[cp,setCp]=useState("")
    const[hmacKey,setHmacKey]=useState("")
    const[hmacResult,setHmacResult]=useState("")
    useEffect(()=>{
      if(!input)return
      Promise.all(ALGOS.map(async({name,algo})=>({name,hash:await hashText(input,algo)}))).then(results=>{const m:{[k:string]:string}={};results.forEach(r=>m[r.name]=r.hash);setHashes(m)})
    },[input])
    useEffect(()=>{
      if(!input||!hmacKey)return
      const gen=async()=>{
        const enc=new TextEncoder()
        const key=await crypto.subtle.importKey("raw",enc.encode(hmacKey),{name:"HMAC",hash:"SHA-256"},false,["sign"])
        const sig=await crypto.subtle.sign("HMAC",key,enc.encode(input))
        setHmacResult(Array.from(new Uint8Array(sig)).map(b=>b.toString(16).padStart(2,"0")).join(""))
      }
      gen()
    },[input,hmacKey])
    const copy=(key:string,val:string)=>{navigator.clipboard.writeText(val);setCp(key);setTimeout(()=>setCp(""),2000)}
    return(
      <div style={{minHeight:"100vh",fontFamily:"Inter,system-ui,sans-serif",color:"#e2e8f0",padding:"2rem"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <h1 style={{fontWeight:800,fontSize:"1.75rem",marginBottom:"0.5rem",color:"#f8fafc"}}>🔒 Hash Generator</h1>
          <p style={{color:"#94a3b8",marginBottom:"1.5rem",fontSize:"0.9rem"}}>Generate SHA hashes and HMAC signatures using the Web Crypto API</p>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={4} placeholder="Enter text to hash..." style={{width:"100%",background:"#111827",border:"1px solid #334155",borderRadius:10,padding:"1rem",color:"#e2e8f0",outline:"none",fontFamily:"JetBrains Mono,monospace",fontSize:"0.85rem",resize:"vertical",marginBottom:"1.5rem"}}/>
          <div style={{display:"flex",flexDirection:"column",gap:"0.75rem",marginBottom:"1.5rem"}}>
            {ALGOS.map(({name})=>(
              <div key={name} style={{background:"#111827",border:"1px solid #1e293b",borderRadius:10,overflow:"hidden"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.5rem 1rem",borderBottom:"1px solid #1e293b"}}>
                  <span style={{fontWeight:700,color:"#38bdf8",fontSize:"0.82rem"}}>{name}</span>
                  <button onClick={()=>copy(name,hashes[name]||"")} style={{padding:"0.2rem 0.6rem",background:cp===name?"#166534":"#1e293b",color:cp===name?"#86efac":"#94a3b8",border:"1px solid #334155",borderRadius:4,cursor:"pointer",fontSize:"0.72rem"}}>{cp===name?"✓":"Copy"}</button>
                </div>
                <div style={{padding:"0.75rem 1rem",fontFamily:"JetBrains Mono,monospace",fontSize:"0.78rem",color:"#86efac",wordBreak:"break-all"}}>{hashes[name]||"..."}</div>
              </div>
            ))}
          </div>
          <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:10,padding:"1.25rem"}}>
            <div style={{fontWeight:700,color:"#f59e0b",fontSize:"0.82rem",marginBottom:"0.75rem"}}>HMAC-SHA256</div>
            <input value={hmacKey} onChange={e=>setHmacKey(e.target.value)} placeholder="Secret key..." style={{width:"100%",background:"#0f172a",border:"1px solid #334155",borderRadius:6,padding:"0.5rem 0.75rem",color:"#e2e8f0",outline:"none",fontFamily:"JetBrains Mono,monospace",fontSize:"0.82rem",marginBottom:"0.75rem"}}/>
            {hmacKey&&hmacResult&&<div style={{fontFamily:"JetBrains Mono,monospace",fontSize:"0.78rem",color:"#fbbf24",wordBreak:"break-all",background:"#0f172a",borderRadius:6,padding:"0.75rem"}}>{hmacResult}</div>}
          </div>
        </div>
      </div>
    )
  }
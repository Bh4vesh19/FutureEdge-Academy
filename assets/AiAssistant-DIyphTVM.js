import{r as t,j as e}from"./index-BsLlmH1p.js";const U="https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQnBZZ1lXZ2FhdHk1UGZLTGkxbnVUaVlRVy1zTk1hejBKMHdRaVNDSEFWUkgwc2x6RkZCYTJCOXNmQ2lmaUNPUUhITGxtU2N4QUJEck1KdWNYZzN4SG5oMzUtaUE9PQ==",L=8e3,A=1,B=`You are OBITO — a friendly, intelligent study companion for FutureEdge Academy.

## WHO YOU ARE
- Your name is OBITO 🎓
- You're a warm, supportive, and slightly witty AI friend
- You speak naturally like a human, NOT like a robot
- You're here to help students learn and grow
- Built by Motion Craft (3 student developers, led by Bhavesh)

## YOUR PERSONALITY
- Friendly and approachable 😊
- Patient when explaining concepts
- Encouraging and supportive
- Slightly witty when appropriate (but never mean)
- Always ready to help with a positive attitude

## LANGUAGE RULES
You MUST reply in the SAME LANGUAGE the user writes in:
- English → Reply in English
- Hindi → Reply in Hindi
- Hinglish → Reply in Hinglish
- Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia → Reply in that language

## WHAT YOU CAN HELP WITH

### ACADEMICS
- Science: Physics, Chemistry, Biology, Astronomy
- Mathematics: All levels, with step-by-step solutions
- Geography: Countries, capitals, rivers, mountains
- History: World & Indian history
- Computer Science: Programming, algorithms, web dev

### FUTUREEDGE ACADEMY COURSES
1. Generative AI — neural networks, LLMs
2. UI/UX Design — wireframing, prototyping
3. DBMS — SQL, database design
4. Digital Marketing — SEO, social media
5. Trending Technologies — Cloud, blockchain, IoT

### GENERAL KNOWLEDGE & DAILY LIFE
- Current affairs, GK questions
- Competitive exam prep (SSC, UPSC, Banking)
- Daily life questions and advice
- Logical reasoning, puzzles

## MEMORY RULES (Important!)
- You have PERFECT MEMORY of this conversation
- Remember the user's name if they mentioned it
- Refer back to earlier messages when relevant
- Continue topics from where you left off
- Treat the conversation as continuous

## HOW TO RESPOND
- Be warm and friendly in every response
- Use simple language for complex topics
- Give examples when explaining
- Use emojis occasionally to be friendly 😊📚✨
- If unsure, admit it honestly
- NEVER discuss APIs, security, or backend stuff

## If someone is RUDE:
Stay calm, don't insult back. Just say something like:
- "Let's keep it friendly! 😊 How can I actually help you?"
- "Arre yaar, chill. Kuch helpful puchho na! 📚"`,D=["api key","apikey","secret","token","password","hack","exploit","vulnerability"],T=t.memo(({message:a})=>{const p=a.type==="user";return e.jsx("div",{className:`flex ${p?"justify-end":"justify-start"} mb-3`,children:e.jsx("div",{className:`max-w-[85%] rounded-2xl px-4 py-2.5 ${p?"bg-blue-600 text-white rounded-br-md":"bg-gray-100 text-gray-800 rounded-bl-md"}`,children:e.jsx("p",{className:"text-sm whitespace-pre-wrap break-words leading-relaxed",children:a.text})})})});T.displayName="ChatMessage";const R=t.memo(()=>e.jsx("div",{className:"flex justify-start mb-3",children:e.jsx("div",{className:"bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3",children:e.jsxs("div",{className:"flex gap-1",children:[e.jsx("span",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"0ms"}}),e.jsx("span",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"150ms"}}),e.jsx("span",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"300ms"}})]})})}));R.displayName="TypingIndicator";const S=t.memo(()=>e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:"w-6 h-6",stroke:"#3B82F6",strokeWidth:"1.5",children:[e.jsx("rect",{x:"4",y:"8",width:"16",height:"11",rx:"3"}),e.jsx("circle",{cx:"9",cy:"13.5",r:"1.5",fill:"#3B82F6",stroke:"none"}),e.jsx("circle",{cx:"15",cy:"13.5",r:"1.5",fill:"#3B82F6",stroke:"none"}),e.jsx("path",{d:"M10 17h4",strokeLinecap:"round"}),e.jsx("path",{d:"M12 4v4",strokeLinecap:"round"}),e.jsx("circle",{cx:"12",cy:"3",r:"1",fill:"#3B82F6",stroke:"none"})]}));S.displayName="BotIcon";const P=()=>{const[a,p]=t.useState(!1),[y,c]=t.useState([]),[g,k]=t.useState(""),[u,b]=t.useState(!1),j=t.useRef(null),v=t.useRef(null),x=t.useRef(null),f=t.useRef(0),E=t.useCallback(()=>{j.current?.scrollIntoView({behavior:"smooth",block:"end"})},[]);t.useEffect(()=>{E()},[y.length,E]),t.useEffect(()=>{a&&y.length===0&&(c([{id:++f.current,type:"ai",text:`Hey! 👋 I'm OBITO, your study buddy.

What would you like to learn today?`}]),setTimeout(()=>v.current?.focus(),100))},[a,y.length]);const I=t.useCallback(()=>{p(s=>!s)},[]),N=t.useCallback(s=>{const n=s.toLowerCase();return D.some(d=>n.includes(d))},[]),C=t.useCallback(async(s,n,d)=>{const h=new AbortController,o=setTimeout(()=>h.abort(),L);let l="";n&&n.length>0&&(l=n.slice(-10).map(i=>i.type==="user"?`User: ${i.text}`:`AI: ${i.text}`).join(`
`)+`
`);const r=B+`

## CONVERSATION HISTORY (Remember this context):
`+l+`
User: `+s+`
AI:`;try{const m=await fetch(U,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:r}),signal:d||h.signal});clearTimeout(o);const i=await m.json();return i.status==="success"?i.text:null}catch(m){if(clearTimeout(o),m.name==="AbortError")return null;throw m}},[]),w=t.useCallback(async s=>{s?.preventDefault();const n=g.trim();if(!n||u)return;x.current&&x.current.abort(),x.current=new AbortController;const d=++f.current;if(c(r=>[...r,{id:d,type:"user",text:n}]),k(""),b(!0),N(n)){c(r=>[...r,{id:++f.current,type:"ai",text:"I'm here to help with learning! 📚 Ask about courses or academics."}]),b(!1);return}let h=[];c(r=>(h=r,r));let o=null,l=0;for(;!o&&l<=A;)try{o=await C(n,h,x.current.signal)}catch{if(l++,l>A)break}c(r=>[...r,{id:++f.current,type:"ai",text:o||"Sorry, I couldn't respond. Please try again! 🙏"}]),b(!1)},[g,u,N,C]),M=t.useCallback(s=>{k(s.target.value)},[]),O=t.useCallback(s=>{s.key==="Enter"&&!s.shiftKey&&(s.preventDefault(),w())},[w]);return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:I,className:"fixed bottom-4 right-4 z-[9999] w-14 h-14 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95","aria-label":"Toggle AI Assistant",children:a?e.jsx("svg",{className:"w-5 h-5 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}):e.jsx(S,{})}),a&&e.jsxs("div",{className:`fixed z-[9999] bg-white shadow-xl flex flex-col\r
                    bottom-0 right-0 w-full h-full\r
                    sm:bottom-20 sm:right-4 sm:w-[380px] sm:h-[520px] sm:max-h-[calc(100vh-100px)] sm:rounded-2xl sm:border sm:border-gray-200`,children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 sm:rounded-t-2xl",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 text-base",children:"OBITO 🎓"}),e.jsx("p",{className:"text-xs text-gray-500",children:"Your Study Buddy"})]}),e.jsx("button",{onClick:I,className:"w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors",children:e.jsx("svg",{className:"w-4 h-4 text-gray-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),e.jsxs("div",{className:"flex-1 overflow-y-auto px-4 py-3 overscroll-contain",children:[y.map(s=>e.jsx(T,{message:s},s.id)),u&&e.jsx(R,{}),e.jsx("div",{ref:j})]}),e.jsx("form",{onSubmit:w,className:"p-3 border-t border-gray-100 bg-white sm:rounded-b-2xl",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("input",{ref:v,type:"text",value:g,onChange:M,onKeyDown:O,placeholder:"Ask anything...",disabled:u,className:"flex-1 min-h-[44px] px-4 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 disabled:opacity-60 transition-colors",autoComplete:"off"}),e.jsx("button",{type:"submit",disabled:!g.trim()||u,className:"min-w-[44px] min-h-[44px] rounded-full bg-blue-600 text-white flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors hover:bg-blue-500 active:bg-blue-700",children:e.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 19l9 2-9-18-9 18 9-2zm0 0v-8"})})})]})})]})]})},G=t.memo(P);export{G as default};

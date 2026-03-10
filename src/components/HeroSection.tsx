import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Share2, Instagram, Linkedin, Facebook, Youtube, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const HeroSection = () => {

const [showShare,setShowShare] = useState(false);
const [techSparkles,setTechSparkles] = useState<any[]>([]);

useEffect(()=>{

const sparkles=[];

for(let i=0;i<50;i++){
sparkles.push({
id:i,
left:`${Math.random()*100}%`,
top:`${Math.random()*100}%`,
size:Math.random()*4+1,
duration:Math.random()*3+2
});
}

setTechSparkles(sparkles);

},[]);

const iconData=[
{
Icon:Instagram,
color:"#E1306C",
link:"https://instagram.com"
},
{
Icon:Linkedin,
color:"#0A66C2",
link:"https://linkedin.com"
},
{
Icon:Facebook,
color:"#1877F2",
link:"https://facebook.com"
},
{
Icon:Youtube,
color:"#FF0000",
link:"https://youtube.com"
},
{
Icon:Github,
color:"#ffffff",
link:"https://github.com"
},
{
Icon:Twitter,
color:"#1DA1F2",
link:"https://twitter.com"
}
];

return(

<section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B1120] pt-20">

{/* SPARKLES */}

{techSparkles.map((sparkle)=>(
<motion.div
key={sparkle.id}
className="absolute rounded-full"
style={{
left:sparkle.left,
top:sparkle.top,
width:sparkle.size,
height:sparkle.size,
background:"#60a5fa"
}}
animate={{
opacity:[0,0.4,0.8,0.4,0],
scale:[0,1,1.3,1,0]
}}
transition={{
duration:sparkle.duration,
repeat:Infinity
}}
/>
))}

{/* GRID */}

<div className="absolute inset-0 opacity-5">

<svg width="100%" height="100%">
<defs>

<pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
<path d="M80 0 L0 0 0 80" fill="none" stroke="white" strokeWidth="0.5"/>
</pattern>

</defs>

<rect width="100%" height="100%" fill="url(#grid)" />

</svg>

</div>

<div className="container mx-auto px-4 md:px-6 relative z-10">

<div className="grid lg:grid-cols-2 gap-12 items-center">

{/* LEFT */}

<div>

<div className="flex items-center gap-3 mb-4">

<span className="text-4xl md:text-5xl font-bold text-white">
G-Tech
</span>

<span className="text-sm text-blue-300 font-mono bg-blue-600/20 px-3 py-1.5 rounded-lg border border-blue-500/30">
&lt;code_lab /&gt;
</span>

</div>

<div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">

<Sparkles className="w-4 h-4 text-blue-400"/>

<span className="text-sm text-blue-300">
Admissions Open for 2026
</span>

</div>

<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">

<span className="text-white">Launch Your</span>
<br/>

<span className="text-blue-400">Tech Career</span>
<br/>

<span className="text-white">With Confidence</span>

</h1>

<p className="text-base md:text-lg text-gray-300 mb-8 max-w-lg">

Master Python, Java, Power BI and more with industry-expert training at
G-Tech Computer Education.

</p>

<div className="flex gap-4">

<Link
to="/courses"
className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold"
>
Explore Courses
</Link>

<Link
to="/contact"
className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl"
>
Contact Us
</Link>

</div>

</div>

{/* TERMINAL */}

<div className="relative w-full max-w-lg mx-auto">

<motion.div
className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"
animate={{scale:[1,1.02,1]}}
transition={{duration:3,repeat:Infinity}}
/>

<div className="relative bg-[#0F172A] rounded-2xl overflow-hidden border border-white/10">

<div className="flex items-center px-4 py-3 bg-[#1E293B]">

<div className="flex gap-1.5">
<div className="w-3 h-3 rounded-full bg-red-500"/>
<div className="w-3 h-3 rounded-full bg-yellow-500"/>
<div className="w-3 h-3 rounded-full bg-green-500"/>
</div>

</div>

<div className="p-6 font-mono text-sm text-gray-300">

<div className="text-green-400 mb-2">
g-tech@career:~$
</div>

<div className="text-blue-400 mb-4">
$ python launch_career.py
</div>

<div className="space-y-2">
<div>• Loading Python curriculum...</div>
<div>• Initializing Java modules...</div>
<div>• Setting up Power BI...</div>
<div>• Configuring databases...</div>

<div className="text-yellow-400 mt-4">
↻ Launching your future...
</div>

</div>

</div>

</div>

</div>

</div>

</div>

{/* MOBILE SHARE */}

<div className="md:hidden fixed top-56 right-1 z-50">

<div className="relative flex flex-col items-center">

<AnimatePresence>

{showShare && (

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
exit={{opacity:0}}
className="absolute bottom-full mb-3 flex flex-col gap-3 max-h-[132px] overflow-y-auto hide-scrollbar"
>

{iconData.map(({Icon,color,link},index)=>(

<motion.div
key={index}
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.12}}
onClick={()=>window.open(link,"_blank")}
className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 cursor-pointer"
>

<Icon className="w-5 h-5" style={{color}}/>

</motion.div>

))}

</motion.div>

)}

</AnimatePresence>

<button
onClick={()=>setShowShare(!showShare)}
className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-xl"
>

<Share2 className="w-5 h-5 text-white"/>

</button>

</div>

</div>

{/* DESKTOP SHARE */}

<div className="hidden md:flex fixed bottom-8 right-8 z-50">

<div className="relative flex flex-col items-center">

<AnimatePresence>

{showShare && (

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
exit={{opacity:0}}
className="absolute bottom-full mb-3 flex flex-col gap-3 max-h-[132px] overflow-y-auto hide-scrollbar"
>

{iconData.map(({Icon,color,link},index)=>(

<motion.div
key={index}
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.12}}
onClick={()=>window.open(link,"_blank")}
className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 cursor-pointer"
>

<Icon className="w-5 h-5" style={{color}}/>

</motion.div>

))}

</motion.div>

)}

</AnimatePresence>

<button
onClick={()=>setShowShare(!showShare)}
className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-xl"
>

<Share2 className="w-6 h-6 text-white"/>

</button>

</div>

</div>

<style>{`

.hide-scrollbar::-webkit-scrollbar{
display:none;
}

.hide-scrollbar{
-ms-overflow-style:none;
scrollbar-width:none;
}

`}</style>

</section>

)

}

export default HeroSection;
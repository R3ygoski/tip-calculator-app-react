export default function CustomTip({customTip, setCustomTip}){

    return (
        <input className="app__calculator__btns-input" type="number" placeholder="Custom" value={customTip} 
        min="0" 
        onChange={(e)=>setCustomTip(e.target.value)}  
        onInput={(e)=>{
            e.target.value<0?
            e.target.value = '':''
        }}/>
    )
}
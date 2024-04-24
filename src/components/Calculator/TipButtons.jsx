export default function TipButton({val, setTipPercentage, setCustomTip}){
    return (
        <button className="app__calculator__btns-tip" value={val} onClick={(e)=>{
            setTipPercentage(e.target.value)
            setCustomTip('')
        }}>{val}%</button>
    )
}
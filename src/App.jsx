// Images
import logo from './assets/logo.svg'
import dollarIcon from './assets/icon-dollar.svg'
import personIcon from './assets/icon-person.svg'

// Components
import TipButton from './components/Calculator/TipButtons'
import CustomTip from './components/Calculator/CustomTip'
import Attribution from './components/Attribution'

// React Hooks
import { useEffect, useState } from 'react'

// Array Object
import { buttons } from './javascript/buttons'

// Regex
import { billRegex, numberRegex } from './javascript/regex'

function App() {
  // Input States
  const [bill, setBill] = useState('')
  const [peoples, setPeoples] = useState('1')
  const [customTip, setCustomTip] = useState('')

  // Button States
  const [tipPercentage, setTipPercentage] = useState(0)

  // Result States
  const [tipAmout, setTipAmount] = useState('0.00')
  const [total, setTotal] = useState('0.00')

  // Errors States
  const [billErr, setBillErr] = useState('')
  const [peoplesErr, setPeoplesErr] = useState('')

  const resetDisplay = () => {
    setTipAmount('0.00')
    setTotal('0.00')
  }

  const resetInput = () => {
    setBill('')
    setPeoples('1')
    setCustomTip('')
    resetDisplay()
  }

  const checkBillInput = (vl) => {
    if (billRegex.test(vl)){
      setBill(vl)
      setBillErr('')
    } else {
      setBillErr('Only Numbers or .')
    }
  }
  const checkPeoplesInput = (vl) => {
    if (numberRegex.test(vl)){
      setPeoples(vl)
      setPeoplesErr('')
    } else {
      setPeoplesErr('Only Numbers')
    }
  }

  useEffect(()=>{
    function calculateTip(tipType){
      const billConverted = Number(bill)
      const tipPercentageConverted = Number(tipType)
      const peoplesConverted = Number(peoples)

      const tip = (tipPercentageConverted * billConverted) / 100
      const tipPerPerson = tip / peoplesConverted
      const totalValue = (tip + billConverted) / peoplesConverted

      setTotal(totalValue.toLocaleString('en-US', {
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2
      }))
      return tipPerPerson
    }

    const tipPercentageValue = customTip === '' ? tipPercentage : customTip

    if (peoples==''){
      setPeoplesErr('Cannot be empty')
      resetDisplay()
    } else if (peoples==0){
      setPeoplesErr('Cannot be 0')
      resetDisplay()
    } else {
      setTipAmount(calculateTip(tipPercentageValue).toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      }))
    }

  },[tipPercentage, bill, peoples, customTip])

  return (
    <>
      <figure className='logo'>
        <img src={logo} alt="Logo of Splitter" />
      </figure>

      <main className='app'>
        {/* Calculator */}
        <section className='app__calculator'>

          <div className='app__calculator__bill'>
            <label htmlFor="bill">Bill</label>
            {billErr?<span>{billErr}</span>:''}
            <input className={!billErr?'':'input--error'} id="bill" type="text" placeholder='0' 
              onChange={(e)=>checkBillInput(e.target.value)} value={bill} />
            <img src={dollarIcon} alt="" />
          </div>

          <div className='app__calculator__btns'>
            <label htmlFor="Tip">Select Tip %</label>
            <div>
              {buttons.map((button, index)=>(
                <TipButton key={index} val={button.val} setTipPercentage={setTipPercentage} setCustomTip={setCustomTip}/>
              ))}
            <CustomTip customTip={customTip} setCustomTip={setCustomTip}/>
            </div>
          </div>

          <div className='app__calculator__peoples'>
            <label htmlFor="peoples">Number of People</label>
            {peoplesErr?<span>{peoplesErr}</span>:''}
            <input className={!peoplesErr?'':'input--error'} id="peoples" type="text" placeholder='0' 
              onChange={(e)=>checkPeoplesInput(e.target.value)} value={peoples}/>
            <img src={personIcon} alt="" />
          </div>

        </section>

        {/* Display */}
        <section className='app__display'>

          <div className='app__display__tip'>
            <p>Tip Amount <br/> <span className='per-person-label'>/ person </span></p>
            <span className='app__display__tip-result'>${tipAmout}</span>
          </div>

          <div className='app__display__total'>
            <p>Total <br/> <span className='per-person-label'>/ person </span></p>
            <span className='app__display__total-result'>${total}</span>
          </div>

          <button className={bill==0 || peoples==0 ? 'app__display__btn--disabled' : 'app__display__btn'}
            onClick={resetInput}>
            Reset
          </button>
          
        </section>
      </main>
      
      <Attribution />
    </>
      
  )
}

export default App

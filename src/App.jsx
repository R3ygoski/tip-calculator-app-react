// Image
import logo from './assets/logo.svg'

// Components
import TipButton from './components/Calculator/TipButtons'
import BillInput from './components/Calculator/BillInput'
import PeopleInput from './components/Calculator/PeopleInput'
import CustomTip from './components/Calculator/CustomTip'
import Attribution from './components/Attribution'

// React Hooks
import { useEffect, useState } from 'react'

// Array Object
import { buttons } from './javascript/buttons'

// Regex
import { billRegex, numberRegex } from './javascript/regex'
import Display from './components/Display'

function App() {
  // Input States - Bill Input Value, Num Peoples Input Value, Custom Tip Value.
  const [bill, setBill] = useState('')
  const [peoples, setPeoples] = useState('1')
  const [customTip, setCustomTip] = useState('')

  // Button States
  const [tipPercentage, setTipPercentage] = useState(0)

  // Result States
  const [tipAmount, setTipAmount] = useState('0.00')
  const [total, setTotal] = useState('0.00')

  // Errors States - Bill Error Handler, Num Peoples Error Handler.
  const [billErr, setBillErr] = useState('')
  const [peoplesErr, setPeoplesErr] = useState('')

  // Reset Display Values
  const resetDisplay = () => {
    setTipAmount('0.00')
    setTotal('0.00')
  }

  // Reset Input Values + Display
  const resetInput = () => {
    setBill('')
    setPeoples('1')
    setCustomTip('')
    resetDisplay()
  }

  // Receive each Bill Input and check if it's number or not. 
  const checkBillInput = (vl) => {
    if (billRegex.test(vl)){
      setBill(vl)
      setBillErr('')
    } else {
      setBillErr('Only Numbers or .')
    }
  }
  // Receive each Num Peoples Input and check if it's number or not.
  const checkPeoplesInput = (vl) => {
    if (numberRegex.test(vl)){
      setPeoples(vl)
      setPeoplesErr('')
    } else {
      setPeoplesErr('Only Numbers')
    }
  }

  useEffect(()=>{
    // Calculate Tip based on Tip type Button/Custom
    function calculateTip(tipType){

      // Convet Bill, Num Peoples and Tip Percentage to Number
      const billConverted = Number(bill)
      const peoplesConverted = Number(peoples)
      const tipPercentageConverted = Number(tipType)

      // Calculate Total Tip, Tip per Person and Total value per Person
      const tip = (tipPercentageConverted * billConverted) / 100
      const tipPerPerson = tip / peoplesConverted
      const totalValue = (tip + billConverted) / peoplesConverted

      // Update Total State with formatted value
      setTotal(totalValue.toLocaleString('en-US', {
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2
      }))
      return tipPerPerson
    }

    // Check if are using Custom Tip or Button Tip
    const tipPercentageValue = customTip === '' ? tipPercentage : customTip

    // Check peoples is Empty
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
          <BillInput bill={bill} billErr={billErr} checkBillInput={checkBillInput}/>

          <div className='app__calculator__btns'>
            <label htmlFor="Tip">Select Tip %</label>
            <div>
              {buttons.map((button, index)=>(
                <TipButton key={index} val={button.val} setTipPercentage={setTipPercentage} setCustomTip={setCustomTip}/>
              ))}
            <CustomTip customTip={customTip} setCustomTip={setCustomTip}/>
            </div>
          </div>

          <PeopleInput peoples={peoples} peoplesErr={peoplesErr} checkPeoplesInput={checkPeoplesInput}/>
        </section>

        {/* Display */}
        <Display bill={bill} peoples={peoples} resetInput={resetInput} tipAmount={tipAmount} total={total} />
      </main>
      
      <Attribution />
    </>
      
  )
}

export default App

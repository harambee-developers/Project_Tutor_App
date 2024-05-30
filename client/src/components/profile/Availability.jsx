import React, {useState} from 'react'
import DaySelector from '../features/DaySelector'

const Avaialbility = () => {
  const [availability, setAvailability] = useState([])  
  const handleDaySelection = (day, isSelected) => {
    if (isSelected) {
      setAvailability([...availability, day])
    } else {
      setAvailability(availability.filter(d => d !== day))
    }
  }
  return (
    <div className='min-h-screen'>
      <h1 className='font-semibold text-xl mb-4 p-4'>Set your Availability</h1>
      <DaySelector onSelectDay={handleDaySelection}/>
    </div>
  )
}

export default Avaialbility
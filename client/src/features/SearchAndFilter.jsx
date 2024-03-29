import React from 'react'
import { useState } from 'react'

const SearchAndFilter = () => {

    
    const [name, setName] = useState('Mohammed');

    const handleonClick = () => {
        setName('Hamza')
        console.log('button has been clicked')
    }

    // Dummy Data

    const data = [
        {
            id: 1, name: 'Item 1',
            category: 'Category A'
        },
        {
            id: 2, name: 'Item 2',
            category: 'Category B'
        },

    ]

  return (
    <nav className='flex justify-between items-center bg-gray-800'>
    <div>
        <input placeholder='Search...' type="text" />
        <p>My name is {name}</p>
        <button onClick={handleonClick} >
            Click me
        </button>
        <ul className='navbar-links'>
            <li>
             <a href="/">Home</a>
            </li>
            <li>
            <a href="/">About</a>
            </li>
        </ul>
    </div>
    </nav>
  )
}

export default SearchAndFilter
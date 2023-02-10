import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateShortcut = () => {
  const [shortcutName, setShortcutName] = useState('')
  const [englishDescription, setEnglishDescription] = useState('')
  const [hindiDescription, setHindiDescription] = useState('')
  const navigate = useNavigate()

  const submitShortcut = () => {
    if (!(shortcutName)) {
      return alert('Please add name')
    }

    const response = axios.post('/api/createshortcut', {
      shortcutName,
      englishDescription,
      hindiDescription
    })

    navigate('/')

  }
  return (
    <div className='mt-4 flex flex-col justify-center items-center '>
        <label className='flex justify-start' htmlFor="shortcutInput"> <p>Enter Shortcut:</p> </label>
        <input type="text" name='shortcutInput'
          value={shortcutName}
          onChange={(e) => setShortcutName(e.target.value)}
          className="relative flex-auto min-w-0 block w-[400px] px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />

        <label htmlFor="englishDescriptionInput">Enter English Description:</label>
        <textarea rows="10" type="text" name='englishDescriptionInput'
          value={englishDescription}
          onChange={(e) => setEnglishDescription(e.target.value)}
          className="relative flex-auto min-w-0 block w-[400px] px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />
        <label htmlFor="hindiDescriptionInput">Enter Hindi Description:</label>
        <textarea rows="10" type="text" name='hindiDescriptionInput'
          value={hindiDescription}
          onChange={(e) => {
            setHindiDescription(e.target.value)
          }}
          className="form-control relative flex-auto min-w-0 block w-[400px] px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />
        <div>
          <button
          className='px-4 py-2 bg-violet-600 text-white rounded m-4 pointer'
            onClick={submitShortcut}
          >
            Submit
          </button>
        </div>
    </div>
  )
}

export default CreateShortcut
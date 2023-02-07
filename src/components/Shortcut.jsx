import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

const Shortcut = () => {
  const { shortcutId } = useParams()
  const [shortcut, setShortcut] = useState({})
  const [tempShortcutDescription, setTempShortcutDescription] = useState('')
  const shortcutNameRef = useRef()
  const shortcutDescriptionRef = useRef()

  const getShortcut = async () => {
    const response = await axios.get(`/api/getshortcut/${shortcutId}`)

    setShortcut(response.data.shortcut)

    setTempShortcutDescription(response.data.shortcut.shortcutDescription)
  }

  const deleteShortcut = async (shortcutId) => {
    const response = await axios.delete(`/api/deleteshortcut/${shortcutId}`)
  }

  const editShortcut = async () => {
    const editedShortcutDescription = shortcutDescriptionRef.current.textContent

    const editedShortcutName = shortcutNameRef.current.textContent

    const tempShortcut = {
      editedShortcutName,
      editedShortcutDescription
    }

    const response = await axios.put(`/api/editshortcut/${shortcutId}`, tempShortcut)
  }

  useEffect((() => {
    getShortcut()
  }), [])
  return (
    <div className='flex flex-row justify-center mt-8'>
      <div className='w-96 bg-sky-300 p-4 rounded-lg'>
        <div>
          <p className='text-3xl font-bold'
            ref={shortcutNameRef}
            contentEditable
          >{shortcut.shortcutName}</p>
          <div className='text-2xl mt-4'
            ref={shortcutDescriptionRef}
            contentEditable
            value={tempShortcutDescription}
          >{tempShortcutDescription}</div>
        </div >
        <div className='flex flex-row justify-end	 gap-2'>
          <button className='mt-8 bg-teal-800	self-end text-white px-[4px] rounded'
            onClick={editShortcut}
          >Confirm Edit</button>
          <button className='mt-8 bg-red-500 w-16 self-end text-white px-[4px] rounded'
            onClick={() => deleteShortcut(shortcut._id)}
          >delete</button>
        </div>
      </div>
    </div>

  )
}

export default Shortcut
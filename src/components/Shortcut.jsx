import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

const Shortcut = () => {
  const { shortcutId } = useParams()
  const [shortcut, setShortcut] = useState({})
  const [isStarred, setIsStarred] = useState(false)
  const [language, setLanguage] = useState('English')
  const shortcutNameRef = useRef()
  const hindiDescriptionRef = useRef()
  const englishDescriptionRef = useRef()

  const getShortcut = async () => {
    const response = await axios.get(`/api/getshortcut/${shortcutId}`)

    setShortcut(response.data.shortcut)

    if (response.data.shortcut.starred) {
      setIsStarred(true)
    } else {
      setIsStarred(false)
    }
  }

  const deleteShortcut = async (shortcutId) => {
    const response = await axios.delete(`/api/deleteshortcut/${shortcutId}`)
  }

  const editShortcut = async () => {

    const originalHindiDescription = shortcut.hindiDescription
    const originalEnglishDescription = shortcut.englishDescription
    const editedShortcutName = shortcutNameRef.current.textContent

    let tempShortcut;

    if (language === 'English') {
      const editedEnglishDescription = englishDescriptionRef.current.textContent

      tempShortcut = {
        editedShortcutName,
        editedEnglishDescription,
        editedHindiDescription: originalHindiDescription
      }
    } else {
      const editedHindiDescription = hindiDescriptionRef.current.textContent

      tempShortcut = {
        editedShortcutName,
        editedEnglishDescription: originalEnglishDescription,
        editedHindiDescription
      }
    }

    const response = await axios.put(`/api/editshortcut/${shortcutId}`, tempShortcut)
  }

  const toggleStar = async () => {
    const response = await axios.put(`/api/togglestart/${shortcutId}`)
  }

  useEffect((() => {
    getShortcut()
  }), [])
  return (
    <div className='flex flex-row justify-center mt-8'>
      <div className='w-96 bg-sky-300 p-4 rounded-lg'>
        <div>
          <div className='flex flex-row justify-between'>
            <p className='text-3xl font-bold'
              ref={shortcutNameRef}
              contentEditable
            >{shortcut.shortcutName}</p>
            <div className={`text-3xl ${isStarred ? 'text-yellow-500' : 'text-white'} cursor-pointer`}
              onClick={() => {
                setIsStarred((prevStarred) => !prevStarred)
                toggleStar()
              }}
            >&#9733;</div>
          </div>
          {language === 'English' ? (
            <div className='text-2xl mt-4'
              ref={englishDescriptionRef}
              contentEditable
            >{shortcut.englishDescription}</div>
          ) : (

            <div className='text-2xl mt-4'
              ref={hindiDescriptionRef}
              contentEditable
            >{shortcut.hindiDescription}</div>
          )
          }
        </div >
        <div className='flex flex-row justify-end	 gap-2'>
          <button
            className={`mt-8 w-16 ${language === 'English' ? 'bg-slate-700' : 'bg-yellow-800 '} text-white px-[2px] rounded  mr-auto`}
            onClick={() => {

              setLanguage((prevLanguage) => prevLanguage === 'English' ? 'Hindi' : 'English')
            }
            }
          >{language === 'English' ? 'Hindi' : 'English'}</button>
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
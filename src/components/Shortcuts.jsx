import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Shortcuts = () => {
    const [shortcuts, setShortcuts] = useState([])
    const [language, setLanguage] = useState('English')

    const getShortcuts = async () => {
        const response = await axios.get('/api/getshortcuts')

        const data = response.data.shortcuts.filter((shortcut, id) => shortcut.starred)

        setShortcuts([...data])
    }

    const deleteShortcut = async (shortcutId) => {
        const response = await axios.delete(`/api/deleteshortcut/${shortcutId}`)
    }

    useEffect(() => {
        getShortcuts()
    }, [shortcuts])

    return (
        <div className='flex flex-col gap-[15px] mt-8'>
            {shortcuts && shortcuts.map((shortcut, id) => (
                <div key={id}
                    className=' flex flex-col bg-sky-300 p-2 rounded-lg'
                >
                    <div
                        className='w-96'
                        onClick={() => {
                            if(language === 'English'){

                                navigator.clipboard.writeText(shortcut.englishDescription) 
                            } else{
                                navigator.clipboard.writeText(shortcut.hindiDescription) 

                            }
                        }}
                        key={id}
                    >
                        <p className='text-2xl font-bold w-96 '>{shortcut.shortcutName}</p>
                        {language === 'English' ? (
                            <div className='text-2xl mt-4'
                                contentEditable
                            >{shortcut.englishDescription}</div>
                        ) : (

                            <div className='text-2xl mt-4'
                                contentEditable
                            >{shortcut.hindiDescription}</div>
                        )
                        }
                        {/* <p className='text-xl w-96 mt-4'>{shortcut.englishDescription}</p>
                        <p className='text-xl w-96 mt-4'>{shortcut.hindiDescription}</p> */}
                    </div >
                    <div className='flex flex-row justify-end gap-2 '>
                        <button
                            className={`mt-8 w-16 ${language === 'English' ? 'bg-slate-700' : 'bg-yellow-800 '} text-white px-[2px] rounded  mr-auto`}
                            onClick={() => {

                                setLanguage((prevLanguage) => prevLanguage === 'English' ? 'Hindi' : 'English')
                            }
                            }
                        >{language === 'English' ? 'Hindi' : 'English'}</button>
                        <Link to={`/u/${shortcut._id}`}>
                            <button className='mt-8 bg-teal-800	 w-12 self-end text-white px-[2px] rounded'
                            >edit</button>
                        </Link>
                        <button className='mt-8 bg-red-500 w-12 self-end text-white px-[2px] rounded'
                            onClick={() => deleteShortcut(shortcut._id)}
                        >delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Shortcuts

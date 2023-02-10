import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  const [searchResults, setSearchResults] = useState([])
  const [language, setLanguage] = useState('English')

  const inputRef = useRef()

  const searchShortcut = async () => {
    const response = await axios.get(`/api/searchshortcut/${searchTerm}`)

    setSearchResults([...response.data.searchResults])
  }

  useEffect(() => {
    if (searchTerm) {
      searchShortcut()
    }
  }, [searchTerm])

  const deleteShortcut = async (shortcutId) => {
    const response = await axios.delete(`/api/deleteshortcut/${shortcutId}`)
  }

  return (
    <div className='flex flex-col gap-[15px] mt-12'>
      {searchResults.map((searchResult, id) => (
        <div key={id}>
          <div key={id}
            className=' flex flex-col bg-sky-300 p-4 rounded-lg'
          >
            <div
              className='w-96'
              onClick={() => {
                if (language === 'English') {
                  navigator.clipboard.writeText(searchResult.englishDescription)
                } else {
                  navigator.clipboard.writeText(searchResult.hindiDescription)

                }
              }}
              key={id}
            >
              <p className='text-4xl font-bold w-96 '>{searchResult.shortcutName}</p>
              {language === 'English' ? (
                <div className='text-2xl mt-4'
                  contentEditable
                >{searchResult.englishDescription}</div>
              ) : (

                <div className='text-2xl mt-4'
                  contentEditable
                >{searchResult.hindiDescription}</div>
              )
              }
            </div >
            <div className='flex flex-row justify-end gap-2'>
              <button
                className={`mt-8 w-16 ${language === 'English' ? 'bg-slate-700' : 'bg-yellow-800 '} text-white px-[2px] rounded  mr-auto`}
                onClick={() => {

                  setLanguage((prevLanguage) => prevLanguage === 'English' ? 'Hindi' : 'English')
                }
                }
              >{language === 'English' ? 'Hindi' : 'English'}</button>
              <Link to={`/u/${searchResult._id}`}>

                <button className='mt-8 bg-teal-800	 w-16 self-end text-white px-[4px] rounded'

                >edit</button>
              </Link>
              <button className='mt-8 bg-red-500 w-16 self-end text-white px-[4px] rounded'
                onClick={() => deleteShortcut(searchResult._id)}
              >delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchBox

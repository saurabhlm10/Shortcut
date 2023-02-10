import "./App.css";
import { useState, useRef, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Shortcut from "./components/Shortcut";
import CreateShortcut from "./components/CreateShortcut";
import Shortcuts from "./components/Shortcuts";
import SearchBox from "./components/SearchBox";

function App() {
  const [searchTerm, setSearchTerm] = useState(null)
  const primaryInputRef = useRef()

  useEffect(() => {
    if(primaryInputRef.current){
      primaryInputRef.current.focus()
    }
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex flex-col items-center !=">
            <div>
              <Link to="/createshortcut">
                <button className="fixed bottom-2 left-2 m-3 px-2 py-2 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" >Create Shortcut</button>
                <br />
              </Link>
            </div>

            <input type="text" placeholder='Search'
              ref={primaryInputRef}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
              className="form-control relative flex-auto min-w-0 block w-1/2 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Search" aria-describedby="button-addon3"
            />
            {searchTerm ? (
              <>
                <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </>
            ) : (
              <>
                <Shortcuts/>
              </>
            )}
          </div>
        }
      />
      <Route path="/createshortcut" element={
        <div className="flex justify-center items-center">
          <CreateShortcut />
        </div>
      } />
      <Route path="/u/:shortcutId" element={<Shortcut />} />


    </Routes>
  );
}

export default App;

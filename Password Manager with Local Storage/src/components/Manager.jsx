import React, { useState, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])
  const [isInitialized, setIsInitialized] = useState(false);
  const [editingId, setEditingId] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);



  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      console.log(JSON.parse(passwords))
      setPasswordArray(JSON.parse(passwords))
    }
    setIsInitialized(true);
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("passwords", JSON.stringify(passwordArray))
    }
  }, [passwordArray, isInitialized])




  const addPassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      let updatedPasswords;

      if (editingId) {
        updatedPasswords = passwordArray.map(item =>
          item.id == editingId ? { ...form, id: editingId } : item
        )
        toast.success('Password Edited!')
      } else {
        updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }]
        toast.success('Password Saved!')
      }

      setPasswordArray(updatedPasswords)
      setform({ site: "", username: "", password: "" })
      setEditingId(null)
    } else {
      toast.error('min length is 3', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(i => i.id === id)
    setform({ site: passwordToEdit.site, username: passwordToEdit.username, password: passwordToEdit.password })
    setEditingId(id)
  }

  const deletePassword = (id) => {
    // let confirmation = confirm("DO you really want to delete it?")
    // if (confirmation) {
    //   setPasswordArray(passwordArray.filter(item => item.id !== id))
    //   toast.success('Password Deleted!', {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // } else {
    //   toast.error('Password not deleted!', {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
    setConfirmDeleteId(id); // show confirm box
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast.info('Copied to clipboard')
  }

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "password"
    } else {
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = "text"
    }
  }



  return (
    <div >

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {confirmDeleteId && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-4">
            <p className="text-lg font-semibold">Are you sure you want to delete this password?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setPasswordArray(passwordArray.filter(item => item.id !== confirmDeleteId));
                  toast.success('Password Deleted!');
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div> */}
      <div className="form my-12">
        <div className='text-2xl flex justify-center font-semibold items-center   '>
          <span className='text-green-500'>&lt;</span>
          <span > Pass</span><span className='text-green-500'>OP</span>
          <span className='text-green-500'>/&gt;</span>
        </div>
        <h1 className='text-md text-center '>Your Own Password Manager</h1>

        <div className='flex flex-col w-1/2 mx-auto gap-5 my-5'>
          <input value={form.site} type="text" className=' border-green-300 border w-full rounded-xl bg-white p-1 px-4' placeholder='Enter Website Url' name='site' onChange={(e) => { handleChange(e) }} />
          <div className='flex gap-5'>
            <input value={form.username} type="text" className=' border-green-300 border w-2/3 rounded-xl bg-white p-1 px-4' placeholder='Enter Username' name='username' onChange={(e) => { handleChange(e) }} />
            <div className='relative '>
              <input ref={passwordRef} value={form.password} type="password" className=' border-green-300 border pr-7 rounded-xl bg-white p-1 px-4' placeholder='Enter Password' name='password' onChange={(e) => { handleChange(e) }} />
              <span className='absolute right-[3px] top-[4px] z-10 cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>

          <button className='flex bg-green-500 w-fit self-center cursor-pointer p-2 rounded-full px-4 justify-center items-center gap-1 text-lg' onClick={addPassword}>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover" >
            </lord-icon>
            {editingId ? "Edit Password" : "Add Password"}</button>

        </div>


        <div className="passwords w-full flex justify-center my-14 ">
          {passwordArray.length === 0 && <div className='text-lg'> No passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-3/4 bg-green-100">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='text-lg'>Site</th>
                <th className='text-lg'>Username</th>
                <th className='text-lg'>Password</th>
                <th className='text-lg'>Actions</th>
              </tr>
            </thead>
            <tbody >
              {passwordArray.map(item => {

                return <tr key={item.id}>
                  <td className='text-center min-w-32 py-1'>
                    <div className='flex items-center justify-center '>
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className='lordiconcopy size-7 flex justify-center items-center cursor-pointer' onClick={() => { copyText(item.site) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='text-center min-w-32 py-1'>
                    <div className='flex items-center justify-center '>
                      <span>{item.username}</span>
                      <div className='lordiconcopy size-7 flex justify-center items-center cursor-pointer' onClick={() => { copyText(item.username) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='text-center min-w-32 py-1'>
                    <div className='flex items-center justify-center gap-1'>
                      <span className='w-fit text-xl'>
                      {"•".repeat(item.password.length)}
                      </span>
                      <div className='lordiconcopy size-7 flex justify-center items-center cursor-pointer' onClick={() => { copyText(item.password) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>


                  <td className='text-center min-w-32 py-1'>
                    <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                  </td>
                </tr>

              })}
            </tbody>
          </table>}
        </div>



      </div>

    </div>
  )
}

export default Manager

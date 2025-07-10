import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar.jsx'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const [passwordsho, setPasswordsho] = useState("password");
  const [show, setShow] = useState("hover");
  const [count, setCount] = useState(0);
  const [passwordarray, setPasswordArray] = useState([]);
  const [form, setForm] = useState({
    website: '',
    username: '',
    password: ''
  });
  const getPasswords = async () => {
    let req = await fetch('http://localhost:3000/')
    let res = await req.json();
    console.log(res);
    setPasswordArray(res);
  }
  useEffect(() => {
    getPasswords();
  }, []);


  const handleClick = () => {
    if (passwordsho === "password") {
      setPasswordsho("text");
      setShow("hover-cross");
    } else {
      setPasswordsho("password");
      setShow("hover");
    }
  }

  const handleCopy = (text) => {
    console.log(text);
    text = text.target.parentElement.innerText;
    navigator.clipboard.writeText(text).then(() => {
      toast('Copied To Clipboard!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  }
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const savePassword = async () => {
    console.log(form);

    // Update React state and localStorage
    const newPasswordArray = [...passwordarray, form];
    setForm({
      website: '',
      username: '',
      password: ''
    });
    await setPasswordArray(newPasswordArray);
    send = fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    toast('Password Saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const deletePassword = async (index) => {
    console.log("Deleting password at index:", index);
    const c = window.confirm("Are you sure you want to delete this password?");
    if (c) {
      await fetch(`http://localhost:3000/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          },
        body: JSON.stringify({ _id: passwordarray[index]._id })
      })
      await getPasswords();



      toast('Password Deleted!', {
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

  const editPassword = async (index) => {
    console.log("Editing password at index:", index);
    const passwordToEdit = passwordarray[index];
    setForm({
      website: passwordToEdit.website,
      username: passwordToEdit.username,
      password: passwordToEdit.password
    });
    await fetch(`http://localhost:3000/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: passwordarray[index]._id })

    })
    await getPasswords();
  }
  return (
    <>
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
      <div className="absolute inset-0 -z-10 flex flex-col items-center h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <Navbar />
        <div className="inputdiv flex flex-col items-center justify-center m-10 w-[50%]">
          <input name="website" type="text" value={form.website} onChange={handleChange} placeholder='Enter Website URL' className='bg-white border-purple-700 border-2 rounded-full  py-2 px-4 w-full' />
          <div className="flex items-center justify-center">
            <input name="username" type="text" value={form.username} onChange={handleChange} placeholder='Enter Username' className='bg-white m-6 border-purple-700 border-2 rounded-full py-2 px-4 w-2/3' />
            <div className='flex items-center justify-center w-1/3 relative mx-4'>
              <input name="password" type={passwordsho} value={form.password} onChange={handleChange} placeholder='Enter password' className='bg-white m-6  border-purple-700 border-2 rounded-full py-2 px-4 full' />
              <lord-icon
                src="https://cdn.lordicon.com/dicvhxpz.json"
                trigger={show}
                className='absolute right-2'
                onClick={handleClick}
              />
            </div>
          </div>
          <button onClick={savePassword} className="rounded-full py-2 px-4 flex items-center justify-center border-2 border-purple-700 bg-purple-100 hover:bg-purple-200 transition duration-300 ease-in-out">
            <lord-icon src="https://cdn.lordicon.com/sbnjyzil.json" trigger="hover" />
            <span className='text-purple-700 text-xl font-semibold mx-4' >Save Password</span>
          </button>
        </div>
        <div className="passwords flex flex-col items-center justify-center w-[50%]">
          <h1 className='text-3xl font-semibold text-purple-700 mb-4'>Saved Passwords</h1>
          <table className='w-full mb-4'>
            <tr>
              <th className='py-2 px-4 text-left bg-purple-700 text-white'>Website</th>
              <th className='py-2 px-4 text-left bg-purple-700 text-white'>Username</th>
              <th className='py-2 px-4 text-left bg-purple-700 text-white'>Password</th>
              <th className='py-2 px-4 text-left bg-purple-700 text-white'>Actions</th>
            </tr>
            {passwordarray.map((password, index) =>


              <tr key={index} className='bg-purple-300'>
                <td className='py-2 px-4'><a href={password.website} target='blank'>{password.website}
                </a>
                  <lord-icon
                    src="https://cdn.lordicon.com/ejurburo.json"
                    trigger="hover" className="h-5 inline-block align-middle ml-2"
                    onClick={handleCopy} />
                </td>
                <td className='py-2 px-4 '>{password.username}<lord-icon
                  src="https://cdn.lordicon.com/ejurburo.json"
                  trigger="hover" className="h-5 inline-block align-middle ml-2"
                  onClick={handleCopy} /></td>
                <td className='py-2 px-4'>{password.password}
                  <lord-icon
                    src={`https://cdn.lordicon.com/ejurburo.json`}
                    trigger="hover"
                    className="h-5 inline-block align-middle ml-2"
                    onClick={handleCopy} /></td>
                <td className='py-2 px-4'>
                  <lord-icon
                    src="https://cdn.lordicon.com/exymduqj.json"
                    trigger="hover"
                    onClick={() => editPassword(index)}
                  />
                  <lord-icon
                    src="https://cdn.lordicon.com/jzinekkv.json"
                    trigger="hover"
                    className="mx-6"
                    onClick={() => deletePassword(index)}
                  />


                </td>
              </tr>


            )}
          </table>
        </div>
      </div>
    </>
  )
}

export default App

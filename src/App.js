import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'

// try to edit a user. The API is already built.

function App() {

    const [users, setUsers] = useState([]);
    const [inputText, setInputText] = useState('');



    const fetchUsers = async () => {
        let res = await fetch('http://localhost:3000/api/users')
        let u = await res.json()
        console.log('the users received from the backend are', u)
        setUsers(u)
    };


    useEffect(() => {
        console.log('this should run on page load!')
        fetchUsers()
    }, [])

    const deleteUser = async (user) => {
        let res = await fetch(`http://localhost:3000/api/users/${user.id}`, {method: 'DELETE'})
        await res.json()
        fetchUsers()
    };

    const createUser = async () => {
        console.log('Create the user now, the user typed this as the first Name:', inputText)
        let response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({firstName: inputText})
        })

        let u = await response.json()
        console.log('the new user is', u)
        setInputText('')
        fetchUsers()


    };

    const updateInputText = async (event) => {
        console.log(event.currentTarget.value)
        setInputText(event.currentTarget.value)

    };

  return (
    <div className={'p-10'}>
      <h1 className={'text-4xl'}>List of Users</h1>
        <input type="text"
                value={inputText}
               onChange={updateInputText}
               className={'border text-xs p-2 w-1/3'} placeholder={'type first name for the user'}/>
        <button className={'bg-blue-600 p-1 ml-2 text-white rounded text-xs'} onClick={createUser}>Submit</button>
        <ul>
            {users && users.map((user, idx) => {
                return <li key={idx}>
                    {user.firstName} {user.lastName}
                    <div className={'p-2'}>
                        <button className={'text-xs text-red-500 cursor-pointer'} onClick={() => deleteUser(user)}>Delete</button>
                    </div>

                </li>
            })}
        </ul>
    </div>
  );
}

export default App;

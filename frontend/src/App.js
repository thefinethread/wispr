import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
// const socket = socketIO.connect('http://localhost:5000');
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   socket.emit('message', () => {
  //     console.log('joined');
  //   });
  //   socket.on('message', (message) => {
  //     console.log(message);
  //   });
  // }, [socket]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </>
  );
}

export default App;

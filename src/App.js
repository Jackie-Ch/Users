import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [succes, setSucces] = useState(false);
  console.log(invitedUsers);
  useEffect(() => {
    fetch('https://reqres.in/api/users').then((resolv) => {
      resolv
        .json()
        .then((json) => {
          setUsers(json.data);
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка получения данных с сервера');
        })
        .finally(setLoading(false));
    });
  }, []);

  function handleChangeSearchValue(event) {
    setSearchValue(event.target.value);
  }
  function handleClickInvite(id) {
    if (invitedUsers.includes(id)) {
      setInvitedUsers((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvitedUsers((prev) => [...prev, id]);
    }
  }
  function handleClickSubmitInvite() {
    setSucces(true);
  }
  return (
    <div className="App">
      {succes ? (
        <Success count={invitedUsers.length} />
      ) : (
        <Users
          handleClickInvite={handleClickInvite}
          items={users}
          isLoading={isLoading}
          handleChangeSearchValue={handleChangeSearchValue}
          searchValue={searchValue}
          invitedUsers={invitedUsers}
          handleClickSubmitInvite={handleClickSubmitInvite}
        />
      )}
    </div>
  );
}

export default App;

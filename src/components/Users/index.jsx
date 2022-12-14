import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({
  items,
  isLoading,
  searchValue,
  handleChangeSearchValue,
  handleClickInvite,
  invitedUsers,
  handleClickSubmitInvite,
}) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          type="text"
          placeholder="Найти пользователя..."
          value={searchValue}
          onChange={handleChangeSearchValue}
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items
            .filter((obj) => {
              const fullName =
                obj.first_name.toLowerCase() + obj.last_name.toLowerCase();
              const email = obj.email.toLowerCase();
              if (
                fullName.includes(searchValue.toLowerCase()) ||
                email.includes(searchValue.toLowerCase())
              ) {
                return true;
              }
              return false;
            })
            .map((obj) => (
              <User
                {...obj}
                key={obj.id}
                userId={obj.id}
                handleClickInvite={handleClickInvite}
                isInvited={invitedUsers.includes(obj.id)}
              />
            ))}
        </ul>
      )}
      {invitedUsers.length > 0 && (
        <button className="send-invite-btn" onClick={handleClickSubmitInvite}>
          Отправить приглашение
        </button>
      )}
    </>
  );
};

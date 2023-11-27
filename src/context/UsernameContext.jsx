import React, { createContext, useContext, useState, useMemo } from "react";

export const UserContext = createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  //   const onUsernameChange = (username) => {
  //     setUsername(username);
  //   };

  const providerValue = useMemo(
    () => ({ username, setUsername }),
    [username, setUsername],
  );

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

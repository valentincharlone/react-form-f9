import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    //con esta funcion nos traemos al usuario para ver si esta activo o no
      const unsusbribe = onAuthStateChanged(auth, (user) => {
          console.log(user);
          if (user) {
              const { email, photoURL, displayName, uid } = user;
              setUser({ email, photoURL, displayName, uid });
          } else {
              setUser(null);
          }
      });

      return () => unsusbribe();
  }, []);

  const registerUser = (email, password) =>
    //funcion que nso permite hacer el registro de un usuario
      createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    //funcion que nos permite loguear al usuario
      signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => signOut(auth);
    // funcion que nos permite desloguear usuario, cerrar sesion

  return (
      <UserContext.Provider
          value={{ user, setUser, registerUser, loginUser, signOutUser }}
      >
          {children}
      </UserContext.Provider>
  );
};

export default UserProvider;
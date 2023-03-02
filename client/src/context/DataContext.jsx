import React from "react";
import { useLocation } from 'react-router-dom';

export const dataContext = React.createContext(null);
const isLoggedStorage = JSON.parse(localStorage.getItem('isLogged')) || false;

export default function DataContext({ children }) {

  const [newElements, setNewElements] = React.useState([]);
  const [dificulty, setDificulty] = React.useState('Easy');
  const [elements, setElements] = React.useState([]);
  const [isLogged, setIslogged] = React.useState(isLoggedStorage);
  const [start, setStart] = React.useState(false);
  const [dataUser, setDataUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [mistakes, setMistakes] = React.useState(0);
  const [disableSelect, setDisableSelect] = React.useState(false);

  
  const location = useLocation();

  const updateDisableSelect = disableSelect => {
    setDisableSelect(disableSelect);
  }

  const updateMistakes = mistakes => {
    setMistakes(mistakes + 1);
  }

  const validateLoading = isLoading => {
    setIsLoading(isLoading);
  }

  const getDataUser = dataUser => {
    setDataUser(dataUser);
  }

  const userLoggedIn = () => {
    !isLogged && setIslogged(true);
  }

  const userLoggedOut = () => {
    setIslogged(false);
  }

  const startGame = boolean => {
    setStart(boolean);
  }

  const selectDificulty = dificulty => {
    setDificulty(dificulty);
  }

  const generateNewElements = (newElements, n) => {
    const arr = newElements.slice(0, n);
    location.pathname === '/pokemon' ? setNewElements([...arr, ...arr]) : setNewElements(arr);
  }

  const deleteElements = () => {
    setNewElements([]);
    setElements([]);
  }

  const generateElements = () => {
    for (let i = 1; i <= 150; i++) {
      elements.push(i);
    }
    setElements(elements);
  }

  return (
    <>
      <dataContext.Provider value={{ updateDisableSelect, disableSelect, mistakes, updateMistakes, isLoading, dataUser, validateLoading, getDataUser, start, startGame, userLoggedOut, userLoggedIn, isLogged, selectDificulty, dificulty, generateNewElements, deleteElements, generateElements, newElements, location, elements }}>
        {children}
      </dataContext.Provider>
    </>
  );
}
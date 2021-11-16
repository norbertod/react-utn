import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeroCard } from "../../components/HeroCard";
//import { useHistory } from 'react-router';
import {
  obtenerHeroesAction,
  obtenerAnteriorHeroeAction,
  obtenerSiguienteHeroeAction,
} from "../../redux/heroeDucks";
import { obtenerLogout } from "../../redux/loginDucks";
import { HeroList } from "../../components/HeroList";

export const HomePage = ({ history }: any) => {
  const dispatch = useDispatch();
  //const history = useHistory ();
  console.log(history);

  useEffect(() => {
    dispatch(obtenerHeroesAction());
  }, []);

  useSelector((state: any) => console.log(state));

  // console.log(heroes)


  const handleGetHeroes = () => {
    dispatch(obtenerSiguienteHeroeAction());
  };
  const handleGetHeroesAnterior = () => {
    dispatch(obtenerAnteriorHeroeAction());
  };


  return (
    <>
      <button onClick={handleGetHeroes}>Siguiente</button>
      <button onClick={handleGetHeroesAnterior}>Anterior</button>

      <br />
      <br />
      <HeroList />
      <br />
      <br />
    </>
  );
};

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { unHeroeDetalleAccion } from "../../redux/heroeDucks";
import { Button, Grid, Typography } from "@material-ui/core";

export const HeroScreen = ({ history }: any) => {
  const { heroeId } = useParams<{ heroeId?: string }>();

  const dispatch = useDispatch();

  //useMemo(() => dispatch( unHeroeDetalleAccion(heroeId || '') ), [dispatch, heroeId]);

  useEffect(() => {
    dispatch(unHeroeDetalleAccion(heroeId || ""));
  }, [dispatch, heroeId]);

  const { hero } = useSelector((state: any) => state.heroes);

  if (!hero) {
    return <Redirect to="/" />;
  }

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push("/");
    } else {
      history.goBack();
    }
  };

  const {
    id,
    name,
    biography: { publisher },
    image: { url },
    biography: { "alter-egos": alter_ego },
  } = hero;

  return (
    <div>
      <Grid container direction="row">
        {/* <h1>HeroScreen</h1> */}
        <Grid item md={6}>
          <img src={url} alt="" />
          <Button onClick={handleReturn}>Return...</Button>
        </Grid>
        <Grid item md={6} >
          <Typography>{id}</Typography>
          <Typography>{name}</Typography>
          <Typography>{publisher}</Typography>
          <Typography>{alter_ego}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

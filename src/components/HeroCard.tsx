import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  Avatar,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { pink, red } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    // marginInline: 10,
    // marginBottom: 10
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: red[500],
  },
});

export function HeroCard({ id, name, url, publisher }: any) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    // <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {id}
          </Avatar>
        }
        title={name}
        subheader={publisher}
      />
      <CardMedia component="img" height="194" image={url} alt="No image" />
      <CardActions>
        <Link to={`./hero/${id}`}>
          <Typography variant="subtitle1">Mas...</Typography>
        </Link>
        <IconButton onClick={() => {}} aria-label="add to favorites">
          <FavoriteIcon style={{ color: pink[500] }} />
        </IconButton>
      </CardActions>
    </Card>
    // </Grid>
  );
}

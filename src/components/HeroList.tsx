
import { Grid, makeStyles, createStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { HeroCard } from './HeroCard'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);


export const HeroList = () => {

    const classes = useStyles();

    const {array: heroes} = useSelector((state:any) => state.heroes)

    return (
    
    // <div className={classes.root}>
        <Grid 
            container 
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
        >
                {
                        heroes.map( (hero:any) => (
                             <Grid key={`herolist-${ hero.id }`} item xs={12} sm={6} md={4} lg={3} xl={3} >
                                <HeroCard 
                                    // key={`herolist-${ hero.id }`}
                                    { ...hero }
                                    />
                            </Grid>
                        ))
                }                   
        </Grid>
    // </div>
       
    )
}

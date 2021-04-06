import React from 'react'
// eslint-disable-next-line
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import {Link, useLocation } from 'react-router-dom'
import useStyles from './styles'
// import classes from '*.module.css'
const Navbar = ({totalItem}) => {
  const classes = useStyles()
  const location = useLocation()
  return (
    <>
      <AppBar position='fixed' color='inherit' className={classes.appBar}>
        <Toolbar>
            <Typography component={Link} to="/" variant='h6' className={classes.title} color='inherit'> 
              <img src='/assets/commerce.png' alt='commerce.js' height='25px' className={classes.image}/>
              Commerce.js
            </Typography>
            <div className={classes.grow}/>
            {location.pathname === '/' && (
              <div>
                <IconButton component={Link} to='/cart' aria-label='show cart item' color='inherit'>
                  <Badge badgeContent={totalItem} color='secondary'>
                    <ShoppingCart/>
                  </Badge>
                </IconButton>
              </div>
            )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar

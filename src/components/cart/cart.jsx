import React from 'react'
// eslint-disable-next-line
import {Container, Typography, Button, Grid} from '@material-ui/core'
import useStyles from './styles';
import {Link} from 'react-router-dom'
import CartItem from './cartItem/cartItem';


export default function Cart ({cart, emptyCart, updateCart, removeCart}) {
  // eslint-disable-next-line
  const classes = useStyles()
  if (!cart.line_items) {
    return 'loading'
  }
  const empty = !cart.line_items.length
  return  (
      empty ?( 
              <Container>
                <div className={classes.toolbar}/>
                  <Typography>No items, 
                  <Link to='/' className={classes.link}>Add Some Items</Link>
                  </Typography>
              </Container>
              ) :
      <>
      <Container>
      <div className={classes.toolbar}/>
      <Typography className={classes.title} variant='h3'>Your Shipping Cart</Typography>
      <Grid container spacing={3}>
      {cart.line_items.map((item)=>(
        <Grid item xs={12} sm={4} key={item.id}>
          <CartItem addToCart={updateCart} removeCart={removeCart} item={item}/>
        </Grid>
      ))}
      </Grid>
      <div className={classes.cardDetails}>
          <Typography variant='h4'>subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
          <div>
            <Button className={classes.emptybutton} size='large' type='button' variant='contained' color='secondary' onClick={emptyCart}>empty cart</Button>
            <Button component={Link} to="/checkout" className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>Check Out</Button>
          </div>
      </div>
  
    </Container>
        </>
  )
}



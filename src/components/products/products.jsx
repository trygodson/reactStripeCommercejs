import React from 'react'
import {Grid} from '@material-ui/core'
import Product from './product/product'
import useStyles from './styles'

export default function Products({products, handleCart}){


  const classes =useStyles()
  return(
    <main className={classes.content}>
      <div className={classes.toolbar}/>
      <Grid container justify='center' spacing={4}>
        {products.map((products)=>
          (
            <Grid item key={products.id} xs={12} sm={6} md={4} lg={3}>
              <Product products={products} addToCart={handleCart}/>
            </Grid>
          )
        )}
      </Grid>
    </main>
  )
}
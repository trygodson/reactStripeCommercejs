import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import useStyles from './styles'

const Product = ({products, addToCart}) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={products.media.source} title={products.name}/>
        <CardContent>
          <div className={classes.cardcontent}>
            <Typography variant='h5' gutterBottom>
              {products.name}
            </Typography>
            <Typography variant='h5' gutterBottom>
              {products.price.formatted_with_symbol}
            </Typography>
          </div>
          <Typography dangerouslySetInnerHTML={{ __html: products.description}} variant='body2' color='textSecondary'/>
        </CardContent>
        <CardActions disabledSpacing className={classes.cardActions}>
          <IconButton aria-label='add to cart' onClick={()=> addToCart(products.id, 1)}>
            <AddShoppingCart/>
          </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product

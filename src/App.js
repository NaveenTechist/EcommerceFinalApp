import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    cartSummeryPrice: 0,
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const removeItem = cartList.filter(each => {
      if (id === each.id) {
        return false
      }
      return true
    })
    if (removeItem.length === 0) {
      this.setState({cartList: []})
    } else {
      this.setState({cartList: removeItem}, this.priceSummaryUpdate)
    }
  }

  priceSummaryUpdate = () => {
    const {cartList} = this.state
    const summaryPrice = cartList.map(
      eachOne => parseInt(eachOne.price) * parseInt(eachOne.quantity),
    )

    const addition = summaryPrice.reduce((each1, each2) => each1 + each2)
    this.setState({cartSummeryPrice: addition})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const increCount = cartList.map(each => {
      if (id === each.id) {
        if (each.quantity >= 1) {
          return {...each, quantity: each.quantity - 1}
        }
        if (each.quantity <= 2) {
          this.removeCartItem(id)
        }
      }
      return each
    })
    this.setState({cartList: increCount}, this.priceSummaryUpdate)
  }

  incrementCartItemQuantity = id => {
    console.log(id)
    const {cartList} = this.state
    const increCount = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    this.setState({cartList: increCount}, this.priceSummaryUpdate)
  }

  removeDuplicatesFunction = () => {
    const withIdArray = []
    const duplicates = []
    const {cartList} = this.state
    const finalArray = cartList.filter(item => {
      if (!withIdArray.includes(item.id)) {
        withIdArray.push(item.id)
        return true
      }
      duplicates.push(item.id)
      return false
    })
    console.log(duplicates)
    duplicates.forEach(each => this.incrementCartItemQuantity(each))
    this.setState({cartList: finalArray})
  }

  addCartItem = product => {
    this.setState(
      prevState => ({cartList: [...prevState.cartList, product]}),
      () => {
        this.priceSummaryUpdate()
        this.removeDuplicatesFunction()
      },
    )

    console.log('state')
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList, cartSummeryPrice} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          cartSummeryPrice,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

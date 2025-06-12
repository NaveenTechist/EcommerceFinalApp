import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <ul className="cart-list">
          <div className="cart-remove-all-container">
            <button
              type="button"
              className="remove-all-btn"
              onClick={onClickRemoveAll}
            >
              Remove All
            </button>
          </div>
          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView

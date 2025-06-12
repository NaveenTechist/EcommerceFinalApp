import CartContext from '../../context/CartContext'

import './index.css'

const CartSummaryPrice = () => (
  <CartContext.Consumer>
    {value => {
      const {cartSummeryPrice, cartList} = value
      const cartListCount =
        cartList.length > 1
          ? `${cartList.length} items in cart `
          : `${cartList.length} Item in cart `
      return (
        <div className="cart-summary-container">
          <div className="text-only-left">
            <h4 className="summary-order-header">
              Order Total:{' '}
              <span className="summary-rupes">Rs {cartSummeryPrice}/-</span>
            </h4>
            <p className="order-items-count">{cartListCount}</p>
          </div>
          <button type="button" className="summary-checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummaryPrice

/**
 * Executaion       :1.default node      cmd>nodemon start
 *
 * purpose          :to save find update and delete in the database
 *
 * @file            :note.js
 * @author          :Gautam Biswal
 * @version         :1.0.0
*/
const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration' },
    bookId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' }],
    isPurchased: { type: Boolean, default: false },
}, {
    timestamps: true, versionKey: false,
});

const CartModel = mongoose.model('Cart', cartSchema);

class CartModels {

    /**
   * @description   : It adds book into the cart
   * @param {*} data
   * @returns       : Callback
  */
    addToCart = async (data, callback) => {
        const user = await CartModel.findOne({ userId: data.userId });
        console.log(data.userId)
        if (!user) {
            const cartDetails = new CartModel({
                bookId: data.bookId,
                userId: data.userId,
            });
            cartDetails.save()
            callback(null, 'book added to cart')
        } else {
            const result = await CartModel.findOneAndUpdate({ userId: data.userId },
                { $addToSet: { bookId: data.bookId } });
            callback(null, result);

        }
    }

    /**
   * @description   : It removes book from cart
   * @param {*} data
   * @returns       : Promise
  */
  removeBookFromCart = (data) => {
    return new Promise((resolve, reject) => {
      CartModel.findOneAndUpdate({ userId : data.userId }, { $pull: { bookId: data.bookId } })
        .then((book) => resolve(book))
        .catch((err) => reject(err));
    });
  }

  /**
     * @description     : getting all carts from the bookStoreApp
     * @returns         : Promise
    */
   getAllCarts = () => {
    return new Promise((resolve, reject) => {
      CartModel.find()
        .then((books) => resolve(books))
        .catch((err) => reject(err));
    });
  }

   /**
   * @description   : It changes the isPurchased to true in cart
   * @param {*} data
   * @returns       : Promise
  */
    placeOrder = (data) => {
        return new Promise((resolve, reject) => {
          CartModel.findByIdAndUpdate(data.cartId, {userId: data.userId}, { isPurchased: true })
            .then((cart) => resolve(cart))
            .catch((err) => reject(err));
        });
      }
  
}

module.exports = new CartModels();

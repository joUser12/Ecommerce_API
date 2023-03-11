const catchAyncError = require("../middlewares/catchAyncError");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
// create new Order
exports.newOrder = catchAyncError(async (req, res, next) => {
  console.log(req, "dfdfdf");
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// Get single Order -api/v1/order/:id

exports.getSingleOrder = catchAyncError(async (req, res, next) => {
  // populate method any collection data get

  const order = await Order.findById(req.params.id).populate(
    "user",
    "name +email"
  );
  if (!order) {
    return next(new ErrorHandler(`Order not found with this id :${req.params.id} `, 404)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get login user order-api/v1/myorders

exports.myorders = catchAyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    orders,
  });
});

// Admin : Get All orders- api/v1/orders

exports.orders = catchAyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount =0;

  orders.forEach(order=>{
    totalAmount+=order.totalPrice
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Admin : Update Order/order status - api/v1/order/:id


exports.updateOrder = catchAyncError(async (req, res, next) => {
  
  const order = await Order.findById(req.params.id);
  console.log(order);
  if(order.orderStatus == 'Delivered'){
    return next (new ErrorHandler('order has been already delivered',404))
  }

  // updating the product stock of each order item

  order.orderItems.forEach(async orderItem=>{
    await updateStock(orderItem.product,orderItem.quantity)
  })
  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();
  await order.save();


  res.status(200).json({
    success: true,
  });
});


async function updateStock(productId,quantity){
  console.log(productId);
  const product = await Product.findById(productId);
  product.stock = product.stock - quantity
  product.save({validateBeforeSave:false})
}


// Admin : Delete Order - api/v1/order/:id

exports.deleteOrder = catchAyncError (async(req,res,next)=>{
  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new ErrorHandler(`Order not found with this id :${req.params.id} `, 404))
  }

  await order.remove();

  res.status(200).json({
    success:true
  })
})

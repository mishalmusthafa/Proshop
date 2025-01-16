import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc Create new order
// @routes POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
});

// @desc Get logged user's items
// @routes GET /api/orders/mine
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    if (orders) {
        res.status(200).json(orders);
    }
});

// @desc Get order by id
// @routes GET /api/orders/:id
// @access Private/admin
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );
    // user name and email is from the user model which is usefull for later
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc Update orders to paid
// @routes PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('Update order to paid');
});

// @desc Update to delivered
// @routes PUT /api/orders/:id/deliver
// @access Private/Admin
const updateToDelivered = asyncHandler(async (req, res) => {
    res.send('Update order to delivered');
});

// @desc Get all orders
// @routes GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('Get all orders');
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateToDelivered,
    getOrders,
};
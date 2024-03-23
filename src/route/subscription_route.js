const express =require('express');
const router =express.Router();
const subscription_controller= require('../controller/subscription_controller');

router.post('/create_customer',subscription_controller.createCustomer);
router.post('/create_subscription',subscription_controller.createSubscription);
router.post('/insert_subscription',subscription_controller.insertSubscription);
router.post('/check_subscription',subscription_controller.checkSubscription);
router.post('/payment_intent',subscription_controller.payment_Intent);
router.post('/add_card',subscription_controller.add_card);
router.post('/demo',subscription_controller.add_demo);
module.exports =router; 







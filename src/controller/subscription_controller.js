const subscription_model = require("../model/subscription_model");
const stripe = require("stripe")(
  "sk_test_51OjyJLKIJa7H9ZVBnDiBLNOg5vJf2AZF5vV5z9zPzmPaGko2Ky95lyKmxRs3DaY3c1A269lP8g4l5NeXz6S7VDTu00w9XBNXYZ"
);

async function createCustomer(name, email, description) {
  const customer = await stripe.customers.create({
    email: email,
    name: name,
    description: description,
  });

  return customer;
}

async function attachPaymentMethod(customerId, paymentMethodId) {
  await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  });

  // Set the attached payment method as the default for the customer
  await stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });
}

const subscription_controller = {
  createCustomer: async (req, res) => {
    console.log(req.body, "req_ body");
    console.log(req.body.name, "req_ body_name");
    console.log(req.body.email, "req_ body_email");

    const customers = await stripe.customers.search({
      query: `email:\'${req.body.email}\' AND name:\'${req.body.name}\'`,
    });

    const dataLength = customers.data;
    console.log(dataLength.length, "customers length");
    console.log(customers, "payment_intent");
    if (dataLength.length === 0) {
      const customer = await stripe.customers.create({
        name: req.body.name,
        email: req.body.email,
      });
      console.log("New Customer Created");
      res.status(200).json({
        message: "Customer Created",
        data: customer,
        success: true,
        error: false,
      });
    } else {
      res.status(200).json({
        data: customers.data[0],
        success: true,
        error: false,
        message: "Customer Already Exists",
      });
    }
  },
  createSubscription: async (req, res) => {
    const subscription = await stripe.subscriptions.create({
      customer: req.body.customer_id,
      items: [
        {
          price: req.body.price,
        },
      ],
    });
    console.log(subscription, "subscription");
    res.status(200).json({
      message: "Subscription Created",
      data: subscription,
      success: true,
      error: false,
    });
  },
  checkSubscription: async (req, res) => {
    try {
      console.log(req.body.account_id.length, "req.body");
      if (req.body.account_id.length === 0) {
        res.status(400).json({
          message: "Account id is required",
          success: true,
          error: false,
        });
      } else {
        const subscription_id = await subscription_model.getStatus(
          req.body.account_id
        );
        console.log(subscription_id, "res");
        if(subscription_id ===1)
        {
          res.status(200).json({
            message: "No such Subscription is find",
            success: true,
            error: false,
          });
        }
        else
        {
          const subscription = await stripe.subscriptions.retrieve(
            subscription_id
          );
          console.log(subscription, "subscription");
          res.status(200).json({
            message: "Subscription check",
            data: subscription,
            success: true,
            error: false,
          });
        }
        
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
        success: true,
        error: false,
      });
    }
  },
  insertSubscription: async (req, res) => {

    try
    {
       if(req.body.customer_id.length ===0 && req.body.subscription_id.length ===0)
       {
        res.status(400).json({
          message: "Customer id & subscription id is requried",
          success: true,
          error: false,
        });
       }
       else
       {
        console.log(req.body, "response");
        const insertData = await subscription_model.Subscription(req.body);
        console.log(insertData, "insertData");
        res.status(200).json({
          message: insertData,
          success: true,
          error: false,
        });
       }
    }
    catch(error)
    {
      res.status(500).json({
        message: error.message,
        success: true,
        error: false,
      });
    }
    
  },
  payment_Intent: async (req, res) => {
    console.log(req.body, "response");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: req.body.currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log(paymentIntent, "paymentIntent");
    res.status(200).json({
      message: paymentIntent,
      success: true,
      error: false,
    });
  },

  add_demo: async (req, res) => {
    const customer_id = req.body.customer_id;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500,
      currency: "gbp",
      payment_method: "pm_card_visa",
    });
    console.log(paymentIntent, "paymentIntent");
    console.log("PM :", paymentIntent.id);
    console.log("PM ID :", paymentIntent.payment_method);
    const pi = paymentIntent.id;
    const pm = paymentIntent.payment_method;
    console.log("customer_id", customer_id);
    const customer = await stripe.customers.retrieve(customer_id);
    console.log(customer, "customer");

    const updatedPaymentIntent = await stripe.paymentIntents.update(pi, {
      customer: customer_id,
      setup_future_usage: "on_session",
    });
    console.log(updatedPaymentIntent, "updatedPaymentIntent");

    if (!customer.invoice_settings.default_payment_method) {
      console.log("inside", customer_id);
      console.log("paymentMethodId", pm);
      const paymentMethod = pm;
      await attachPaymentMethod(customer_id, paymentMethod);
    }

    const customer2 = await stripe.customers.retrieve(customer_id);
    console.log(customer2, "customer22");
    const subscription = await stripe.subscriptions.create({
      customer: req.body.customer_id,
      items: [
        {
          price: req.body.price_id,
        },
      ],
    });
    console.log(subscription, "subscription");
    res.status(200).json({
      message: "Subscription Created",
      data: subscription,
      success: true,
      error: false,
    });
  },

  add_card: async (req, res) => {
    const params = {
      // mandatory
      number: "4242424242424242",
      expMonth: 11,
      expYear: 17,
      cvc: "223",
      // optional
      name: "Test User",
      currency: "usd",
      addressLine1: "123 Test Street",
      addressLine2: "Apt. 5",
      addressCity: "Test City",
      addressState: "Test State",
      addressCountry: "Test Country",
      addressZip: "55555",
    };

    const token = await stripe.createTokenWithCard(params);

    console.log(token, "token");
    // const charge = await stripe.charges.create({
    //   amount: 999,
    //   currency: 'usd',
    //   description: 'Example charge',
    //   source: token,
    // });

    const payment_Intent = await stripe.paymentIntents.create({
      amount: 999,
      currency: "usd",
      customer_id: "cus_PghHHh323b3MrU",
      payment_method_types: ["card"],
    });
    res.status(200).send({ card: "card.id" });
  },
};
module.exports = subscription_controller;

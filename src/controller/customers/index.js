const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cls = require('continuation-local-storage')
const Customer = require('../../models/customer')
const emailTemplate = require('../../utils/emailTemplate')
const errorHandler = require('../../utils/errorHandler')
const session = cls.getNamespace('session')

const createCustomer = async (req, res) => {
  try {
    // Check to see if customer already exists
    const customer = Customer()
    const data = req.body
    const { first_name, last_name, email, password, type } = data
    const customerExists = await customer.findByEmailAddress(email)

    if (!type) {
      return res.status(401).send({
        message: 'Type is required'
      })
    }

    if (type && type !== 'customer') {
      return res.status(401).send({
        message: 'Correct type is required'
      })
    }

    if (!first_name) {
      return res.status(401).send({
        message: 'First name is required'
      })
    }

    if (!last_name) {
      return res.status(401).send({
        message: 'Last name is required'
      })
    }

    if (!email) {
      return res.status(401).send({
        message: 'Email is required'
      })
    }

    if (!password) {
      return res.status(401).send({
        message: 'Password is required'
      })
    }

    if (customerExists) {
      return res.status(401).send({
        message: 'Customer already exists'
      })
    }

    const customerResponse = new Customer()(data)
    const token = await customerResponse.generateVerifyToken('1hr')
    customer.verify_token = token
    await customer.save()
    await emailTemplate.verifyEmailAddress({
      name: `${first_name} ${last_name}`,
      email,
      token
    })

    res.status(201).send(customerResponse)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getCustomerTokens = async (req, res) => {
  try {
    const customerInstance = Customer()
    const { type, email, password } = req.body

    if (!type) {
      return res.status(401).send({
        message: 'Type is required'
      })
    }

    if (type !== 'token') {
      return res.status(401).send({
        message: 'Correct type is required'
      })
    }

    if (!email) {
      return res.status(401).send({
        message: 'Email is required'
      })
    }

    if (!password) {
      return res.status(401).send({
        message: 'Password is required'
      })
    }

    const customer = await customerInstance.findByEmailAddress(email)

    if (!customer) {
      return res.status(401).send(errorHandler(401, 'Sorry, we can’t find an account with this email.'))
    }

    if (customer.locked) {
      return res.status(401).send(errorHandler(401, `Sorry, this account has been locked. Please contact us at ${process.env.EMAIL_ADDRESS}`))
    }

    if (customer.lock_until && (customer.lock_until > Date.now())) {
      return res.status(401).send(errorHandler(401, 'Sorry, you are temporarily locked from your account.'))
    }

    if (!bcrypt.compareSync(password, customer.password)) {
      if (customer.login_attempts < 3) {
        await customerInstance.updateOne({ _id: customer._id }, {
          login_attempts: customer.login_attempts += 1,
          updated_at: Date.now()
        })

        return res.status(401).send(errorHandler(401, 'Sorry, the password is not right for this account.'))
      }

      // Lock customer out of account

      await customerInstance.updateOne({ _id: customer._id }, {
        login_attempts: 0,
        lock_until: Date.now() + (30 * 60000), // 30 mins from now
        updated_at: Date.now()
      })

      return res.status(401).send(errorHandler(401, 'Sorry, for security reasons, you will have to wait 30 minutes before trying again.'))
    }

    const customerToken = await customer.generateToken('24hrs')

    await customerInstance.updateOne({ _id: customer._id }, {
      login_attempts: 0,
      lock_until: null,
      updated_at: Date.now()
    })

    res.status(200).send({
      type: 'token',
      customer_id: customer._id,
      token: customerToken,
      expires: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    })
  } catch (err) {
    console.log('ERROR', err)
    res.status(err.status).send(err)
  }
}

const getCustomer = async (req, res) => {
  const custId = session.get('cust_id')
  const customer = await Customer()
    .aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(custId) }
      },
      {
        $limit: 1
      },
      {
        $lookup: {
          from: 'customeraddresses',
          localField: 'addresses',
          foreignField: '_id',
          as: 'addresses'
        }
      }, {
        $unset: 'password'
      }

    ])

  console.log('customer', customer)

  res.status(200).send(customer[0])
}

const updateCustomer = async (req, res) => {
  const customerInstance = Customer()
  const data = req.body
  const { type } = data
  const custId = session.get('cust_id')

  if (!type) {
    return res.status(401).send({
      message: 'Type is required'
    })
  }

  if (type && type !== 'customer') {
    return res.status(401).send({
      message: 'Correct type is required'
    })
  }

  try {
    await customerInstance.updateCustomer(custId, data)
    const customer = await customerInstance.findOne({ _id: custId }).select('-password')

    res.status(200).send(customer)
  } catch (err) {
    res.status(400).send(err)
  }
}

const deleteCustomer = async (req, res) => {
  try {
    const custId = session.get('cust_id')
    await Customer().deleteCustomer(custId)

    res.status(204).send({
      message: 'Customer successfully deleted'
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

const resendVerificationEmail = async (req, res) => {
  try {
    const data = req.body
    const { type, first_name, last_name, email } = data

    if (!type) {
      return res.status(401).send({
        message: 'Type is required'
      })
    }

    if (type !== 'customer') {
      return res.status(401).send({
        message: 'Correct type is required'
      })
    }

    const customer = await Customer().findOne({ _id: req.params.customerId }).select('-password')
    const token = await customer.generateVerifyToken('1hr')

    customer.verify_token = token
    await customer.save()
    await emailTemplate.verifyEmailAddress({
      name: `${first_name} ${last_name}`,
      email,
      token
    })
    res.status(200).send({
      message: 'Verification email successfully sent'
    })
  } catch (err) {
    res.status(err.status).send(err)
  }
}

const verifyCustomer = async (req, res) => {
  try {
    const { type, verify_token } = req.body

    if (!type) {
      return res.status(401).send({
        message: 'Type is required'
      })
    }

    if (type !== 'verify_customer') {
      return res.status(401).send({
        message: 'Correct type is required'
      })
    }

    try {
      jwt.verify(verify_token, process.env.VERIFY_SECRET)

      const customer = await Customer().verifyToken(verify_token)

      if (!customer) {
        // customer doesn't exist but we can't tell users that
        return res.status(401).send({
          message: 'Customer does not exist'
        })
      }

      res.status(200).send({
        message: 'Email address has been verified'
      })
    } catch (err) {
      if (err.message === 'jwt expired') {
        return res.status(401).send({
          message: 'Token has expired'
        })
      }
      return res.status(401).send({
        message: 'Token is incorrect'
      })
    }
  } catch (err) {
    res.status(err.status).send(err)
  }
}

module.exports = {
  createCustomer,
  getCustomerTokens,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  resendVerificationEmail,
  verifyCustomer
}

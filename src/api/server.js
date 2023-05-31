import { rest, setupWorker } from 'msw'
import { factory, oneOf, manyOf, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import faker from 'faker'
import seedrandom from 'seedrandom'
import { Server as MockSocketServer } from 'mock-socket'
import { setRandom } from 'txtgen'

import { parseISO } from 'date-fns'

const NUM_USERS = 3
const POSTS_PER_USER = 3
const RECENT_NOTIFICATIONS_DAYS = 7

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 2000

/* RNG setup */

// Set up a seeded random number generator, so that we get
// a consistent set of users / entries each time the page loads.
// This can be reset by deleting this localStorage value,
// or turned off by setting `useSeededRNG` to false.
let useSeededRNG = true

let rng = seedrandom()

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem('randomTimestampSeed')
  let seedDate

  if (randomSeedString) {
    seedDate = new Date(randomSeedString)
  } else {
    seedDate = new Date()
    randomSeedString = seedDate.toISOString()
    localStorage.setItem('randomTimestampSeed', randomSeedString)
  }

  rng = seedrandom(randomSeedString)
  setRandom(rng)
  faker.seed(seedDate.getTime())
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(rng() * (max - min + 1)) + min
}

const randomFromArray = (array) => {
  const index = getRandomInt(0, array.length - 1)
  return array[index]
}

/* MSW Data Model Setup */

export const db = factory({
  users: {
    id: primaryKey(nanoid),
    username: String,
    cart: manyOf('cart'),
  },
  cart: {
    id: primaryKey(nanoid),
    productID: Number,
    productTitle: String,
    user: oneOf('user'),
  }
})

const createUserData = () => {
  return {
    username: faker.internet.userName(),
  }
}

const serializeCart = (cart) => ({
  ...cart,
  user: cart.user.id,
})


/* MSW REST API Handlers */

export const handlers = [
  rest.get('/fakeApi/cart', function (req, res, ctx) {
    const posts = db.cart.getAll().map(serializeCart)
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(posts))
  }),
  rest.post('/fakeApi/cart', function (req, res, ctx) {
    const data = req.body

    if (data.content === 'error') {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(500),
        ctx.json('Server error')
      )
    }

    data.date = new Date().toISOString()

    const user = db.users.findFirst({ where: { id: { equals: data.user } } })
    data.user = user

    const cart = db.cart.create(data)
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(serializeCart(cart)))
  }),
  rest.get('/fakeApi/cart/:postId', function (req, res, ctx) {
    const cart = db.cart.findFirst({
      where: { id: { equals: req.params.cartId } },
    })
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(serializeCart(cart)))
  }),
  rest.get('/fakeApi/users', (req, res, ctx) => {
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(db.users.getAll()))
  }),
]

export const worker = setupWorker(...handlers)
// worker.printHandlers() // Optional: nice for debugging to see all available route handlers that will be intercepted

/* Mock Websocket Setup */

const socketServer = new MockSocketServer('ws://localhost')

let currentSocket

const sendMessage = (socket, obj) => {
  socket.send(JSON.stringify(obj))
}

// Allow our UI to fake the server pushing out some notifications over the websocket,
// as if other users were interacting with the system.
const sendRandomNotifications = (socket, since) => {
  const numNotifications = getRandomInt(1, 5)

  const notifications = generateRandomNotifications(since, numNotifications, db)

  sendMessage(socket, { type: 'notifications', payload: notifications })
}

export const forceGenerateNotifications = (since) => {
  sendRandomNotifications(currentSocket, since)
}

socketServer.on('connection', (socket) => {
  currentSocket = socket

  socket.on('message', (data) => {
    const message = JSON.parse(data)

    switch (message.type) {
      case 'notifications': {
        const since = message.payload
        sendRandomNotifications(socket, since)
        break
      }
      default:
        break
    }
  })
})

/* Random Notifications Generation */

const notificationTemplates = [
  'poked you',
  'says hi!',
  `is glad we're friends`,
  'sent you a gift',
]

function generateRandomNotifications(since, numNotifications, db) {
  const now = new Date()
  let pastDate

  if (since) {
    pastDate = parseISO(since)
  } else {
    pastDate = new Date(now.valueOf())
    pastDate.setMinutes(pastDate.getMinutes() - 15)
  }

  // Create N random notifications. We won't bother saving these
  // in the DB - just generate a new batch and return them.
  const notifications = [...Array(numNotifications)].map(() => {
    const user = randomFromArray(db.user.getAll())
    const template = randomFromArray(notificationTemplates)
    return {
      id: nanoid(),
      date: faker.date.between(pastDate, now).toISOString(),
      message: template,
      user: user.id,
    }
  })

  return notifications
}

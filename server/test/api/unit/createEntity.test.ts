import request from 'supertest'
import { StatusCode } from 'status-code-enum'

import * as TestSetup from '../test.setup'

describe('POST /product/', () => {
  test('returns status code 201 if it accepts a given entity with appropriate details', async () => {
    const res: any = await request(TestSetup.app)
      .post('/product/')
      .send({
        name: 'Cold Head Decongestion',
        description: 'Integer a nibh. In quis justo.',
        price: 29.61,
        quantity: 95
      })

    expect(res.statusCode).toEqual(StatusCode.SuccessCreated)
  })

  test('returns a data of a created object', async () => {
    const res: any = await request(TestSetup.app)
      .post('/product/')
      .send({
        name: 'Cold Head Decongestion',
        description: 'Integer a nibh. In quis justo.',
        price: 29.61,
        quantity: 95
      })

    expect(res.body.data._id).toBeDefined()
  })
})

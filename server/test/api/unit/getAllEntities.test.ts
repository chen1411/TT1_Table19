import request from 'supertest'
import { StatusCode } from 'status-code-enum'

import * as TestSetup from '../test.setup'
import { SampleEntities } from '../data/entities.sample'

describe('GET /product/', () => {
  test('returns status code 200 if can fetch a list of existing entities', async () => {
    const res: any = await request(TestSetup.app)
      .get('/product/')

    expect(res.statusCode).toEqual(StatusCode.SuccessOK)
  })

  test('returns the entire list of entities present in the collection', async () => {
    const res: any = await request(TestSetup.app)
      .get('/product/')

    expect(res.body.data.length).toEqual(SampleEntities.length)
  })
})

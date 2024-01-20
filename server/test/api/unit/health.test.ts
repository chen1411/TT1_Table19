import request from 'supertest'
import { StatusCode } from 'status-code-enum'

import * as TestSetup from '../test.setup'

describe('GET /product/health', () => {
  test('returns status code 200 if api is set up correctly', async () => {
    const res: any = await request(TestSetup.app)
      .get('/product/health')

    expect(res.statusCode).toEqual(StatusCode.SuccessOK)
  })
})

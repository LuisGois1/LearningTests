import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest';

import { LearningController } from '../src/learning/learning.controller';
import { AllExceptionsFilter } from '../src/learning/exceptions.filters';

interface ErrorResponse {
  message: string;
}

describe('Learning Test - Exception Filters', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LearningController],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.init();
  });

  it('should intercept errors using exception filter', async () => {
    const response: Response = await request(app.getHttpServer()).get(
      '/learning/filter-test',
    );

    const body = response.body as ErrorResponse;

    expect(response.status).toBe(500);
    expect(body.message).toBe('Error intercepted by filter');
  });
});

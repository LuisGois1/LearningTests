import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

@Controller('learning')
export class LearningController {
  @Get('error')
  trowGenericError() {
    throw new Error('Generic Error');
  }
  @Get('notfound')
  throwNotFound() {
    throw new NotFoundException('Resource Not Found');
  }
  @Get('badrequest')
  badRequest() {
    throw new BadRequestException('Invalid Request');
  }
  @Get('custom')
  customError() {
    throw new HttpException('Custom Error', HttpStatus.I_AM_A_TEAPOT);
  }
  @Get('filtertest')
  filterTest() {
    throw new Error('Internal Error');
  }
}
// Test 1 - Why Generic error Turns 500?
// What do Nest do when we use Error?
// it('should return 500 for generic Error', async () => {
//   const response = await request(app.getHttpServer())
//     .get('/learning/generic-error');
//   expect(response.status).toBe(500);
//  });
// Nest will convert automatically to 500 when we throw a generic error.
// Test 2 - Why NotFoundException turns 404?
// it('should return 404 for NotFoundException', async () => {
//   const response = await request(app.getHttpServer())
//     .get('/learning/not-found');
//   expect(response.status).toBe(404);
//   expect(response.body.message).toBe('Resource not found');
// });
// Nest Exceptions are already mapped to HTTP status
// Test 3 - Why BadRequest turns 400?
// it('should return 400 for BadRequestException', async () => {
//   const response = await request(app.getHttpServer())
//     .get('/learning/bad-request');
//   expect(response.status).toBe(400);
// });
// Bad Request will always turn to a generic 400 error.
// Test 4 - Custom HttpException
// it('should return custom status code', async () => {
//   const response = await request(app.getHttpServer())
//     .get('/learning/custom');
//   expect(response.status).toBe(418);
//   expect(response.body.message).toBe('Custom error');
// });
// It's possible to create any custom Http status with HttpException.
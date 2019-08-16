import { Module } from '@nestjs/common'
import { AuthController } from './controllers/AuthController'
import { AuthModule } from '../../auth/AuthModule'

@Module({
  imports: [AuthModule],
  controllers: [AuthController]
})
export class AuthControllerModule {}

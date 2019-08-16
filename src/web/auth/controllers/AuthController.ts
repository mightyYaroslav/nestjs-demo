import { Controller, Post, UseGuards, Request, Get, Inject, Body } from '@nestjs/common'
import { AuthService, AuthServiceType } from '../../../auth/services/AuthService'
import { AuthGuard } from '@nestjs/passport'
import { ApiResponse } from '@nestjs/swagger'
import { UserResponse } from '../../../application/user/data/output/UserResponse'
import { CreateUserInput } from '../../../application/user/data/input/CreateUserInput'

@Controller()
export class AuthController {

  constructor(
    @Inject(AuthServiceType)
    private readonly authService: AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({ status: 200, description: 'Creates new user object' })
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user)
  }

  @Post('register')
  @ApiResponse({ status: 200, type: UserResponse, description: 'Registeres new user' })
  async register(
    @Body() input: CreateUserInput
  ): Promise<UserResponse> {
    return await this.authService.register(input)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user
  }

}

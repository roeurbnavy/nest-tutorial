import { UsersModule } from '@/core/users/users.module';
import { AuthModule } from '@/core/auth/auth.module';

export const CoreModule = [UsersModule, AuthModule];

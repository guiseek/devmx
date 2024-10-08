import { SignIn, AccessToken, UseCase } from '@devmx/shared-api-interfaces';
import { StorageService } from '../../../services/storage';
import { AuthService } from '../../../services/auth';
import { tap } from 'rxjs';

export class SignInClientUseCase implements UseCase<SignIn, AccessToken> {
  constructor(
    private readonly authService: AuthService,
    private readonly storageService: StorageService
  ) {}

  execute(data: SignIn) {
    return this.authService.signIn(data).pipe(
      tap(({ accessToken }) => {
        this.storageService.setItem('accessToken', accessToken);
      })
    );
  }
}

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ dùng bản sync
import { provideToastr } from 'ngx-toastr'; // ✅ thêm dòng này

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(), // ✅ sửa lại từ provideAnimationsAsync()
    provideToastr({       // ✅ cấu hình toast
      // closeButton: true,
      positionClass: 'toast-bottom-right',
    }),
  ]
};

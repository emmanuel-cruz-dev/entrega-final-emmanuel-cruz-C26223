import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { AppTitleStrategy } from './core/strategies';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    {
      provide: TitleStrategy,
      useClass: AppTitleStrategy,
    },

    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};

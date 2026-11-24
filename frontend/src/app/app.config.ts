import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, TitleStrategy } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { AppTitleStrategy } from './core/strategies';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),

    {
      provide: TitleStrategy,
      useClass: AppTitleStrategy,
    },

    provideHttpClient(withFetch()),

    providePrimeNG({
      theme: {
        preset: Aura,
      },
      license: 'PRIMEUI-LICENSE-KEY',
    }),

    ConfirmationService,
    MessageService,
  ],
};

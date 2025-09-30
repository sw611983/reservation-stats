import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';   // ✅ use this instead

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideHttpClient()    // ✅ correct modern API
  ]
};

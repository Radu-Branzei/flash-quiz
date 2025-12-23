import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Calculator, Volleyball, TestTubeDiagonal, Earth, BrainCircuit, Globe, SlidersHorizontal, ClockArrowUp } from 'lucide-angular';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(LucideAngularModule.pick({ Calculator, Volleyball, TestTubeDiagonal, Earth, BrainCircuit, Globe, SlidersHorizontal, ClockArrowUp })),
  ],
}).catch((err) => console.error(err));

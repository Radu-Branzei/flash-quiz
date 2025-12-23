import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { LucideAngularModule } from 'lucide-angular';
import { Calculator, Volleyball, TestTubeDiagonal, Earth, BrainCircuit, CircleQuestionMark, ClockArrowUp, SlidersHorizontal, Globe } from 'lucide-angular';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    importProvidersFrom(LucideAngularModule.pick({ Calculator, Volleyball, TestTubeDiagonal, Earth, BrainCircuit, CircleQuestionMark, ClockArrowUp, SlidersHorizontal, Globe }))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

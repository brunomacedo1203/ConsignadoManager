import { provideClientHydration } from '@angular/platform-browser';

const app = await NestFactory.create(AppServerModule, {
    // ...
    providers: [
        provideClientHydration(),
        // ... outros provedores ...
    ],
}); 
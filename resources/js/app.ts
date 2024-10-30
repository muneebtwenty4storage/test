import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, DefineComponent, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import PrimeVue from 'primevue/config';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const myPreset = definePreset(Aura, {
    semantic: {
        primary: { 
            "50": "#f2f2f2", 
            "100": "#c2c2c2", 
            "200": "#919191", 
            "300": "#616161", 
            "400": "#303030", 
            "500": "#000000", 
            "600": "#000000", 
            "700": "#000000", 
            "800": "#000000", 
            "900": "#000000", 
            "950": "#000000"
         },
        colorScheme: {
            light: {
                surface: { 
                    "50": "#fdf9f4", 
                    "100": "#f8e0c9", 
                    "200": "#f2c79f", 
                    "300": "#ecae74", 
                    "400": "#e6964a", 
                    "500": "#e07d1f", 
                    "600": "#be6a1a", 
                    "700": "#9d5816", 
                    "800": "#7b4511", 
                    "900": "#5a320c", 
                    "950": "#381f08" 
                }
            },
            dark: {
                surface: { 
                    "50": "#fdf9f4", 
                    "100": "#f8e0c9", 
                    "200": "#f2c79f", 
                    "300": "#ecae74", 
                    "400": "#e6964a", 
                    "500": "#e07d1f", 
                    "600": "#be6a1a", 
                    "700": "#9d5816", 
                    "800": "#7b4511", 
                    "900": "#5a320c", 
                    "950": "#381f08" 
                }
            }
        }
    }
});
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(PrimeVue, {
                theme: {
                    preset: myPreset,
                    options: {
                        prefix: 'p',
                        darkModeSelector: '.theme',
                        cssLayer: {
                            'name' : 'primevue',
                            'order': 'tailwind-base, primevue , tailwind-utilities'
                        }
                    }
                }
            })
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

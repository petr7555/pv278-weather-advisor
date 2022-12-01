de-mo 🌤️ Weather Advisor 🌨

[![Test](https://github.com/petr7555/pv278-weather-advisor/actions/workflows/test.yml/badge.svg)](https://github.com/petr7555/pv278-weather-advisor/actions/workflows/test.yml)
[![Deploy on push to master](https://github.com/petr7555/pv278-weather-advisor/actions/workflows/deploy_master.yml/badge.svg)](https://github.com/petr7555/pv278-weather-advisor/actions/workflows/deploy_master.yml)

See the app deployed [here](https://pv278-weather-advisor.surge.sh/).
The application is a PWA, so you can install it on your phone.

## Development

- Icons have been generated using [this amazing favicon generator](https://realfavicongenerator.net/).
- Meta tags have been verified using [this great online tool](https://metatags.io/).
- To preview PWA in development, run `npm run preview-deploy-local`.

## Deployment

- The app is deployed to [Surge](https://pv278-weather-advisor.surge.sh/) on push to master.
- The app is deployed to subdomain `https://*.pv278-weather-advisor.surge.sh/` on PR.
  To achieve this, [surge-preview](https://github.com/afc163/surge-preview) action has
  been [cloned](https://github.com/petr7555/surge-preview) and source code modified.
  Having the preview deployment on a subdomain is needed so that Auth0 allowed URLs can be configured.
  The downside is that Surge does not provide SSL certificate for subdomains and without `https`,
  the PWA does not work. But this is acceptable for PR preview.

## Used color palettes
- https://cz.pinterest.com/pin/314900198926790245/
- https://www.color-hex.com/color-palette/54458

## Credits
- Landing page photo by [@jakubkriz](https://unsplash.com/@jakubkriz) on [Unsplash](https://unsplash.com/photos/06lv_LBX3pk);

## Data
- source: https://www.chmi.cz/historicka-data/pocasi/mesicni-data/mesicni-data-dle-z.-123-1998-Sb
- terms of use: https://www.chmi.cz/files/portal/docs/meteo/ok/open_data/Podminky_uziti_udaju.pdf

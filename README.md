🌤️ Weather Advisor 🌨

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
  The downside is that Surge does not privde SSL certificate for subdomains and without `https`,
  the PWA does not work. Which is fine for PR preview.

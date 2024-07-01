# Assumptions

## Assumption \#1 - Updating outdated dependencies

A significant number of the project's dependencies are outdated, exposing it to 103 known vulnerabilities (1 low, 51 moderate, 46 high, 5 critical) as per the `npm audit` report that can be found [here](./audit.log). These vulnerabilities range in severity from low to critical, making it crucial to update these dependencies to their latest versions. Doing so will patch these security flaws, reducing the risk of exploitation and protecting the application from potential attacks.

Additionally, updating these dependencies can bring performance enhancements, bug fixes, and new features that could benefit the project. Upgrading dependencies ensures compatibility with newer technologies and best practices, contributing to a more stable and efficient codebase.

However, since it was not specified on whether or not we were allowed to do so, I maintained the versions provided by the original repository, specially since all of these would change the package's major versions as per the semantic versioning specification.

| Package                    | Current | Latest |
| ---------------------------|---------|------- |
| @vue/cli-plugin-babel      |  3.12.1 |  5.0.8 |
| @vue/cli-plugin-eslint     |  3.12.1 |  5.0.8 |
| @vue/cli-service           |  3.12.1 |  5.0.8 |
| axios                      |  0.18.1 |  1.7.2 |
| bulma                      |   0.7.5 |  1.0.1 |
| bulma-extensions           |   3.0.0 |  6.2.7 |
| compression-webpack-plugin |   2.0.0 | 11.1.0 |
| luxon                      |  1.28.1 |  3.4.4 |
| node-sass                  |  4.14.1 |  9.0.0 |
| placeholder-loading        |   0.1.5 |  0.6.0 |
| sass-loader                |   7.3.1 | 14.2.1 |
| stylus                     |  0.54.8 | 0.63.0 |
| stylus-loader              |   3.0.2 |  8.1.0 |
| vee-validate               |  2.2.15 | 4.13.1 |
| vue                        |  2.7.16 | 3.4.30 |
| vue-router                 |   3.6.5 |  4.4.0 |
| vuex                       |   3.6.2 |  4.1.0 |

## Assumption \#2 - The Finnhub API

Finnhub provides [official SDKs](https://finnhub.io/docs/api/library) available via [NPM](https://www.npmjs.com/package/finnhub), which should be more stable and easier to use than creating our own API consumer via Axios. However, requirements tab of the README file states that we should "Use the existing list of symbols being returned on the Symbols page", and therefore the existing API consumption method was utilized.

## Assumption \#3 - Individual Ticker View

The README instructions state that "Find and use the API end point for selecting a single ticker so you can load all possible information for it", however no one endpoint from the free tier of the [Finnhub API documentation](https://finnhub.io/docs/api/stock-symbols) provided sufficient relevant data. That being said, I selected three of them to compose said view. I would like have to included more, including graphs, but that data was premium-only, and would have taken much longer to implement in an aesthetically pleasing way.

## Conclusion

I was surprised to see a front-end only assessment for a full-stack opportunity, but I tried my best. I strived to stick as close to the script provided by the README as possible, as I tried to contact you but was instructed not to. That culminated in using the outdated libraries and opting to not use robust frameworks like Vuetify, which ended up being time-consuming, and I went a bit over the 8 hour limit. However, things like implementing native pagination, filtering and ordering on javascript was pretty fun. I'm not the best at coming up with beautiful designs on my own, as I mostly either implemented designs done by an UX team, or functional beautiful designs in the past,so coming up with them myself was a good learning opportunity. I'm open to any queries and meetings you might want to have. Anyway, thank you so much for your time and hope to work with you in the future! Best regards, Gabriel.

<div align="center">

# Sipher Loadtest Template

</div>

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation)
- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install) (optional)

**Install dependencies**

Clone the generated repository on your local machine, move to the project root folder and install the dependencies defined in [`package.json`](./package.json)

```bash
$ yarn install
```

## Running the test

To run a test written in TypeScript, we first have to transpile the TypeScript code into JavaScript and bundle the project

```bash
$ yarn webpack
```

This command creates the final test files to the `./dist` folder.

Once that is done, we can run our script the same way we usually do, for instance:

```bash
$ k6 run --out statsd dist/mission-test.js
```

Expose metrics to NewRelic
+ Start statsd
```
docker run \
  -d --restart unless-stopped \
  --name newrelic-statsd \
  -h $(hostname) \
  -e NR_ACCOUNT_ID=<newrelic-account-id> \
  -e NR_API_KEY="<newrelic-api-key>" \
  -p 8125:8125/udp \
  newrelic/nri-statsd:latest
```

+ Run with expose option
```bash
$ K6_STATSD_ENABLE_TAGS=true k6 run --out statsd dist/mission-test.js
```

## Writing own tests

House rules for writing tests:
- The test code is located in `src\test\` folder
- You can change the entry [here](./webpack.config.js#L8). 
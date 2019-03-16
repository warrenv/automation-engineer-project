# Automation Engineer Project

This repository is part of the interview process for Formstack Automation Engineer. It's intended to be a coding challenge that takes under 3 hours, but gives an overview of some of the challenges we have in our products.

## Outline

There are two servers in this project:

- `datafetcher.js`: a webserver that requests data from third-party apis
- `datasaver.js`: a process that exercises the `datafetcher` API every 30 seconds to fetch data, and then saves that data to disk

The `datafetcher` API fetches a list of users - name, address, etc. The purpose of the system is for the `datasaver`server to continually check the list of users and keep a local copy of the user list up to date. The `datasaver` server will update a JSON file in the project directory when anything changes.

## Installation

(assumes node.js >8.0 is installed)

`npm ci`

## Startup

Open two separate terminals and run:
```bash
  $ node -r esm index.js datafetcher
  $ node -r esm index.js datasaver
```

or you can run both at the same time with:
```bash
  $ node -r esm index.js
```

You should see both processes start up and print debug logs.

## Assignment

Please use whatever tools/frameworks/methods you prefer to test the system and answer the following questions:

1. Can the datafetcher get data from the third-party api successfully
1. Can the datasaver save data successfully
1. Are we running on schedule (every 30 seconds)?
1. Is the whole system working? (we're looking for a description or example of how integration testing might work)
1. What would you monitor to make sure it was still working, and how might you set that up? (no need to actually do it)

Feel free to edit the server code or change anything necessary to make testing eaiser/better. Comments explaining the thought process behind any changes would be much appreciated.

## Assignment Answers

1. Can the datafetcher get data from the third-party api successfully
   - See integration tests.

1. Can the datasaver save data successfully
   - See integration tests.

1. Are we running on schedule (every 30 seconds)?
   - A monitoring service can use timestamped log entries to verify this.
   - This is pretty complicated to test due to timing issues around waiting for
     at least 2 cycles to complete before running assertions. Given more time,
     I might attempt this.
   - Ideally, refactor to use an external scheduler like cron or kubernetes CronJob.
     - This would simplify the service by removing a responsibility.
       - Inceases maintainability by reducing the time needed to read and understand the code.
       - Less surface area for bugs.
       - Easier to test.

1. Is the whole system working? (we're looking for a description or example of how integration testing might work)
   - A functional test exists for use during development and CI/CD.
   - During production, monitoring of log output can answer this.

1. What would you monitor to make sure it was still working, and how might you set that up? (no need to actually do it)
   - datasaver
     - Log a message every time we run.
     - Log a message if we fail to save the file.

   - datafetcher
     - Log success or failure (via an express middleware) for every request.
 
   - Set up an ELK stack to process the logs, provide a dashboard and alert if necessary.

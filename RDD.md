- General TODOS
  - Refactor to constants.
    - [x] Helps with maintainability by having a single source of truth.

  - Use an index.js to unify.
    - datafetcher
      - [x] Refactor http call into a module.
        - Easier to reuse and helps testing by separating
          server creation from instantiation.

    - datasaver
      - Add an interface with 'start' and 'stop'.
      - Mainly helps for control during testing.

- Can the datafetcher get data from the third-party api successfully
  - TODO: [x] write integration tests.
    - log success.
      - report number of entries fetched?
      - report timing?
    - log errors.

- Can the datasaver save data successfully
  - [x] TODO: write unit tests if applicable.
  - [x] TODO: write an integration test.
    - log success.
      - log number of new entries.
    - log errors.

- Are we running on schedule (every 30 seconds)?
  - TODO: Add timestamps to the program output so an external monitor can track it.
  - Ideally, refactor to use an external scheduler like cron or kubernetes CronJob.
    - This would simplify the service by removing a responsibility.
      - Inceases maintainability by reducing the time needed to read and understand the code.
      - Less surface area for bugs.

- Is the whole system working? (we're looking for a description or example of how integration testing might work)
  - TODO: write a functional test for this.

- What would you monitor to make sure it was still working, and how might you set that up? (no need to actually do it)
  - datasaver
    - Log a message with a timestamp every time we run.
    - Log a message if failing to save the file.
  - datafetcher
    - Log success or failure (via an express middleware) for every request.
  - Set up an ELK stack or similar log monitoring/dashbord setup to process the logs.

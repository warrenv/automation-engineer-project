- General TODOS
  - Refactor to constants.
    - Helps with maintainability by having a single source of truth.

  - Use an index.js to unify.
    - datawatcher
      - Refactor watcher into a module.
        - Easier to reuse and helps testing by separating
          server creation from instantiation.

    - datasaver
      - Add an interface with 'start' and 'stop'.
      - Mainly helps for control during testing.

- Can the datafetcher get data from the third-party api successfully
  - TODO: write integration tests.
    - log success.
      - report number of entries fetched.
      - report timing? via middleware?
    - log errors.

- Can the datasaver save data successfully
  - TODO: write unit tests if applicable.
  - TODO: write an integration test.
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
  - set up an ELK stack and create:
    - A heartbeat monitor to ensure we are executing on schedule.
    - Log monitoring for failing to fetch the data.
    - Log monitoring for failing to writing the file.

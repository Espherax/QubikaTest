# QubikaTest
## Technical test for qa in Qubika, using playwright with typescript.

This test should validate user creation via API and UI display and UI interactions, specifically, login and creation of categories and subcategories.

To run this test you should download the test to the tests directory in your playwright folder, after that run this command
npx playwright test ./tests/Qubika.tech.test.ts and run the test from the playwright UI
You can also run it from your IDE, in my case, VS Code, using the playwright extention. and from the "Testing" tab, the test should appear reaady to run.

If playwright is not installed you can follow these instructions https://playwright.dev/docs/intro

## Solutions

API User creation:
For this scenario, i've used the Swagger url you've provided, using the https://api.club-administration.qa.qubika.com/api/auth/register endpoint to check and provide the data needed to create an user
(email, password and roles)

Login UI validation
For this scenario i've checked the correct display of title, text boxes for mail/user and password, functionality of the checkbox and correct display of texts and buttons.

User login and interactions
For this scenario, the data from the API user creation was used to verify the log in, then the interaction with the category-type page, the creation of a new category, and the creation of a new subcategory and
the correct display of both items recently created.

## Possible enhancements

- Error Handling: Add error handling for cases like invalid user data or server issues.
- Data Cleanup: Add API calls to delete test users/categories after tests have been run, preventing database clutter.
- More UI tests: Add new tests to verify the deletion of categories/subcategories.

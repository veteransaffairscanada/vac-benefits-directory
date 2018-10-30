# AirTable

## What is it?

[AirTable](https://airtable.com/) is an online spreadsheet product similar to Google Sheets but with a better API, better access controls, and a revision history. It allows spreadsheets to be created and data added or changed through the AirTable web application or through its REST API. This can be controlled by setting up user accounts and giving them read and/or write permission. You can also generate API keys that have read and/or write permission. Custom API documentation (with example calls!) is generated using the table/column names for your project, and can be viewed on airtable.com.

## Why and how are we using it?

We're using AirTable because it allows non-developers (and developers!) to easily edit the data used by our app. This is very useful for:

- Translations: Content designers and translators can edit the UI text used in the app by going to the translations table, doing a ctrl+f search for the English or French UI text they want to change, and then modifying it.
- Eligibility logic: The logic used by our app to determine who is eligible for what benefits is set in the eligibilityPaths table. Each row has a unique combination of answers to the questions. Each row also has a list of benefits that are likely available to a user who answers in this way. The list of benefits are linked to rows in the benefits table.
- Benefits: This table contains a row for each benefit, and a column (eligibilityPaths) with a list of links to rows in the eligibilityPaths table. Updating this list will update the ids in the benefits column in the eligibilityPaths table.
- Feedback: Content submitted from the feedback bar in the app footer is written to the feedback table on AirTable. To do this, the server has a write key set in ENV variables.

AirTable data is read by the server and injected into Redux, which is then sent to the client.

## How does one get access?

To request access to edit content in AirTable, set up an account on their website and then email vac@cds-snc.ca with your account details so we can add you to the project.

## Step by step guides

### Changing UI text

### Changing text on a benefit card

### Changing the eligibility criteria for a benefit

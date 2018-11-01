# AirTable

## What is it?

[AirTable](https://airtable.com/) is an online spreadsheet product similar to Google Sheets but with a better API, access controls, and revision history. It allows spreadsheets to be created and data added or changed through the AirTable web application or through its REST API. This can be controlled by setting up user accounts and giving them read and/or write permission. You can also generate API keys that have read and/or write permission. Custom API documentation (with example calls!) is generated using the table/column names for your project, and can be viewed on airtable.com.

## Why and how are we using it?

We're using AirTable because it allows non-developers (and developers!) to easily edit the data used by our app. This is very useful for:

- Translations: Content designers and translators can edit the UI text used in the app by going to the translations table, doing a ctrl+f search for the English or French UI text they want to change, and then modifying it.
- Eligibility logic: The logic used by our app to determine who is eligible for what benefits is set in the eligibilityPaths table. Each row has a unique combination of answers to the questions. Each row also has a list of benefits that are likely available to a user who answers in this way. The list of benefits are linked to rows in the benefits table.
- Benefits: This table contains a row for each benefit, and a column (eligibilityPaths) with a list of links to rows in the eligibilityPaths table. Updating this list will update the ids in the benefits column in the eligibilityPaths table.
- Feedback: Content submitted from the feedback bar in the app footer is written to the feedback table on AirTable. To do this, the server has a write key set in ENV variables.

AirTable data is read by the server and injected into Redux, which is then sent to the client.

## How does one get access?

To request access to edit content in AirTable, set up an account on their website and then email vac@cds-snc.ca with your account details so we can add you to the project.

## Making changes to AirTable

To do anything in AirTable, always take the following steps:

1. Visit the [Master AirTable base](https://airtable.com/tblHt9ZuCBwsplYw2). If you don't have permission to access it, [request permission](#how-does-one-get-access)
2. Make some changes. See the step-by-step guides below to help you with the task you want to perform.
3. View your changes in the live app by visiting the [data validation page](https://vac-benefits-finder.cds-snc.ca/data-validation) and clicking the "refresh cache" button at the top right.
4. Make sure no new tests have failed by looking through the rows on the data-validation page. If they have, investigate and fix the problem in Airtable.
5. Navigate back to the page in the app where you expect your changes to have occurred. Refresh the page to see them.

## Step by step guides

### Changing UI text

1. Locate the text you want to change in the [app](https://vac-benefits-finder.cds-snc.ca)
2. Copy the text to the clipboard
3. Navigate to the [translations sheet](https://airtable.com/tblJAMGWk4ZypG5uX/viwsHMCBUnwx1EC3f) in airtable
4. Do a ctrl+f (Windows) or command+f (Mac) search on the page, and paste in the text you copied
5. Locate the row that contains the text you want to change
6. Enter in your new text in the English and French columns

### Changing text/links on a benefit card

1. Navigate to the [benefits sheet](https://airtable.com/tblcf182f99RjsSDQ/viwMWVJVqS0VphdeQ) in AirTable
2. Locate the row that corresponds to the benefit you want to change
3. To change the title, edit vacNameEn and vacNameFr. To change the one line description, edit oneLineDescriptionEn and oneLineDescriptionFr. To change the links to the VAC site, edit benefitPageEn and benefitPageFr.

### Changing the eligibility criteria for a benefit

1. Navigate to the [benefits sheet](https://airtable.com/tblcf182f99RjsSDQ/viwMWVJVqS0VphdeQ) in AirTable
2. Locate the row that corresponds to the benefit you want to change
3. Scroll right to the eligibilityPaths column
4. Each path is represented by a comma separated list of answers to the questions. Decide which one you want to change.
5. Write down the new, correct path to the benefit on paper. This should be a comma separated list of required options. If a question does not have any required options, leave them out.
6. Navigate to the [eligibilityPaths](https://airtable.com/tblHt9ZuCBwsplYw2/viwWR17CgrYqiNa0B) sheet.
7. Determine if the new path you wrote down already exists. If it exists, add the benefit to the benefits column for that row. If it doesn't exist, create a new row and add the benefit.
8. Delete the benefit from the row for the incorrect eligibility path

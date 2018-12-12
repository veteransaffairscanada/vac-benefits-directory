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

### Changing text and links in the app

1. Locate the text or hyperlink you want to change in the [app](https://vac-benefits-finder.cds-snc.ca)
2. Copy the text to the clipboard
3. Look at the table below to determine which Airtable sheet and column you should make your change in. Click the link to the sheet.
4. In Airtable do a ctrl+f (Windows) or command+f (Mac) search on the page, and paste in the text you copied
5. Locate the row that contains the text you want to change
6. Enter in your new text in the English and French columns

| Text you want to change                                      | Airtable Sheet                                                                    | English Column Name                  | French Column Name                  |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------ | ----------------------------------- |
| Benefit name                                                 | [benefits](https://airtable.com/tblcf182f99RjsSDQ/viwMWVJVqS0VphdeQ)              | vacNameEn                            | vacNameFr                           |
| one line description                                         | [benefits](https://airtable.com/tblcf182f99RjsSDQ/viwMWVJVqS0VphdeQ)              | oneLineDescriptionEn                 | oneLineDescriptionFr                |
| VAC Learn more link                                          | [benefits](https://airtable.com/tblcf182f99RjsSDQ/viwMWVJVqS0VphdeQ)              | benefitPageEn                        | benefitPageFr                       |
| important info in card header                                | [benefits](https://airtable.com/tblcf182f99RjsSDQ/viwMWVJVqS0VphdeQ)              | noteEn                               | noteFr                              |
| question text in benefits-directory                          | [questions](https://airtable.com/tblCynpHaryoypjMY/viw1y4qaD2wp5aA2s)             | display_text_english                 | display_text_french                 |
| question text in guided experience                           | [questions](https://airtable.com/tblCynpHaryoypjMY/viw1y4qaD2wp5aA2s)             | guided_experience_english            | guided_experience_french            |
| guided experience page title                                 | [questions](https://airtable.com/tblCynpHaryoypjMY/viw1y4qaD2wp5aA2s)             | guided_experience_page_title_english | guided_experience_page_title_french |
| health issue tooltip text                                    | [questions](https://airtable.com/tblCynpHaryoypjMY/viw1y4qaD2wp5aA2s)             | tooltip_english                      | tooltip_french                      |
| multiple choice option text                                  | [multipleChoiceOptions](https://airtable.com/tblrQKPk7xBGvy3eP/viwVIedUGDgf708Jx) | display_text_english                 | display_text_french                 |
| guided experience breadcrumb/link text                       | [multipleChoiceOptions](https://airtable.com/tblrQKPk7xBGvy3eP/viwVIedUGDgf708Jx) | ge_breadcrumb_english                | ge_breadcrumb_french                |
| area office names                                            | [areaOffices](https://airtable.com/tblIlX7N7j7rLFlYw/viwSMqbzoKWN7gSFe)           | name_en                              | name_fr                             |
| area office addresses                                        | [areaOffices](https://airtable.com/tblIlX7N7j7rLFlYw/viwSMqbzoKWN7gSFe)           | address_en                           | address_fr                          |
| area office telephone numbers                                | [areaOffices](https://airtable.com/tblIlX7N7j7rLFlYw/viwSMqbzoKWN7gSFe)           | telephone_en                         | telephone_fr                        |
| hours (all on map page)                                      | [areaOffices](https://airtable.com/tblIlX7N7j7rLFlYw/viwSMqbzoKWN7gSFe)           | office_hours_en                      | office_hours_fr                     |
| Checkbox options in guided experience and benefits-directory | [needs](https://airtable.com/tblY7TpDsGR5I3SaN/viwQOzMWARRdWFks3)                 | nameEn                               | nameFr                              |
| All other text                                               | [translations](https://airtable.com/tblJAMGWk4ZypG5uX/viwsHMCBUnwx1EC3f)          | English                              | French                              |

### Changing the eligibility criteria for a benefit

1. Navigate to the [benefits sheet](https://airtable.com/tblcf182f99RjsSDQ/viwMWVJVqS0VphdeQ) in AirTable
2. Locate the row that corresponds to the benefit you want to change
3. Scroll right to the eligibilityPaths column
4. Each path is represented by a comma separated list of answers to the questions. Decide which one you want to change.
5. Write down the new, correct path to the benefit on paper. This should be a comma separated list of required options. If a question does not have any required options, leave them out.
6. Navigate to the [eligibilityPaths](https://airtable.com/tblHt9ZuCBwsplYw2/viwWR17CgrYqiNa0B) sheet.
7. Determine if the new path you wrote down already exists. If it exists, add the benefit to the benefits column for that row. If it doesn't exist, create a new row and add the benefit. Note: only include `stillServing`, `releasedAlive`, or `deceased` in a path if the path includes `family` and not `veteran`, `serving member`, or `organization`. This may mean that you need to create 2 paths for a benefit: one path for family members and another path for veterans.
8. Delete the benefit from the row for the incorrect eligibility path

### Adding a category (aka need or checkbox question), associating it with a benefit

1. Navigate to the [needs sheet](https://airtable.com/tblY7TpDsGR5I3SaN/viwQOzMWARRdWFks3) in AirTable
2. Add a new row at the bottom and give the category an english name and french name
3. Select the cell under the benefits column and click +
4. Start typing the names of the benefits you want the category to be associated with

To change the benefits associated with an existing category, click the "expand" icon on the right of the cell and then you will have the option to either unlink existing records or link new ones.

### How to add multiple choice question and answers

1. Navigate to the [questions sheet](https://airtable.com/tblCynpHaryoypjMY/viw1y4qaD2wp5aA2s)
2. Add a new row at the bottom, and give it a variable_name that describes the question (The multiple choice questions are ordered according to their order in the questions table, the needs checkbox question is always at the bottom).
3. Fill in the following french and english content: question text that will appear in benefits-directory, question text in guided experience, and guided experience page title. The french/english column names can be found in the table above.
4. Then navigate to the [multiple choice options sheet](https://airtable.com/tblrQKPk7xBGvy3eP/viwVIedUGDgf708Jx)
5. Add a new row for each multiple choice option you would like to appear under the new question.
6. Give each option a variable_name that describes it, as well as the english/french text the user will see, and the blue breadcrumb text within the guided experience (see table above for column names).
7. Select each "linked_question" cell, click +, and type/select the question variable_name you added in step 2.
8. To see your question displayed in the app, follow the steps for adding a new eligibility path that links to your new question. A question is only displayed if its answer effects the list of eligible benefits.

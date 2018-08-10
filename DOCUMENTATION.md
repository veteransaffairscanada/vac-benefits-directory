## Documentation

### Table of Contents

1.  Next.JS and Server Side Rendering
2.  AirTable
3.  Test Driven Development
4.  Deployment
5.  Translations
6.  Fixings
7.  Contributing

### Next.JS and Server Side Rendering

The user facing application is built using the [Next.JS](https://github.com/zeit/next.js/ "Next.JS") framework for server-rendered React applications. The rational behind choosing Next.JS stems from the following criteria:

- Use of both Javascript on the front-end and back-end
- Ability to render pages completely in HTML and CSS on the server
- Robust developer support and extensive third party ecosystem

To provide the most elegant and modern user experience, [ReactJS](https://reactjs.org/ "ReactJS") was chosen as the primary front-end framework. Traditionally, ReactJS based applications are built as two distinct services, one server side, and one client side, with individual code bases and often in different programming languages. When a user makes a request against an application with such an architecture, they usually load a bundled Javascript file, pre-populated with data, that then expands and renders all the required HTML and CSS inside the user's browser.

Next.JS differs in this approach in that it can pre-render or "server render" the HTML and CSS before the Javascript bundle gets sent to the browser and therefore provide a more robust user experience by sending the HTML and CSS alongside the Javascript. The bundled Javascript file then gets expanded on top of the already existing HTML and CSS, allowing for the rich interactivity provided through ReactJS.

The advantages here are significant: for one the loading experience is faster as the HTML and CSS coming from the server display right away vs. awaiting the Javascript file to unbundle and render the HTML and CSS. Additionally in case the browser is unable to execute the javascript bundle because of an incompatibility (ex. using legacy browsers such as IE 10), we were able to create fallback solutions using the already rendered HTML and CSS. Most important, however, is that using Next.JS allows developer to use the same code base they use on the front-end of their application to also run on the back-end, significantly reducing the amount of complexity.

Lastly, our initial evaluation of NextJS showed that it worked well with a number of other Javascript components such as user interface libraries, search, and translation.

### AirTable

#### What is AirTable?

[AirTable](https://airtable.com/) is an online spreadsheet product similar to Google Sheets but with a better API, better access controls, and a revision history. It allows spreadsheets to be created and data added or changed through the AirTable web application or through its REST API. This can be controlled by setting up user accounts and giving them read and/or write permission. You can also generate API keys that have read and/or write permission. Custom API documentation (with example calls!) is generated using the table/column names for your project, and can be viewed on airtable.com.

#### Why and how are we using it?

We're using AirTable because it allows non-developers (and developers!) to easily edit the data used by our app. This is very useful for:

1. Translations: Content designers and translators can edit the UI text used in the app by going to the translations table, doing a ctrl+f search for the English or French UI text they want to change, and then modifying it.
2. Eligibility logic: The logic used by our app to determine who is eligible for what benefits is set in the eligibilityPaths table. The columns: patronType, serviceType, statusAndVitals, and serviceHealthIssue each correspond to a question asked of the user in the app. Each row has a unique combination of answers to these questions. Each row also has a list of benefits that are likely available to a user who answers in this way. The list of benefits are linked to rows in the benefits table.
3. Benefits: This table contains a row for each benefit, and a column (eligibilityPaths) with a list of ids linked to rows in the eligibilityPaths table. Updating this list will update the ids in the benefits column in the eligibilityPaths table.
4. Feedback: Content submitted from the feedback bar in the app footer is written to the feedback table on AirTable. To do this, the server has a write key set in ENV variables.

AirTable data is read by the server and injected into Redux, which is then sent to the client.

#### How does one get access?

To request access to edit content in AirTable, set up an account on their website and then email vac@cds-snc.ca with your account details so we can add you to the project.

### Test Driven Development

Developers on this project follow a process that is loosely based on [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development "Test Driven Developement") and other practices associated with "small a" [Agile](https://en.wikipedia.org/wiki/Agile_software_development "Agile") development. Without following strict guidelines, developers agreed that an iterative and continous approach is preferable to segmented release cycles.

To facilitate this process, we have chosen to use a [Continous Integration](https://en.wikipedia.org/wiki/Continuous_integration "Continous Integration") and [Continous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery "Continous Delivery") process whereby new features and code are added to the product frequenty, reviewed and verified, and shipped as soon as they are done. We are currently using [https://circleci.com/](https://circleci.com/ "Circle CI") as our platform for running all our unit tests before deploying. Alongside that we are also using [https://heroku.com](https://heroku.com "Heroku") to create staging versions of our application for manual review.

This resulted in the following, recommended, process:

1. Development sprints are given two week spans of time
2. At the beginning of a sprint, the development team meets with the other members of the larger team to discuss development priorities for new features.
3. The development team reviews open issues from the last sprint and prioritizes them with the next development targets.
4. Features are broken down into issues on GitHub and developers agree on how much time each issue potentially can take
5. Developers self-assign issues from the list of open issues in GitHub.
6. To resolve an issue a developer:
   - Checks out a new branch from `master`
   - Builds the feature or resolves the bug described in the issue
   - Continously commits code to their branch at sensible intervals
   - Writes unit and integration tests for the code they have added
   - Changes/removes unit and integration tests for code they have modified
   - Runs the test suite that ensure all tests pass
   - Uses a code coverage tool to ensure all significant logic has been tested
   - Commits the final code, pushes the code to GitHub, and opens a pull request in GitHub
   - Awaits CircleCI to verify that all our tests will pass
   - Spot check features using Heroku review apps
   - Requests other members of the team to review the pull request - only one review is required, but all team members are invited to review the pull request
   - If other team members have comments, they will note these in GitHub for the developer to either fix them or discuss
   - Other team members approve the pull request once all open discussion has been resolved
   - Pull requests are then merged into `master`
   - CircleCI verifies once again that all tests pass on the updated `master` and deploys the code into production
7. This process is repeated iteratively until all issues for a sprint are resolved and new set of issues can be created or until a new sprint starts.
8. At the end of a sprint the development team reviews the issues completed and suggest improvements on for the next sprint.

The advantages of this process is that features get broken down and reviewed by the entire development team before work. This gives line of sight to the whole team on what is being worked on. Additionally anything being worked on is easily manageable by the person writing the code, as well as understandable by the person reviewing it. Using testing as the foundational practice allows for a high degree of confidence in the functionality of the code base. It also for allows instant feedback if a developer breaks existing functionality. Based on this high degree of confidence it allows a model of continuous delivery which ensures that stake holders and customers receive the features once they are ready vs. when they can be scheduled for release.

### Translations

Given the Government of Canada's mandate to support both official languages, we use `react-18next` [https://react.i18next.com](https://react.i18next.com/ "react-18next") to allow us on-the-fly translations of all the text visibile on a given page.

The default mode for `react-18next` is to pull translated `key`-`value` strings out of static JSON files that correspond with the locale set for the browser, or a `lng` GET param set in the URL. This requires any modification or addition of translation strings to go through a `commit` cycle in Git, limiting accessibility to business owners and other non-technical users. Instead we are storing all translatable strings in `AirTable` where they can be easily modified using a user interface similar to Excel.

Upon boot, and every hour after, the server will download and cache all the translation strings in memory (A refresh of the cache can also be requested upon demand). The strings are then stored in `redux` and made available to all `react` compoments. A `translation` function then takes the `key` of a string and looks up the matching value in the corresponding locale.

When a new string is added to `AirTable`, both an English and a French version are included. If the person adding the string is not comfortable in both official languages they are encouraged to add a `[TRANSLATE]` in front of the translation that they are uncomfortable with. This allows other members of the team to see the incomplete translation both in `AirTable` and the actual application, allowing them to fix the string if they have sufficient proficiency.

### Contribute to GitHub repo

Download github desktop @ https://desktop.github.com/.
Go to https://github.com/cds-snc/vac-benefits-directory
click "Clone or download" button and select open in desktop.
Select where you would like to save the project locally.

When making changes first make a new branch.
Click Branch in the top left corner, then new branch.

After making your changes commit those changes in github desktop then select push changes in the top right corner.
Navigate over to the github page https://github.com/cds-snc/vac-benefits-directory and find the branch. Then create a new pull request to better explain what changes you have implemented.
After that the pull request will be available for reviewers to look at and make sure everything looks good before merging it into master.

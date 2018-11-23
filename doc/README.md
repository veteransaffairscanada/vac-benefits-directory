## Documentation

### Table of Contents

- [Next.JS and Server Side Rendering](#nextjs-and-server-side-rendering)
- [AirTable](/doc/AIRTABLE.md)
- [Heroku](#heroku)
- [CircleCI](#circleci)
- [BrowserStack](#browserstack)
- [Test Driven Development](#test-driven-development)
- [Browserstack](#browserstack)
- [Deployment](#deployment)
- [Translations](#translations)
- [Snyk](#snyk)
- [Security review](#security-review)
- [Testing](#testing)
- [Code Documentation](#code-documentation)
- [Contributing to GitHub repo](#contributing-to-github-repo)
- [Pair Programming](#pair-programming)
- [Deployment notifications](#deployment-notifications)

### Next.JS and Server Side Rendering

#### What is it?

[Next.JS](https://github.com/zeit/next.js/ "Next.JS") is a javascript framework for server-rendered React applications.

#### Why are we using it?

The rational behind choosing Next.JS stems from the following criteria:

- Use of both Javascript on the front-end and back-end
- Ability to render pages completely in HTML and CSS on the server
- Robust developer support and extensive third party ecosystem

To provide the most elegant and modern user experience, [ReactJS](https://reactjs.org/ "ReactJS") was chosen as the primary front-end framework. Traditionally, ReactJS based applications are built as two distinct services, one server side, and one client side, with individual code bases and often in different programming languages. When a user makes a request against an application with such an architecture, they usually load a bundled Javascript file, pre-populated with data, that then expands and renders all the required HTML and CSS inside the user's browser.

Next.JS differs in this approach in that it can pre-render or "server render" the HTML and CSS before the Javascript bundle gets sent to the browser and therefore provide a more robust user experience by sending the HTML and CSS alongside the Javascript. The bundled Javascript file then gets expanded on top of the already existing HTML and CSS, allowing for the rich interactivity provided through ReactJS.

The advantages here are significant: for one the loading experience is faster as the HTML and CSS coming from the server display right away vs. awaiting the Javascript file to unbundle and render the HTML and CSS. Additionally in case the browser is unable to execute the javascript bundle because of an incompatibility (ex. using legacy browsers such as IE 10), we were able to create fallback solutions using the already rendered HTML and CSS. Most important, however, is that using Next.JS allows developer to use the same code base they use on the front-end of their application to also run on the back-end, significantly reducing the amount of complexity.

Lastly, our initial evaluation of NextJS showed that it worked well with a number of other Javascript components such as user interface libraries, search, and translation.

#### How can I get started?

Check out the Quickstart documentation in our README.md. You can also look at the [Next.JS](https://nextjs.org/learn/ "Next.JS") tutorial site to learn more.

### [AirTable](/doc/AIRTABLE.md)

### Heroku

#### What is it?

[Heroku](https://www.heroku.com) is a "platform as a service" that enables developers to build, run,
and operate applications entirely in the cloud. In particular, Heroku allows quick and easy deployment of apps,
either manually through a CLI or through the Heroku web interface.

#### Why and how are we using it?

We are using Heroku for two purposes:

- to allow us to quickly deploy a fixed branch to the web
  (for user and accessibility testing, and the VAC Working Group), and
- to create apps from branches to help with pull request review

We have a Heroku "CDS team" which the developers have admin access to, at https://dashboard.heroku.com/teams/cds/overview

To create a one-off app:

- Use the "New" button in the upper right corner, and click "Create new app".
- Give the app a name and click "Create app".
- The app's page opens. Under Deploy, connect the app to GitHub and a specific repo.
- choose a branch to deploy.

Heroku also automatically creates an app for each PR in our repository. This is extremely useful for code review.
Heroku will add a link to the app in the GitHub PR.

To set up PR review apps we use a Heroku Pipeline. From the dashboard:

- Click New / Create new pipeline.
- Give the pipeline a name, connect it to a repo and click "Create pipeline".
- Add an existing app (or create a new one) to the Staging or Production sections.
  The review apps will inherit environment variables from this app.
- Click "Enable Review Apps".
- Check the box next to "Create new review apps for new pull requests automatically".
- Click "Enable".

#### How does one get access?

To join the CDS Heroku team, create a (free) Heroku account and email vac@cds-snc.ca
with your account details so we can add you to the team.
Note that our PR apps are automatically created by Heroku, so developers do not require Heroku access
to have review apps created for their PRs.

### CircleCI

#### What is it?

[CircleCI](https://circleci.com/) is a cloud service that performs continuous integration testing and continuous deployment.

#### Why and how are we using it?

CircleCI is connected to our GitHub repositiory (see the project's [CircleCI page](https://circleci.com/gh/cds-snc/vac-benefits-directory)). For every new commit, CircleCI runs our test suite and reports any
failures. If a commit to master fails testing we are notified on the CDS `vac-devs` Slack channel.
If a commit to master passes, CircleCI builds a dockerfile from master and pushes it to DockerHub.
CircleCI is configured via [`config.yml`](/.circleci/config.yml).

#### How does one get access?

You can view a commit's test report without having admin access to our CircleCI account, but you will need this access to
change some parts of CircleCI configuration (in particular, to add environment variables to CircleCI). Talk to one of the
other developers to get access.

### Test Driven Development

#### What is it?

[Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development "Test Driven Developement") and other practices associated with "small a" [Agile](https://en.wikipedia.org/wiki/Agile_software_development "Agile") are a set of frameworks and tools to manage development of a software product.

#### Why are we using it?

Test driven development allows for an iterative and continous approach that is preferable to segmented release cycles. To facilitate this process, we have chosen to use a [Continous Integration](https://en.wikipedia.org/wiki/Continuous_integration "Continous Integration") and [Continous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery "Continous Delivery") process whereby new features and code are added to the product frequenty, reviewed and verified, and shipped as soon as they are done. We are currently using [https://circleci.com/](https://circleci.com/ "Circle CI") as our platform for running all our unit tests before deploying. Alongside that we are also using [https://heroku.com](https://heroku.com "Heroku") to create staging versions of our application for manual review.

#### What is our development process?

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

#### What are the advantages

The advantages of this process is that features get broken down and reviewed by the entire development team before work. This gives line of sight to the whole team on what is being worked on. Additionally anything being worked on is easily manageable by the person writing the code, as well as understandable by the person reviewing it. Using testing as the foundational practice allows for a high degree of confidence in the functionality of the code base. It also for allows instant feedback if a developer breaks existing functionality. Based on this high degree of confidence it allows a model of continuous delivery which ensures that stake holders and customers receive the features once they are ready vs. when they can be scheduled for release.

### BrowserStack

#### What is it?

[BrowserStack](https://www.browserstack.com) is a cloud service that allows instant access to over 1000 real devices and browsers.

#### Why and how are we using it?

We use BrowserStack to test our app on other devices and browsers. In particular, since our development machines are MacBooks we need
an easy method to test on Windows / Internet Explorer. We use BrowserStack in two ways

- as a live platform to evaluate the app manually
- as a host for automated testing (described below)

#### How does one get access?

Create a personal account on BrowserStack and then contact a developer to get your account associated with the CDS account.

### Deployment

#### How are we deploying the application?

To standardize the environments between testing and production we are using [Docker](https://www.docker.com/), which allows us to create the same software conditions throughout our release pipeline. Docker allows us to create a specific environment from which the application should run, defined through the [Dockerfile](https://github.com/cds-snc/vac-benefits-directory/blob/master/Dockerfile) inside our main repository. Docker executes this file and builds a container image, which then can be deployed on any infrastructure that supports container images (Azure, AWS, Google Cloud, etc.)

#### What is the current deployment workflow?

When a pull request is approved the developer merges the branch into `master`. CircleCI receives a notification and starts running all the tests for the application. If all test pass, CircleCI then uses the Docker executable to build a Docker image. It then pushes the Docker image to a container registry. A container registry is simply a collection of images available to a specific organization or user. Once the registry has received the image it notifies the deployment platform (Azure in this case), that a new image is available. Azure then downloads the image from the container registry and deploys it to its own container service. The container service has already been configured to accept certain DNS requests and to route the requests appropriately (this is usually outside of the scope of this applications deployment configuration).

#### How is this different from the testing workflow?

The testing workflow is different from deployment, but is also initiated by developer actions on GitHub. When a developer creates a new bug / feature branch it notifies CircleCI to run the tests on the code contained inside the branch. It also triggers a Heroku build so that other developers can see the changes in action without having to run the branch locally. In the other scenario, the developer merges a branch into `master`. This also notifies CircleCI, but because it is `master` triggers the Docker build process if all tests pass. The result of the Docker build process is what then gets deployed to the production server.

The following diagram demonstrates both flows:

![Test and deploy workflow](https://user-images.githubusercontent.com/867334/44407480-31f3b780-a52c-11e8-97d7-6cf8ad046019.png "Test and deploy workflows")

### Translations

#### Why are we translating our content?

Given the Government of Canada's mandate to support both official languages, we use `react-18next` [https://react.i18next.com](https://react.i18next.com/ "react-18next") to allow us on-the-fly translations of all the text visibile on a given page.

#### How does it work?

The process to translate text is to pull translated `key`-`value` strings out of static JSON files that correspond with the locale set for the browser, or a `lng` GET param set in the URL. This requires any modification or addition of translation strings to go through a `commit` cycle in Git, limiting accessibility to business owners and other non-technical users. Instead we are storing all translatable strings in `AirTable` where they can be easily modified using a user interface similar to Excel.

Upon boot, and every hour after, the server will download and cache all the translation strings in memory (A refresh of the cache can also be requested upon demand). The strings are then stored in `redux` and made available to all `react` compoments. A `translation` function then takes the `key` of a string and looks up the matching value in the corresponding locale.

When a new string is added to `AirTable`, both an English and a French version are included. If the person adding the string is not comfortable in both official languages they are encouraged to add a `[TRANSLATE]` in front of the translation that they are uncomfortable with. This allows other members of the team to see the incomplete translation both in `AirTable` and the actual application, allowing them to fix the string if they have sufficient proficiency.

### Snyk

#### What is it?

[Snyk](https://snyk.io/) is a cloud service that analyzes code for vulnerabilities.

#### Why and how are we using it?

Synk gives us a real-time evaluation of the modules we are using in our app.
Snyk is integrated with our Github repository and provides us with information in two ways:

- Snyk is run on master with every merge, and the results reported on a badge at the top of [README.md](/README.md).
  Additionally, the development team receives a weekly email from Snyk detailing any vulnerabilities found.
- Synk runs on every pull request, and the results are reported in the PR.

#### How does one get access?

Talk to a developer to get access to our Synk account.

### Biweekly code review

As mentioned above we use Synk to constantly monitor our code for vulnerabilities, and respond as required to any new vulnerabilities found in our app.
In addition to this, at the start of every two week sprint we do a security review and update. Currently this entails:

- listing any new software development tools we are using, and signing up for the appropriate security bulletins
- reviewing and updating the packages we are using in the project
- running end-to-end tests on Windows (via BrowserStack) and noting any issues that arise (`yarn test:e2e_windows`)

See [SECURITY.md](/SECURITY.md) for more details

### Testing

We are using a combination of unit tests and end-to-end tests to validate the code base. Unit tests are written
using [`jest`](https://jestjs.io/) and [`enzyme`](http://airbnb.io/enzyme/). We have made the decision not to test for
correct styling, but rather focus on the logic in the components. We currently have over 200 tests that are run by CircleCI
on every commit. PRs are not approved if code is added to the app without sufficient testing. PRs should not be merged
if the tests do not pass.

We are using [Testcafé](https://devexpress.github.io/testcafe) to write end-to-end tests. The e2e test suite can be run locally
via `yarn test:e2e` (with `yarn dev` running). We also run our tests on Windows using the cloud service [BrowserStack](https://www.browserstack.com)
using the command `yarn test:e2e_windows` (with `yarn dev` running and the environment variables
`BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` set appropriately).

### Code documentation

We are currently using [React Styleguidist](https://react-styleguidist.js.org/) to create easily accessible HTML output of our React components code comments. This documentation can be found in the `documentation` directory. To interactively generate the documentation you can run `yarn docs`, which will start a web server from which you can view the generated output. The output will update as you adjust comments inside the react components. To generate the static HTML output, please run `yarn docs:build`.

### Contributing to GitHub repo

Download github desktop @ https://desktop.github.com/.
Go to https://github.com/cds-snc/vac-benefits-directory
click "Clone or download" button and select open in desktop.
Select where you would like to save the project locally.

When making changes first make a new branch.
Click Branch in the top left corner, then new branch.

After making your changes commit those changes in github desktop then select push changes in the top right corner.
Navigate over to the github page https://github.com/cds-snc/vac-benefits-directory and find the branch. Then create a new pull request to better explain what changes you have implemented.
After that the pull request will be available for reviewers to look at and make sure everything looks good before merging it into master.

### Pair programming

#### What is it?

[Pair programming](https://en.wikipedia.org/wiki/Pair_programming) is where 2 developers work together on the same task using the same workstation.

#### Why and how are we using it?

- to quickly onboard developers new to the project - knowledge transfer happens quickly when pairing with a developer who knows the codebase
- to work on difficult features where 2 brains are an advantage
- for fun!

When the 2 developers are not in the same location, we have accomplished pairing with the following:

- Phone call for voice - this is the most reliable if there is a slow network connection on 1 or more end.
- [Atom](https://atom.io/) with Teletype for writing code
- [Slack](https://slack.com/) for screen sharing, so the observer can see things outside the text editor like tests being run in terminal, what it looks like in the browser, etc.

#### How does one get set up?

To set up Atom for pair programming, do the following:

1. Download and install Atom: [https://atom.io/](https://atom.io/)
2. Open Atom -> Preferences -> Install, and search for "Teletype"
3. Install Teletype. A Teletype icon (looks like a radio tower) should appear at the bottom of your screen.
4. Click the Teletype icon and authorize it using your Github credentials
5. Go back to Atom, click the Teletype icon again and you should now be able to share your workspace or join a portal by pasting in the link to another person's workspace.

### Deployment notifications

#### What is it?

Deployment notifications are automated messages that we send to our internal Slack channel to notify us when the application has been deployed.

#### How do they work?

Upon server start the the application will send a JSON payload to a [Slack incoming webhook](https://api.slack.com/incoming-webhooks "Incoming Webhook"). The webhook then translates the information into a nicely formatted slack message that all developers can see. You can learn more about how they exactly work [here](https://github.com/cds-snc/vac-benefits-directory/blob/master/utils/deploy_notification.js). Important is that you set a `WEBHOOK_URL` environmental variable which is the URL of your Slack Webhook.

#### What do we use them for?

We primarily use the deploy notification to ensure that our production release are making it onto the production server. Each notification includes a link to the pull request that was merged into `master` as well as a timestamp of when the server finished starting up. This allows us to determine how long a production deploy takes after we kick off a production build. Currently from starting the build to deployment takes ~8 minutes.

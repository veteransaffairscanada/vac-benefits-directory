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

### Contribute to github repo

Download github desktop @ https://desktop.github.com/.
Go to https://github.com/cds-snc/vac-benefits-directory
click "Clone or download" button and select open in desktop.
Select where you would like to save the project locally.

When making changes first make a new branch.
Click Branch in the top left corner, then new branch.

After making your changes commit those changes in github desktop then select push changes in the top right corner.
Navigate over to the github page https://github.com/cds-snc/vac-benefits-directory and find the branch. Then create a new pull request to better explain what changes you have implemented.
After that the pull request will be available for reviewers to look at and make sure everything looks good before merging it into master.

## Content Updates

This documentation serves as a simple guide on how a developer may update the app content in the data/data.json file. The UA and Production environments of Find benefits and services use content from the data.json file, and **NOT** directly AirTable. The data.json file is populated by content from the AirTable titled **Master**, and the data can be repopulated from the current version of this AirTable.

#### How to run a content update:

To repopulate the data.json file (AKA run a content update)

- [] Run `yarn download` in a new branch
- [] Run tests
- [] Commit
- [] Create a pull request to go into the **develop** branch and then into **master**

That will update the repository's code, and then if the new content is not yet showing up in the UA and production environments:

- [] Ensure pods on the UA environment have been rebuild, and business users can test the app
- [] Update the production environment (rebuild pods, tag a new release in GitHub, etc.)

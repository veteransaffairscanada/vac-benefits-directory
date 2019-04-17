[![CircleCI](https://circleci.com/gh/veteransaffairscanada/vac-benefits-directory.svg?style=svg)](https://circleci.com/gh/veteransaffairscanada/vac-benefits-directory)
[![Known Vulnerabilities](https://snyk.io/test/github/veteransaffairscanada/vac-benefits-directory/badge.svg?targetFile=package.json)](https://snyk.io/test/github/veteransaffairscanada/vac-benefits-directory?targetFile=package.json)

[La version française suit.](#---------------------------------------------------------------------)

# Find benefits and services

This is the code for _Find benefits and services_, a product being developed by VAC and CDS. The app is in beta and currently deployed at https://benefits-avantages.veterans.gc.ca. It is undergoing development and is not yet publicly released for use.

The setup documentation can be found below. If you'd like to contribute to the project, we have more detailed documentation regarding our tech choices here: [doc](/doc/).

## Environment variables

These need to be set on the production service for the app to function correctly.
Some are also required for testing. You will also need some of these set for local development
(at the very least, you should have `AIRTABLE_READ_KEY`).
Contact other developers on the project for what values we're currently using.

| Variable                     | Use                                                                                                          | Where                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------- |
| `AIRTABLE_READ_KEY`          | load data (benefits / translations / etc) from Airtable                                                      | production / locally |
| `AIRTABLE_WRITE_KEY`         | write feedback form data to Airtable                                                                         | production           |
| `AIRTABLE_BASE_KEY`          | This tells the app which Airtable base to pull data from. If it is not set, the VAC master base will be used | production / locally |
| `SENTRY_DSN`                 | save browser errors to Sentry                                                                                | production           |
| `GA_UA`                      | track app usage with Google Analytics for VAC                                                                | production           |
| `GA_UA_CDS`                  | track app usage with Google Analytics for CDS                                                                | production           |
| `GITHUB_PUBLIC_ACCESS_TOKEN` | gather data from GitHub for the stats page                                                                   | production           |
| `WEBHOOK_URL`                | Sends slack deployment notifications                                                                         | production           |
| `BROWSERSTACK_USERNAME`      | run tests on Windows via BrowserStack                                                                        | locally              |
| `BROWSERSTACK_ACCESS_KEY`    | run tests on Windows via BrowserStack                                                                        | locally              |
| `STAGING`                    | `true` = pull data directly from airtable, `false` = pull data from data/data.json                           | production / locally |

Note that VAC docker images are public, so you should not put any sensitive (ie write) keys in the docker image.

### Adding a new environment locally (OS X)

1.  In the terminal, run: `nano ~/.bash_profile` (or `nano ~/.zshrc` if you're using the zsh shell)
2.  Add the following line: `export AIRTABLE_READ_KEY="foo"`
3.  [ctrl] + x, and type `y` to save
4.  `source ~/.bash_profile` (or `source ~/.zshrc`)
5.  `echo $AIRTABLE_READ_KEY` to make sure it is set

### Adding a new environment locally (Windows 7)

Start Menu > Control Panel > User Accounts > User Accounts > Change my environment variables > New...

Example setup:
Variable Name = AIRTABLE_READ_KEY
Contact other developers on the project for what values we're currently using.
restart Command Prompt, echo %AIRTABLE_READ_KEY% to check if value is setup properly

### Adding a new environment variable to the source code

To add a new ENV variable to the source code, take the following steps:

1.  Follow the steps above to add it locally
2.  Reference it in the source code with `process.env.YOUR_VARIABLE_NAME`
3.  Add the following lines to [Dockerfile](./Dockerfile):
    ```
    ARG YOUR_VARIABLE_NAME
    ENV YOUR_VARIABLE_NAME ${YOUR_VARIABLE_NAME}
    ```
4.  Add another build argument to [config.yml](./.circleci/config.yml):
    `--build-arg YOUR_VARIABLE_NAME="${YOUR_VARIABLE_NAME}"`
5.  Add the ENV variable to CircleCI through their web interface: https://circleci.com/gh/veteransaffairscanada/vac-benefits-directory -> Settings -> Environment Variables
6.  Add the ENV variable to Heroku through their web interface.
    It will need to be added to any production apps as well as the app that the pull request reviews are based on, namely
    [vac-poc-staging](https://dashboard.heroku.com/apps/vac-poc-staging). Go to the apps, then the Settings tab, then "Reveal Config Vars"
    and set the variable.

7.  Add `"YOUR_VARIABLE_NAME": { "required": true }` to the `env` object in [app.json](./app.json)

## Quickstart (OS X)

- Set the appropriate environment variables on your machine (see above)
- Install the development environment
  - [Homebrew](https://brew.sh/)
  - node (`brew install node`)
  - yarn (`npm i yarn`)
- Clone the repo
  - `git clone git@github.com:veteransaffairscanada/vac-benefits-directory.git`
- In the local repo directory:
  - `yarn install`
  - `yarn dev`

## Quickstart (Windows)

- Set appropriate environment variables on your machine (see above)
- Download Node.JS of version 9 or newer(as .zip since .msi is blocked)
- Following steps required tp set up the newly installed Node cmd line commands such as npm globally
  > Start menu > Control Panel > User accounts > user accounts > change my environment variables >
  > select path > Edit > Now enter the location of where you have Node installed with a ; to separate
  > between any other entries here.
  > EX: C:\dev ; C:\Node
- `npm install -g yarn`
- `yarn install` (While in project main directory, takes a while, especially on building packages)
- `yarn dev` (run while CD'd in project folder used to start the local server)
- If you run into syntax errors chances are there are missing packages/dependencies and you may want to try
  running a clean yarn install. Delete Node_modules folder and then re run `yarn install` in the main folder.

## Reference

This application uses the following resources:

- NextJS [https://learnnextjs.com/](https://learnnextjs.com/)
- Jest [https://facebook.github.io/jest/](https://facebook.github.io/jest/)
- Prettier [https://prettier.io/](https://prettier.io/)

## ---------------------------------------------------------------------

# Rechercher des avantages et des services

Il s’agit du code pour _Rechercher des avantages et des services_, un produit mis au point par Anciens Combattants Canada (ACC) et le Service numérique canadien (SNC). L’application est actuellement déployée à https://benefits-avantages.veterans.gc.ca/?lng=fr.

La documentation sur la configuration se trouve ci-dessous. Si vous voulez contribuer à la réalisation du projet, nous avons [une documentation](/doc#---------------------------------------------------------------------) plus détaillée concernant nos choix technologiques.

## Variables d’environnement

Il faut établir les variables d’environnement dans le service de production pour que l’application fonctionne correctement. Certaines sont également nécessaires pour les tests. Il faut également établir certaines variables pour le développement local (à tout le moins, vous devriez avoir `AIRTABLE_READ_KEY`).
Communiquez avec d’autres développeurs sur le projet pour connaître les valeurs que nous utilisons actuellement.

| Variable                     | Utilisation                                                                                                                                             | Emplacement           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `AIRTABLE_READ_KEY`          | télécharger des données (avantages/traductions/autres) à partir d’Airtable                                                                              | production/localement |
| `AIRTABLE_WRITE_KEY`         | écrire des données de formulaire de rétroaction dans Airtable                                                                                           | production            |
| `AIRTABLE_BASE_KEY`          | indiquer à l’application la base d’Airtable d’où il faut extraire les données; si cette variable n’est pas établie, la base maître du SNC sera utilisée | production/localement |
| `SENTRY_DSN`                 | enregistrer les erreurs du navigateur dans Sentry                                                                                                       | production            |
| `GA_UA`                      | faire le suivi de l’utilisation de l’app à l’aide de Google Analytics pour ACC                                                                          | production            |
| `GA_UA_CDS`                  | faire le suivi de l’utilisation de l’app à l’aide de Google Analytics pour le SNC                                                                       | production            |
| `GITHUB_PUBLIC_ACCESS_TOKEN` | recueillir des données de GitHub pour la page des statistiques                                                                                          | production            |
| `WEBHOOK_URL`                | envoyer les notifications de déploiement de Slack                                                                                                       | production            |
| `BROWSERSTACK_USERNAME`      | exécuter des tests dans Windows à l’aide de BrowserStack                                                                                                | localement            |
| `BROWSERSTACK_ACCESS_KEY`    | exécuter des tests dans Windows à l’aide de BrowserStack                                                                                                | localement            |
| `STAGING`                    | `true` = extraire des données directement d’Airtable, `false` = extraire des données à partir de data/data.json                                         | production/localement |

Veuillez noter que les images Docker du SNC sont publiques. Par conséquent, vous ne devez pas mettre des clés de nature délicate (c’est-à-dire, rédiger) dans l’image Docker.

### Ajouter un nouvel environnement localement (OS X)

1.  1. Dans le terminal, exécutez : `nano ~/.bash_profile` (ou `nano ~/.zshrc` si vous utilisez l’interpréteur de commandes zsh).
2.  2. Ajoutez la ligne suivante : `export AIRTABLE_READ_KEY="foo"`.
3.  3. Appuyez sur [Ctrl] + X, et tapez `y` pour enregistrer.
4.  `source ~/.bash_profile` (ou `source ~/.zshrc`).
5.  `echo $AIRTABLE_READ_KEY` pour vous assurer que la variable est établie.

### Ajouter un nouvel environnement localement (Windows 7)

Menu Start (Démarrer) > Control Panel (Panneau de configuration) > User Accounts (Comptes d’utilisateur) > User Accounts > Change my environment variables (Modifier les variables d’environnement) > New... (Nouveau...)

Exemple de configuration : nom de la variable = `AIRTABLE_READ_KEY`. Communiquez avec d’autres développeurs sur le projet pour connaître les valeurs que nous utilisons. Redémarrez l’invite de commandes, `echo %AIRTABLE_READ_KEY %` pour vérifier si la valeur est bien configurée.

### Ajouter une nouvelle variable d’environnement dans le code source

Pour ajouter une nouvelle variable ENV dans le code source, suivez les étapes suivantes :

1.  Suivez les étapes ci-dessus pour l’ajouter localement.
2.  Mentionnez-la dans le code source avec `process.env.YOUR_VARIABLE_NAME`.
3.  Ajoutez les lignes suivantes dans [Dockerfile](./Dockerfile) (en anglais):
    ```
    ARG YOUR_VARIABLE_NAME
    ENV YOUR_VARIABLE_NAME ${YOUR_VARIABLE_NAME}
    ```
4.  Ajoutez un autre argument de construction [config.yml](./.circleci/config.yml):
    `--build-arg YOUR_VARIABLE_NAME="${YOUR_VARIABLE_NAME}"`
5.  Ajoutez la variable ENV dans CircleCI au moyen de l’interface du site Web : https://circleci.com/gh/veteransaffairscanada/vac-benefits-directory (en anglais) -> Settings (Paramètres) -> Environment Variables (Variables d’environnement)
6.  Ajoutez la variable ENV dans Heroku au moyen de leur interface Web. Il faudra l’ajouter à toutes applications de production ainsi qu’à l’application sur laquelle les examens de demande de tirage sont fondés, notamment
    [vac-poc-staging](https://dashboard.heroku.com/apps/vac-poc-staging) (en anglais). Allez aux applications, ensuite à l’onglet Settings, puis à « Reveal Config Vars », et établissez la variable.

7.  Ajoutez `"YOUR_VARIABLE_NAME": { "required": true }` à l’objet `env` dans [app.json](./app.json)

## Quickstart (OS X)

- Établissez les variables d’environnement appropriées sur votre machine (voir ci-dessus)
- Installez l’environnement de développement
  - [Homebrew](https://brew.sh/) (en anglais)
  - node (`brew install node`)
  - yarn (`npm i yarn`)
- Clônez le répertoire
  - `git clone git@github.com:veteransaffairscanada/vac-benefits-directory.git`
- Dans le répertoire local :
  - `yarn install`
  - `yarn dev`

## Quickstart (Windows)

- Établissez les variables d’environnement appropriées sur votre machine (voir ci-dessus)
- Téléchargez la version 9 de Node.JS ou une version plus récente (au format .zip puisque le format .msi est bloqué)
- Voici les étapes nécessaires pour configurer les commandes de ligne de commande Node nouvellement installées comme npm en mode global

  > Menu Start (Démarrer) > Control Panel (Panneau de configuration) > User accounts (Comptes utilisateurs) > User accounts > Change my environment variables (Modifier les variables d’environnement) > Select path (Sélectionner chemin d’accès) > Edit (Édition) > Entrez maintenant l’emplacement où vous avez installé Node avec un « ; » pour séparer les autres entrées ici. PAR EXEMPLE : C:\dev ; C:\Node

- `npm install -g yarn`
- `yarn install` (dans le répertoire principal du projet, il prend du temps, en particulier sur le développement des progiciels)
- `yarn dev` (exécuter après avoir changé le répertoire (cd) vers le dossier du projet utilisé pour lancer le serveur local
- • Si vous rencontrez des erreurs de syntaxe, il y a de fortes chances qu’il manque des progiciels ou des dépendances et vous voudrez peut-être essayer d’exécuter une nouvelle installation yarn. Supprimez le dossier Node_modules puis exécutez à nouveau `yarn install` dans le dossier principal.

## Référence

Cette application utilise les ressources suivantes (en anglais) :

- NextJS [https://learnnextjs.com/](https://learnnextjs.com/)
- Jest [https://facebook.github.io/jest/](https://facebook.github.io/jest/)
- Prettier [https://prettier.io/](https://prettier.io/)

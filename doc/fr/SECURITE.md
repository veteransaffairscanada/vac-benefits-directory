## Sécurité

#### Outils logiciels d’examen

Ajoutez tout nouvel outil que les développeurs utilisent dans
[dans Outils de développeur du SNC](https://docs.google.com/spreadsheets/d/1aKEk8P6qxNqc-DEgFtvHxkWORumEg00icqWjSZPTmlw)
et informez la Sécurité du SNC.

#### Tests de bout en bout sur Windows

Consultez la branche `master`.

-	Assurez-vous que `yarn dev` est en exécution et que les variables `BROWSERSTACK_USERNAME` et `BROWSERSTACK_ACCESS_KEY` sont établies de façon appropriée.
-	`yarn test:e2e` exécutera testcafe de façon locale.
-	`yarn test:e2e_windows` s’exécutera dans BrowserStack.

Si des tests échouent localement ou sur Windows, déclarez les problèmes appropriés et ajoutez-les au sprint en cours.

#### Mettre à jour des progiciels

Notre but est de mettre à jour toutes les dépendances de progiciel une fois par sprint. La responsabilité de cette tâche est confiée, en rotation, à tous les développeurs. Nous avons mis au point le circuit de travail suivant plus ou moins sensé, compte tenu de l’environnement de JavaScript :

Dans une nouvelle branche

-	[] Nettoyez les choses qui ne sont plus nécessaires.
-	[] Exécutez `yarn upgrade-interactive -- latest -- ignore-engines` pour trouver des progiciels mis à niveau.
-	[] Mettez à niveau le progiciel et apportez des modifications mineures à la version (vert et jaune).
-	[] Effectuez des tests.
-	[] Effectuez la validation.


Pour chaque mise à niveau rouge (version majeure) :

-	[] Mettez à niveau.
-	[] Effectuez des tests.
-	[] Examinez l’application localement.
-	[] Effectuez la validation.

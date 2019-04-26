## Sécurité

#### Outils logiciels d’examen

Ajoutez tout nouvel outil que les développeurs utilisent dans
[dans Outils de développeur du SNC](https://docs.google.com/spreadsheets/d/1aKEk8P6qxNqc-DEgFtvHxkWORumEg00icqWjSZPTmlw)
et informez la Sécurité du SNC.

#### Mettre à jour des progiciels

Notre but est de mettre à jour toutes les dépendances de progiciel une fois par sprint. La responsabilité de cette tâche est confiée, en rotation, à tous les développeurs. Nous avons mis au point le circuit de travail suivant plus ou moins sensé, compte tenu de l’environnement de JavaScript :

Dans une nouvelle branche

- [] Nettoyez les choses qui ne sont plus nécessaires.
- [] Exécutez `yarn upgrade-interactive -- latest -- ignore-engines` pour trouver des progiciels mis à niveau.
- [] Mettez à niveau le progiciel et apportez des modifications mineures à la version (vert et jaune).
- [] Effectuez des tests.
- [] Effectuez la validation.

Pour chaque mise à niveau rouge (version majeure) :

- [] Mettez à niveau.
- [] Effectuez des tests.
- [] Examinez l’application localement.
- [] Effectuez la validation.

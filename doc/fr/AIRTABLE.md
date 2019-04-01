# AirTable

## De quoi s’agit-il?

[AirTable](https://airtable.com/) (en anglais) est un produit de feuille de calcul en ligne semblable à Google Sheets, mais ayant une meilleure interface de programmation d’applications (API), des contrôles d’accès et un historique de révision. Il permet la création des feuilles de calcul et l’ajout ou la modification de données au moyen de l’application Web Airtable ou au moyen de son API REST. Cela peut être contrôlé en configurant des comptes d’utilisateurs et en leur donnant une autorisation de lecture ou d’écriture. Vous pouvez également générer des clés d’API qui ont une autorisation de lecture ou d’écriture. Des documents personnalisés d’API (avec des exemples d’appels!) sont produits à l’aide des noms de tableau ou de colonne pour votre projet, et on peut les consulter sur airtable.com.

## Pourquoi et comment l’utilisons-nous?

Nous utilisons Airtable puisqu’il permet aux non-développeurs (et aux développeurs!) de modifier facilement les données utilisées par notre application. Cela s’avère très utile pour les aspects suivants :

- Traductions : Les concepteurs de contenu et les traducteurs peuvent modifier le texte de l’interface utilisateur (IU) utilisé dans l’application en allant au tableau des traductions, en effectuant une recherche ctrl+f du texte de l’IU en français ou en anglais qu’ils veulent changer, puis le modifient.
- Logique d’admissibilité : La logique utilisée par notre application pour déterminer qui est admissible à des avantages est établie dans le tableau eligibilityPaths. Chaque rangée a une combinaison unique de réponses aux questions. Chaque rangée a aussi une liste des avantages qui est probablement disponible à un utilisateur qui répond de cette façon. La liste des avantages est liée aux rangées dans le tableau des avantages.
- Avantages : Ce tableau contient une rangée pour chaque avantage et une colonne (eligibilityPaths) avec une liste de liens vers des rangées dans le tableau eligibilityPaths. La mise à jour de cette liste mettra à jour les ID dans la colonne des avantages dans le tableau eligibilityPaths.
- Rétroaction : Le contenu présenté à partir de la barre de rétroaction dans le bas de page de l’application est rédigé dans le tableau de rétroaction sur AirTable. Pour ce faire, le serveur a un ensemble de clés d’écriture dans les variables ENV.

Les données d’AirTable sont lues par le serveur et injectées dans Redux, qui est ensuite envoyé au client.

## Comment peut-on y avoir accès?

Pour demander l’accès en vue de modifier du contenu dans AirTable, créez un compte dans le site Web puis envoyez un courriel à vac.devops-devops.acc@canada.ca comprenant les détails sur votre compte afin que nous puissions vous ajouter au projet.

## Apporter des modifications dans AirTable

Pour faire quoi que ce soit dans AirTable, effectuez toujours les étapes suivantes :

1. Consultez [Master AirTable base](https://airtable.com/tblfGOyRo7ODEWwoH/viwPnI9KzQFHKLRZH) (en anglais). Si vous n’avez pas d’autorisation pour y accéder, [demandez-la](#comment-peut-on-y-avoir-accès).
2. Apportez quelques modifications. Consultez les guides étape par étape ci-dessous pour vous aider dans la tâche que vous voulez effectuer.
3. Pour visualiser vos modifications dans l’application en direct, consultez la [page de validation des données](https://vbd-staging.herokuapp.com/data-validation?lng=fr) (en anglais) et cliquez sur le bouton « refresh cache » (rafraîchir la mémoire cache) dans le coin supérieur droit.
4. Veillez à ce qu’aucun nouveau test n’échoue en examinant les rangées sur la page de validation des données. S’il y en a, examinez et corrigez le problème dans Airtable.
5. Retournez à la page dans l’application où vous vous attendez à ce que vos modifications soient appliquées. Actualisez la page pour les voir.

## Guides étape par étape

### Modifier le texte et les liens dans l’application

1. Trouvez le texte ou l’hyperlien que vous voulez modifier dans l’[application](https://benefits-prestations.veterans.gc.ca/?lng=fr).
2. Copiez le texte dans le presse-papiers.
3. Examinez le tableau ci-dessous pour déterminer la feuille et la colonne d’Airtable où vous devriez apporter des modifications. Cliquez sur le lien vers la feuille.
4. Dans Airtable, faites ctrl+f (Windows) ou commande+f (Mac) pour effectuer une recherche sur la page, et collez le texte que vous avez copié.
5. Trouvez la rangée qui contient le texte que vous voulez modifier.
6. Saisissez votre nouveau texte dans les colonnes en français et en anglais.

| Texte que vous voulez modifier                                                   | Feuille d’AirTable (en anglais)                                                   | Nom de la colonne en anglais         | Nom de la colonne en français       |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------ | ----------------------------------- |
| Nom de l’avantage                                                                | [benefits](https://airtable.com/tblfGOyRo7ODEWwoH/viwPnI9KzQFHKLRZH)              | vacNameEn                            | vacNameFr                           |
| Description en une ligne                                                         | [benefits](https://airtable.com/tblfGOyRo7ODEWwoH/viwPnI9KzQFHKLRZH)              | oneLineDescriptionEn                 | oneLineDescriptionFr                |
| Lien Apprenez-en plus à ce sujet d’ACC                                           | [benefits](https://airtable.com/tblfGOyRo7ODEWwoH/viwPnI9KzQFHKLRZH)              | benefitPageEn                        | benefitPageFr                       |
| Renseignements importants dans l’en-tête de la carte                             | [benefits](https://airtable.com/tblfGOyRo7ODEWwoH/viwPnI9KzQFHKLRZH)              | noteEn                               | noteFr                              |
| Voir davantage de description de contenu                                         | [benefits](https://airtable.com/tblfGOyRo7ODEWwoH/viwPnI9KzQFHKLRZH)              | seeMoreSentenceEn                    | seeMoreSentenceFr                   |
| Texte des questions dans le répertoire des avantages                             | [questions](https://airtable.com/tblFZaPwjpdaTTXxP/viw4ZRQZM0bbqEeNj)             | display_text_english                 | display_text_french                 |
| Texte des questions dans l’expérience guidée                                     | [questions](https://airtable.com/tblFZaPwjpdaTTXxP/viw4ZRQZM0bbqEeNj)             | guided_experience_english            | guided_experience_french            |
| Titre de la page de l’expérience guidée                                          | [questions](https://airtable.com/tblFZaPwjpdaTTXxP/viw4ZRQZM0bbqEeNj)             | guided_experience_page_title_english | guided_experience_page_title_french |
| Texte de l’infobulle sur les questions de santé                                  | [questions](https://airtable.com/tblFZaPwjpdaTTXxP/viw4ZRQZM0bbqEeNj)             | tooltip_english                      | tooltip_french                      |
| Texte de l’option de choix multiples                                             | [multipleChoiceOptions](https://airtable.com/tbluhxf9gvgsQ2HZG/viwY91DJPBV1suMuo) | display_text_english                 | display_text_french                 |
| Texte de la piste de navigation ou du lien de l’expérience guidée                | [multipleChoiceOptions](https://airtable.com/tbluhxf9gvgsQ2HZG/viwY91DJPBV1suMuo) | ge_breadcrumb_english                | ge_breadcrumb_french                |
| Options de case à cocher dans l’expérience guidée et le répertoire des avantages | [needs](https://airtable.com/tbl1yGPsBEwR3xwVE/viwTfmcLJPwZh9YdU)                 | nameEn                               | nameFr                              |
| Tous les autres textes                                                           | [translations](https://airtable.com/tblM1z6Lt2EkKaJfO/viwv8z2q3lbjm8gO6)          | English                              | French                              |

### Modifier les critères d’admissibilité à un avantage

1. Repérez la feuille [benefitEligibility](https://airtable.com/tblUeGo0y7tIYmXPc/viwEyhlQrsHZXEOQG) dans AirTable.
2. Notez que chaque chemin d’accès est représenté par des valeurs inscrites dans des colonnes correspondant aux questions figurant sur la [feuille questions](https://airtable.com/tblFZaPwjpdaTTXxP/viw4ZRQZM0bbqEeNj). Les valeurs se trouvant dans les colonnes correspondent à celles qui figurent sur la feuille [multipleChoiceOptions](https://airtable.com/tbluhxf9gvgsQ2HZG/viwY91DJPBV1suMuo).
3. Insérez une ligne et indiquez-y l’avantage et les critères d’admissibilité. Note : inscrivez les valeurs `statusAndVitals` dans un chemin d’accès seulement si celui-ci inclut `family` et non `veteran`, `serving member` ou `organization`. Vous pourriez donc devoir créer deux lignes pour un même avantage, c’est-à-dire deux chemins d’accès : un pour les membres de la famille et un autre pour les anciens combattants.
4. Si vous souhaitez éliminer un chemin d’accès d’admissibilité relatif à un avantage, supprimez la ligne en question dans le tableau.

### Ajouter une catégorie (c’est-à-dire le besoin ou la question à cases à cocher) et associer la catégorie à un avantage

1. Naviguez jusqu’à la [feuille des besoins](https://airtable.com/tbl1yGPsBEwR3xwVE/viwTfmcLJPwZh9YdU) (en anglais) dans AirTable.
2. Ajoutez une nouvelle rangée en bas et donnez à la catégorie un nom français et un nom anglais.
3. Sélectionnez la cellule dans la colonne des avantages et cliquez sur `+`.
4. Commencez à taper les noms des avantages auxquels vous voulez que la catégorie soit associée.

Pour modifier les avantages liés à une catégorie existante, cliquez sur l’icône "expand” (agrandir) sur le côté droit de la cellule, et vous aurez l’option de dissocier des dossiers existants ou de lier de nouveaux dossiers.

### Comment ajouter des questions et réponses à choix multiples

1. Naviguez jusqu’à la [feuille des questions](https://airtable.com/tblFZaPwjpdaTTXxP/viw4ZRQZM0bbqEeNj) (en anglais).
2. Ajoutez une nouvelle rangée en bas et donnez-lui un variable_name qui décrit la question (les questions à choix multiples sont ordonnées selon leur ordre dans le tableau des questions; la question à cases à cocher sur les besoins est toujours en bas).
3. Remplissez le contenu suivant en français et en anglais : le texte des questions qui apparaîtra dans le répertoire des avantages, le texte des questions dans l’expérience guidée et le titre de la page de l’expérience guidée. Les noms des colonnes en français et en anglais se trouvent dans le tableau ci-dessus.
4. Naviguez ensuite jusqu’à la [feuille des options à choix multiples](https://airtable.com/tbluhxf9gvgsQ2HZG/viwY91DJPBV1suMuo) (en anglais).
5. Ajoutez une nouvelle rangée pour chaque option à choix multiples que vous désirez afficher sous la nouvelle question.
6. Donnez à chaque option un variable_name qui la décrit, ainsi que le texte en français et en anglais que l’utilisateur verra, et le texte en bleu de la piste de navigation dans l’expérience guidée (voir le tableau ci-dessus pour les noms de colonne).
7. Sélectionnez chaque cellule « linked_question”, cliquez sur +, et tapez ou sélectionnez le variable_name de la question que vous avez ajoutée à l’étape 2.
8. Pour voir votre question affichée dans l’application, suivez les étapes pour ajouter un nouveau chemin d’accès d’admissibilité qui est lié à votre nouvelle question. Une question est affichée seulement si sa réponse touche la liste des avantages offerts.

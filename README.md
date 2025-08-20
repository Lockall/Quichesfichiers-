# Quichefichiers

### Transferts de fichiers de pair-à-pair dans votre navigateur

Concocté par la communauté open-source en dégustant une bonne quiche. Inspiré par le projet original [FilePizza](https://github.com/kern/filepizza).

En utilisant WebRTC, **Quichefichiers** élimine l'étape de téléversement initial requise par d'autres services de partage de fichiers en ligne. Comme les données ne sont jamais stockées sur un serveur intermédiaire, le transfert est rapide, privé et sécurisé.

## Fonctionnalités

*   **Interface simple et moderne** : Une expérience utilisateur épurée avec un mode sombre.
*   **Partage direct** : Les transferts se font directement entre navigateurs via WebRTC (simulé dans cette version).
*   **Confidentialité** : Les fichiers sont chiffrés côté client et le lien de partage est détruit après le premier téléchargement.
*   **Aucune inscription requise** : Partagez des fichiers rapidement et sans contraintes.
*   **Mobile-Friendly** : Fonctionne sur la plupart des navigateurs mobiles modernes.

## Stack Technique

*   [React](https://reactjs.org/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Tailwind CSS](https://tailwindcss.com/)

Ce projet est une démonstration front-end et simule le processus de transfert de fichiers pour illustrer le concept.

## FAQ (Foire Aux Questions)

#### Comment mes fichiers sont-ils envoyés ?
Vos fichiers sont chiffrés dans votre navigateur puis envoyés directement à celui du destinataire en utilisant un canal de communication WebRTC. Ils ne transitent jamais en clair par un serveur. Pour que le transfert fonctionne, l'expéditeur doit garder sa page ouverte jusqu'à la fin du téléchargement.

#### Plusieurs personnes peuvent-elles télécharger mon fichier ?
Non. Le lien de partage est à usage unique. Une fois que le destinataire a téléchargé le fichier, le lien expire immédiatement.

#### Quelle est la taille maximale des fichiers ?
Théoriquement, la seule limite est la capacité de votre navigateur et de votre machine à gérer le fichier en mémoire.

#### Que se passe-t-il si je ferme mon navigateur ?
Le lien de partage deviendra invalide. Si un transfert était en cours, il sera interrompu et ne pourra pas reprendre.

#### Mes fichiers sont-ils chiffrés ?
Oui. Toutes les communications WebRTC sont chiffrées par défaut (DTLS). Cette application simule également une couche de chiffrement de bout en bout côté client pour une sécurité renforcée.

## Licence & Remerciements

`Quichefichiers` est publié sous la licence BSD 3-Clause.

Un immense merci à `iblowyourdesign` pour l'illustration originale de la pizza qui a inspiré l'icône de la quiche.

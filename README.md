<p align="center">
  <a href="https://goldavenue.com">
    <img src="https://www.goldavenue.com/packs/media/src/images/logos/logo_main-dfe6c41ac4008916aee56a271fccfafd.svg" height="128">
    <h1 align="center">Technical Test - Next.js and Typescript</h1>
  </a>
</p>

<p align="center">
  <a aria-label="Node version" href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/node->=%20v16-red">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/">
    <img alt="" src="https://img.shields.io/badge/npm->=%20v8-blue">
  </a>
  <a aria-label="Typescript version" href="https://www.typescriptlang.org/">
    <img alt="" src="https://img.shields.io/badge/typescript-4.7.2-yellow">
  </a>
  <a aria-label="React version" href="https://reactjs.org/">
    <img alt="" src="https://img.shields.io/badge/react-18.2.0-green">
  </a>
</p>

# Problèmes rencontrés et limitations

1. **État de chargement lors de l'affichage des images**
   - J'ai tenté d'implémenter un état de chargement (`loading state`) pour l'image de la page Pokémon via la méthode `onLoadComplete(() => setLoading(false))`. Cependant, la fonction semble se déclencher avant que l'image ne soit complètement visible, ce qui fait que l'état de chargement est toujours défini sur `false` trop tôt. Cela entraîne l'absence de gestion adéquate du `spinner` lors du chargement de l'image.

2. **Suspense pour le chargement**
   - J'ai également essayé d'utiliser `Suspense` pour gérer le chargement des composants, mais je n'ai pas pu le mettre en œuvre correctement. À la place, j'ai choisi d'écouter les événements de changement de route via `Router.events` de Next.js, et d'afficher un composant de chargement personnalisé pendant la transition de pokemon pages.

3. **Utilisation de `useSearchParams` dans les versions plus récentes de Next.js**
   - Si j'avais utilisé une version plus récente de Next.js, j'aurais préféré gérer les paramètres de recherche avec `useSearchParams` plutôt qu'un `state` pour manipuler les paramètres dans l'URL de manière plus fluide et naturelle.

4. **Gestion des ID minimum et maximum**
   - Actuellement, les valeurs utilisées pour ne pas afficher les boutons "Previous" et "Next" en fonction du premier et du dernier ID sont définies en dur. J'aurais pu calculer dynamiquement les valeurs `minId` et `maxId` en récupérant l'ID minimum et maximum directement depuis la liste des Pokémon ou via une requête spécifique, plutôt que de les coder manuellement.

5. **Chemins d'images cassés en raison des caractères spéciaux**
   - Certaines images ne se chargent pas correctement à cause de caractères spéciaux dans les noms des Pokémon (par exemple, "Mr. Mime" ou "Nidoran♀"). Je n'ai pas trouvé de solution viable avec des regex ou d'autres techniques pour corriger ce problème de manière systématique. Une approche plus robuste aurait été d'utiliser les IDs des Pokémon pour nommer les images, ce qui permettrait d'éviter les problèmes liés aux caractères spéciaux dans les chemins d'accès.

6. **Tests unitaires**
   - Étant moins familier avec les tests unitaires, je n'ai probablement pas couvert tous les cas possibles ni implémenté les tests de manière optimale.


#### Install the dependencies

```bash
@user:~$ npm install
```

#### Run the project

```bash
@user:~$ npm run dev
```

#### Test the project

```bash
@user:~$ npm run test
```

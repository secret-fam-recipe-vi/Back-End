# Secret Family Recipes ENDPOINTS

Reagan Barrington

Elysia Gabe

## Register

Use the path [/register](https://secret-fam-recipes.herokuapp.com/api/register) for the log in.

The request should include a username and password, and the result will be a created user.

```bash
POST https://secret-fam-recipes.herokuapp.com/api/register
```

## Log In

Use the path [/login](https://secret-fam-recipes.herokuapp.com/api/login) for the log in.

The request should include a username and password, and the result will be a token.

```bash
POST https://secret-fam-recipes.herokuapp.com/api/login
```

## Recipes

Use the path [/recipes](https://secret-fam-recipes.herokuapp.com/api/recipes) for the log in.

The result will be an array of recipes.

```bash
GET https://secret-fam-recipes.herokuapp.com/api/recipes
```
Use the path [/recipes:id](https://secret-fam-recipes.herokuapp.com/api/recipes:id)

The result will one recipe, by id. Use this endpoint for editing and deleting.

```bash
GET https://secret-fam-recipes.herokuapp.com/api/recipes:id
DELETE https://secret-fam-recipes.herokuapp.com/api/recipes:id
PUT https://secret-fam-recipes.herokuapp.com/api/recipes:id
```
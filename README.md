# Eatie

“Eatie” is a food journal web application that promotes weight-loss through pictorial food logs, calorie tracking and detailed nutritional breakdowns. With Eatie’s health profile algorithm, users will be able to get personalised calorie targets according to their unique profiles. Eatie also has an extensive food database that can assist users to get a more accurate nutritional breakdown of their food intake. This would allow users to take better control of their goals and understand which nutrition they are lacking. Furthermore, to encourage users to journal their food intake, Eatie adopts a pictorial food journal to make journaling fun and easy.

## Backend - Firebase

## Frontend - HTML + CSS + Vue JS

## API Used

1. Edamam: https://rapidapi.com/edamam/api/recipe-search-and-diet/pricing  
2. Emailjs: https://www.emailjs.com/docs/

## Project setup
```
npm install
```

## Compile for development
```
npm run serve
```

## Compile for deployment
```
npm run build
```

### Step 1 : Clone/Pull Repo

### Step 2 : Run "npm install"

### Step 3: Create a dbconfig.json file within src

Insert firebase and RapidAPI details into dbconfig.json

```
{
    "apiKey": key,
    "authDomain": authDomain,
    "projectId": projectId,
    "storageBucket": storageBucket,
    "messagingSenderId": messagingSenderId,
    "appId": appId,
    "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
    "x-rapidapi-key": x-rapidapi-key
}
```

### Step 4 : Run "npm run serve"
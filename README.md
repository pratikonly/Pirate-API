# Pirate API Documentation

A simple REST API serving One Piece character data and a legendary pirate. All data is served from local files, making it lightweight and easy to deploy.

## Data Storage
The character data (names, roles, and bounties) is stored in:
`shared/schema.ts` (inside the `piratesData` constant).

## Image Assets
The API serves images from the following directory:
`client/public/images/pirates/`

### Required Image Files
To make the API functional with the frontend gallery, please upload the following images to the folder mentioned above:
- `luffy.png`
- `zoro.png`
- `shanks.png`
- `sanji.png`
- `joyboy.png`
- `garp.png`
- `brook.png`
- `doflamingo.png`
- `jack_sparrow.png`

## API Endpoints

### 1. List All Pirates
Returns an array of all available pirate profiles.
**URL:** `/api/pirates`
**Method:** `GET`

### 2. Get Random Pirate
Returns a single random pirate profile.
**URL:** `/api/pirates/random`
**Method:** `GET`

### 3. Get Pirate by ID
Returns a specific pirate profile by their unique ID.
**URL:** `/api/pirates/:id`
**Method:** `GET`
**Example:** `/api/pirates/1`

## How to Use
1. **Frontend:** The application comes with a built-in gallery that automatically fetches and displays this data.
2. **Custom Integration:** You can fetch data from any frontend application using standard HTTP requests:
   ```javascript
   const response = await fetch('/api/pirates');
   const data = await response.json();
   console.log(data);
   ```

## Included Characters
- Monkey D. Luffy
- Roronoa Zoro
- Shanks
- Sanji
- Joyboy
- Monkey D. Garp
- Brook
- Donquixote Doflamingo
- Jack Sparrow (Special Guest)

# Chabre Recuritment task

A simple recruitment task of displaying photos in a 2x3 grid, with the ability to replace images in place.

## Getting Started

1. Create `.env.local` file and add environment variables. (see: [Environment variables]('#environment-variables')). You can simply copy `.env.example`:

    ```bash
    cp .env.example .env.local
    ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

## Environment variables

| ENV Name                  | ENV Default value | Description                                                                                                                                                                                                                                                                                            |
| ------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `VITE_API_BASE_URL`             | `https://dog.ceo/api` | Specifies the base API path from which resources would be fetched.                                                        |
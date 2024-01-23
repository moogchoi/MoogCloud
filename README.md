# MoogCloud

Live Website: https://moogcloud.onrender.com/

# Description:

   MoogCloud is a web application for a music streaming platform that allows users to upload, share, and discover music.


# Features:

   User Authentication:

      MoogCloud protects the security of accounts registered with it by encrypting and securing passwords to offer security to users signing up. A demo user is also available to allow exploration of the site. Users must be logged in to access the songs and comments features.

   Songs:

      Users can view all songs.
      Users can upload songs.
      Users can update their uploaded songs.
      Users can delete their uploaded songs.

   Comments:

      Users can view all comments on a song.
      Users can add a comment to a song.
      Users can update their comment on a song.
      Users can remove their comments from a song.


# Technlogies:

- Frontend:
   - Redux
   - React
   - Javascript
   - CSS
   - HTML

- Backend:
   - Flask
   - Python
   - AWS S3

# Installation Instructions:

   - install dependencies:
      ```bash
         pipenv install -r requirements.txt
      ```

   - Create a .env file using the provided .envexample file.
   - Run the following commands in the terminal to setup the database and run the backend server:
      ```bash
         pipenv run flask db upgrade
      ```
      ```bash
         pipenv run flask seed all
      ```
      ```bash
         pipenv run flask run
      ```
   - In another terminal enter the react-app directory and run the following command to run the frontend:
      ```bash
         npm start
      ```

# Future Plans:

   - Likes, allowing users to like/dislike songs.
   - Playlists, allowing users to view their playlists, and add or delete songs to a playlist.

# Image Repository Project

## Overview
This project was created for the Shopify Backend Developer Challenge Fall 2021. Users can see all the public images available, but must sign up/log in to upload images (public or private). Only the original poster can delete their images. Image filenames must be unique.

## Features Implemented
- Sign Up / Login before uploading images
- Sessions to store login using cookies
- Add one/bulk images
- Access Control, using private and public labels
  - Only Original Poster and see their private images
  - All other users
  - Convert from private to public and vice versa
- Secure storage of images
- Secure deletion of images
- Only poster can delete their images

## How to to run this project
Clone this project from git and run the command ```npm install ``` to install the dependencies of the project. The mongodb connection string must be stored in the ```.env``` file with the name ```MONGO_URI```. Then, use the command ```npm start``` to run the project from PORT 5000. Username and password can be any combination of strings and numbers.


## Known Issues / Upcoming Changes
- Implement flash messages for errors such as password confirm does not match password
- Improve UI
- Display Poster name for each image

## Demo
![alt text](https://github.com/SouradeepSaha/image-repository/blob/main/demo.gif "Demo")
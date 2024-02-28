# devTalk-blog

![picture of the homepage once you log in](https://github.com/MarkRBishop/devTalk-blog/blob/main/assets/devTalk_homepage.png?raw=true)

## Description

This is an application that provides a platform to discuss different topics involving tech and it's possibilities. 

## Usage

download the repo to start your own version or visit the site. If you visit the gitHub example you can just sign up and it will direct you to the homepage. You can comment on posts as you please.


## Getting started
Once you have downloaded the repo from the gitHub link, navigate to the root folder

1. install the dependencies
```
npm i
```
2. set up your mysql db
```
mysql -u (your username here) -p 
```
Then type in your password as prompted

3. assuming you've navigated to the root in your terminal run the follow to set the schema
```
source db/schema.sql
```
then exit the mysql terminal with
```
quit
```
4. Be sure to change the .env.example to just .env and put in your mysql credentials

5. Once everything about is done, seed the program with some test accounts to ensure its working (optional)
```
npm run seed
```
6. start the server at this point
```
npm run watch
```

## links 
Link to the repo

https://github.com/MarkRBishop/devTalk-blog

Link to the hosted site

https://markrbishop.github.io/devTalk-blog/



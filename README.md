# Git
My git repository is structured by week, allowing for a version control to have working, and functionally significant, 
code as a fall-back point, should something go wrong.

# Data Structures
The approach I took to structuring data in my assignment was to use JSON files, structuring as you would a database. 
Data was grouped in as narrow groups as possible, with lone JSON files dedicated to linking other JSON files. 
The way users and groups were represented in their givens files as their own object.

# REST API
I used routes for creating users, groups, channels as well as deleting them. I also used routes for adding or removing users 
to groups or channels. 
The parameters were res and req. They stand for response and request respectively. 
The return values in most routes was an object contain a true or false assigned to the “ok” key and a string, containing feedback 
of what has, or has not, happened. 
Most of them read and wrote to various files, for reasons like check whether a user, group or channel exists or adding a new user, 
group or channel to the relevant JSON file.

# Angular Architecture
I used components for my login, profile and account page. Angular’s ngModel was used frequently as a form of two-way binding. 
For example, it was used to extract information users inputted into forms. Services were not used.

# State Change
The client and server interacted with the REST API. 
When the client received a response form the server it is able to update a given angular component accordingly. 

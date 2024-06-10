# Train Schedule Service

## Overview

This project is a web service for managing and visualizing train schedules at a specific station. 
It allows clients to post schedules for different train lines and retrieve the next time multiple trains will arrive simultaneously. 
Additionally, it provides a visual representation of train schedules on a clock face, displaying the times in clockwise, anti-clockwise, and mirrored formats.

## Features

- **Post Train Schedule:** Allows clients to add schedules for train lines with their respective arrival times.
- **Get Next Simultaneous Arrival:** Returns the next time two or more trains arrive simultaneously after a given time.
  
## Installation
----git clone <https://github.com/SulakshanaMucheli/Train_schedule_services.git>

----cd Train_schedule_services

----npm install

----install postman(https://www.postman.com/downloads/)

----node app.js

## Visualization
Open a browser and navigate to http://localhost:4000 to see the visualization of the train schedules.

## Requests using Postman

--->For testing the endpoints I am using the Postman
## Adding schedules of TRAINS
Set the request method to POST.
Set the URL to http://localhost:4000/schedule.
Set the body to raw and JSON format.
[
    {
        "train_line": "A123",
        "times": ["9:53 PM", "10:30 PM", "11:15 PM"]
    },
    {
        "train_line": "B456",
        "times": ["10:30 PM", "11:00 PM", "11:30 PM"]
    }
]

## Getting the Simultaneous Time of Trains.
Set the request method to GET
Set the URL to http://localhost:4000/next_simultaneous_arrival?time=10:00 PM 
Check the times of trains and give simultaneous times of trains.

## Getting the details of the trains at the station.
Set the request method to GET 
Set the URL to http://localhost:4000/


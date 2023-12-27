# Convert Insights

## About
This small script was done to easily create a list of Locations for specific Convert Project.
Here is an API docs link https://api.convert.com/doc/v2/#tag/Locations/operation/createLocation

## Requirements

* nodejs >=12.0.0
* npm

## Configurations
To configure script, you need to do steps below inside **index.js** file
* Set API Key & API Secret - take a look this [link](https://api.convert.com/doc/v2/#tag/API-KEY-Authentication) to get more info about Key-based auth 
* Set Account Id & Project Id - to get Account Id & Project Id, you need to open Convert website and select some project, then in browser address line, you will see something like that **.../accounts/10001/projects/10006012/...** where Account Id is **10001** and Project Id is **10006012**
* Set locations list (to variable **const locations = [];**) according to example inside **index.js** file

## Example
Example below to create 2 locations:

```
const locations = [
   {
    "name": "Test Location",
    "description": "Test Location description",
    "status": "active",
    "rules": {
      "OR": [
        {
          "AND": [
            {
              "OR_WHEN": [
                {
                  "rule_type": "url",
                  "matching": {
                    "match_type": "matches",
                    "negated": false
                  },
                  "value": "https://convert.com"
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "name": "Another Location",
    "description": "Another Location description",
    "status": "active",
    "rules": {
      "OR": [
        {
          "AND": [
            {
              "OR_WHEN": [
                {
                  "rule_type": "url",
                  "matching": {
                    "match_type": "contains",
                    "negated": false
                  },
                  "value": "about-us"
                }
              ]
            }
          ]
        }
      ]
    }
  }
 ];
```

## How to run
In console type code below to install dependencies:<br /> 

``npm install``<br /> 

Then, type code below to execute script:<br /> 

``node index.js``

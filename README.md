# cookflow

## What is Cookflow?

## Recipe Markup Language (RML)

Recipe Markup Language is a JSON subset that encodes recipes in a manner that Cookflow can parse and use to generate recipe visualizations.

### Data Types

_TODO: update these definitions to match [RecipeMarkupLanguage.ts](app/RecipeMarkupLanguage.ts)_

#### Recipe
The top-level
recipe : (title, list[operations])

#### Ingredient Primitives
ingredient : (name, qty, unit)
* name is a string
* qty is a float
* unit is an enum unit {g, tsp, Tbsp, c, mL, unit}

#### Cooking Operations
operation : (instruction, time, list[ingredient])
* subset of ingredient

time: (duration, timeunit) OR null
* duration is a float
* timeunit is an enum timeunit {s, min, day}


### Example - Cabbage Pancake

![cabbage-pancake-diagram](/resources/cabbage-pancake.png)

The recipe depicted above is described by the following RML:

```json
{
  "name": "Cabbage Pancake",
  "components": {
    "output": {
      "name": "Cabbage"
    },
    "steps": [
      {
        "instruction": "cook",
        "time": {
          "duration": 6,
          "timeUnit": "minutes"
        }
      },
      {
        "instruction": "flip"
      },
      {
        "instruction": "cook",
        "time": {
          "duration": 3,
          "timeUnit": "minutes"
        }
      }
    ],
    "components": [
      {
        "output": {
          "name": "Heated Oil"
        },
        "steps": [
          {
            "instruction": "heat in pan"
          }
        ],
        "components": [
          {
            "name": "Vegetable Oil"
          }
        ]
      },
      {
        "output": {
          "name": "Cabbage Pancake Batter"
        },
        "steps": [
          {
            "instruction": "mix together"
          }
        ],
        "components": [
          {
            "name": "Flour",
            "qty": 0.5,
            "unit": "cup"
          },
          {
            "output": {
              "name": "Cabbage Pancake Pre-Mix"
            },
            "steps": [
              {
                "instruction": "mix"
              },
              {
                "instruction": "wait",
                "time": {
                  "duration": 10,
                  "timeUnit": "minutes"
                }
              }
            ],
            "components": [
              {
                "output": {
                  "name": "Sliced Cabbage"
                },
                "steps": [
                  {
                    "instruction": "slice"
                  }
                ],
                "components": [
                  {
                    "name": "Cabbage"
                  }
                ]
              },
              {
                "output": {
                  "name": "Sliced Onion"
                },
                "steps": [
                  {
                    "instruction": "slice"
                  }
                ],
                "components": [
                  {
                    "name": "Onion"
                  }
                ]
              },
              {
                "output": {
                  "name": "Cut Chives"
                },
                "steps": [
                  {
                    "instruction": "chop to 4 in pieces"
                  }
                ],
                "components": [
                  {
                    "name": "Chives"
                  }
                ]
              },
              {
                "output": {
                  "name": "Diced Shrimp"
                },
                "steps": [
                  {
                    "instruction": "dice to 1cm chunks"
                  }
                ],
                "components": [
                  {
                    "name": "Shrimp"
                  }
                ]
              },
              {
                "name": "Egg",
                "qty": 1
              },
              {
                "name": "Soy Sauce"
              },
              {
                "name": "Black Pepper"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Usage

### Building
from the `app` directory, run:

``` shell
$ npm install

$ npm run build
```

### Running
Use your favorite server to serve the `app/index.html` file.
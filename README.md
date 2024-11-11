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
  "ingredient": {
    "name": "Cooked Cabbage Pancake",
    "qty": 1,
    "steps": [
      {
        "instruction": "cook",
        "time": {
          "duration": 6,
          "time_unit": "minutes"
        }
      },
      {
        "instruction": "flip"
      },
      {
        "instruction": "cook",
        "time": {
          "duration": 3,
          "time_unit": "minutes"
        }
      }
    ],
    "ingredients": [
      {
        "name": "Uncooked Cabbage Pancake",
        "qty": 1,
        "steps": [
          {
            "instruction": "pack"
          }
        ],
        "ingredients": [
          {
            "name": "Heated Oil",
            "qty": 1,
            "steps": [
              {
                "instruction": "heat in pan"
              }
            ],
            "ingredients": [
              {
                "name": "Vegetable Oil",
                "qty": 1,
                "unit": "tbsp"
              }
            ]
          },
          {
            "name": "Cabbage Pancake Batter",
            "qty": 1,
            "steps": [
              {
                "instruction": "mix"
              }
            ],
            "ingredients": [
              {
                "name": "Cabbage Pancake Pre-mix",
                "qty": 1,
                "steps": [
                  {
                    "instruction": "mix"
                  },
                  {
                    "instruction": "wait",
                    "time": {
                      "duration": 10,
                      "time_unit": "minutes"
                    }
                  }
                ],
                "ingredients": [
                  {
                    "name": "Sliced Cabbage",
                    "qty": 1,
                    "steps": [
                      {
                        "instruction": "slice"
                      }
                    ],
                    "ingredients": [
                      {
                        "name": "Cabbage",
                        "qty": 0.5
                      }
                    ]
                  },
                  {
                    "name": "Sliced Onion",
                    "qty": 1,
                    "steps": [
                      {
                        "instruction": "slice"
                      }
                    ],
                    "ingredients": [
                      {
                        "name": "Onion",
                        "qty": 1
                      }
                    ]
                  },
                  {
                    "name": "Cut Chives",
                    "qty": 1,
                    "steps": [
                      {
                        "instruction": "cut 4\""
                      }
                    ],
                    "ingredients": [
                      {
                        "name": "Chives"
                      }
                    ]
                  },
                  {
                    "name": "Diced Shrimp",
                    "qty": 1,
                    "steps": [
                      {
                        "instruction": "dice"
                      }
                    ],
                    "ingredients": [
                      {
                        "name": "Shrimp",
                        "qty": 4,
                        "unit": "oz"
                      }
                    ]
                  },
                  {
                    "name": "Egg",
                    "qty": 1
                  },
                  {
                    "name": "Soy Sauce",
                    "qty": 1,
                    "unit": "tbsp"
                  },
                  {
                    "name": "Black Pepper"
                  }
                ]
              },
              {
                "name": "Flour",
                "qty": 0.5,
                "unit": "cup"
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
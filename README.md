# cookflow

## What is Cookflow?

## Recipe Markup Language (RML)

### Recipe
recipe : (title, list[operations])

### Ingredient Primitives
ingredient : (name, qty, unit)
* name is a string
* qty is a float
* unit is an enum unit {g, tsp, Tbsp, c, mL, unit}

### Cooking Operations
operation : (instruction, time, list[ingredient])
* subset of ingredient

time: (duration, timeunit) OR null
* duration is a float
* timeunit is an enum timeunit {s, min, day}

## Usage

```
cabbage_pancake = ("Cabbage Pancake",
  [
    (pack, null, [heated_oil, pancake_mix]),
    (cook, (6, min), [heated_oil, pancake_mix]),
    (flip, null, [heated_oil, pancake_mix]),
    (cook, (3, min), [heated_oil, pancake_mix])
  ]
)

heated_oil = ("Heated Oil",
  [
    (cook, (1, min), [vegetable_oil]
    )
  ]
)

pancake_mix = ("Cabbage Pancake Mix",
  [
    (combine, null, [
      (slice, null, [(cabbage, 0/5, unit)]),
      (slice, null, [(onion, 1, unit)]),
      ...
    ])
  ]
) 

```

### Building
from the `app` directory, run:

``` shell
$ npm install

$ npm run build
```
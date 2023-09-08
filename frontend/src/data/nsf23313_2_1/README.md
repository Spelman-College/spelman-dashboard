# Demographic characteristics of graduate students, postdoctoral appointees, and doctorate-holding nonfaculty researchers in science, engineering, and health

Table 2-1 @ Source URI [ncses.nsf.gov/pubs/nsf22319](https://ncses.nsf.gov/pubs/nsf22319#section10695)

## Files

### `dcids/`

This holds the lists of DCIDs

`pct.ts`: associated with percentage values.

`values.ts`: associated with numerical values.

### `categories/`

This holds mapping of categories to their associated dimensions.

`pct.ts`: associated with percentages.

`values.ts`: associated with values

### `query/`

Exports a class that can be used to query data using 1 or more `Query` classes.

`ts.ts`: exports `Query_nsf23313_2_1_pct` for querying the `pct` data.

`values.ts`: exports `Query_nsf23313_2_1_values` for querying the `values` data.

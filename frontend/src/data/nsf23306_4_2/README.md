# Median annual salaries of full-time employed college graduates, by sex, major occupation, age, ethnicity, race, disability status, and citizenship status: 2021

Table 4-2 @ Source URI [https://ncses.nsf.gov/surveys/national-survey-college-graduates/2021#data](https://ncses.nsf.gov/surveys/national-survey-college-graduates/2021#data)

## Files

`dcids.ts`: list of DCIDs that are available for this Data Commons dataset.

`categories.ts`: category to respective dimensions mapping in this dataset.

`query.ts`: exports a class named `Query_nsf23306` that enables querying the dataset with one or more `Query` objects.


## NOTE: incompatible query parameters

The following query category pairs return no results because the data does not report at the intersection of these categories. If we check the original data, disability status and citizenship status are columns, alongside ethnicity.

```
disability status, ethnicity

disability status, citizenship

citizenship, ethnicity


```

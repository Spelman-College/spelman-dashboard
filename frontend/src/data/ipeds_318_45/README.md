# Number and percentage distribution of science, technology, engineering, and mathematics (STEM) degrees/certificates conferred by postsecondary institutions, by race/ ethnicity, level of degree/certificate, and sex of student: Academic years 2011-12 through 2020-21

    Table 4-2 @ Source URI [https://nces.ed.gov/ipeds/Search?query=percentage%20of%20STEM%20higher%20degree%20holders%20are%20Black%20women&query2=percentage%20of%20STEM%20higher%20degree%20holders%20are%20Black%20women&resultType=all&page=1&sortBy=date_desc&overlayDigestTableId=202325](https://nces.ed.gov/ipeds/Search?query=percentage%20of%20STEM%20higher%20degree%20holders%20are%20Black%20women&query2=percentage%20of%20STEM%20higher%20degree%20holders%20are%20Black%20women&resultType=all&page=1&sortBy=date_desc&overlayDigestTableId=202325)

## NOTES

### Summary ethnicity removed

Witihn the "ethnicity" category, `AsianOrPacificIslander` is the sum of both `Asian` and `OtherPacificIslander` so we're removing DCIDs with `AsianOrPacificIslander`, as well as the dimension of the same name in the categories files.

### `NonUSResident` counted as total in the "ethnicity" category

The total for a the sum of "ethnicity" includes the `NonUSResident` dimension value. One theory is that the ethnicities are reported only if the subject is a US Resident; if not, their ethnicity is NOT counted as an ethnic background.

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

`ts.ts`: exports `Query_ts` for querying the `pct` data.

`values.ts`: exports `Query_values` for querying the `values` data.

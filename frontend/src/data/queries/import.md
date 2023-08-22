# Importing from CSV

One way to import timeseries data from a CSV of DCIDs associated with dates is using [Pandas](https://pandas.pydata.org/).

```
## install pandas

# install venv
sudo apt install python3.11-venv

# create venv
mkidr -p ~/.venvs
python3 -m venv .venvs/spelman_dashboard

# activate venv
. .venvs/spelman_dashboard/bin/activate

# install pandas and ipython
pip install pandas ipython
```

Use the `frontend/src/data/queries/scripts/import_ts.py` script to load the CSV and emit the timeseries to a `json` file.

```
$ ipython

Python 3.11.4 (main, Jun  7 2023, 10:13:09) [GCC 12.2.0]
Type 'copyright', 'credits' or 'license' for more information
IPython 8.14.0 -- An enhanced Interactive Python. Type '?' for help.

In [1]: import pandas as pd

In [2]: df = pd.read_csv('/home/me/downloads/Tenure 9-26 - processed_csv.csv')

In [3]: df.head()
Out[3]:
    value                                                                                            variableMeasured
0  319400                    dcid:Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree
1  142350            dcid:Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_Tenured
2  120650             dcid:Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_Female
3   44450     dcid:Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_Female_Tenured
4   84950  dcid:Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_Female_WhiteAlone

In [4]: load frontend/src/data/queries/scripts/load_ts.py

...

In [5]: export_ts(df, 'out.json', 'observationDate', 'variableMeasured')


```

That will emit a file named `out.json` which can be used to create the `data/<dataset name>/dcids.ts` file, which includes every DCID in the dataset.

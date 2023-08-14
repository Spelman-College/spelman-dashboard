from collections import defaultdict
import json

def q_in_key(key, *query):
    for q in query:
        if q not in key:
            return False
    return True

def query_dim(keys, *query):
    query = list(map(lambda x: x.lower(), query))
    out = []
    for key in keys:
        if q_in_key(key.lower(), *query):
            out.append(key)
    return out

def emit_dict(df,  date_colname, dcid_colname):
    out = defaultdict(list)
    for ix, row in df.iterrows():
        date, dcid = row[date_colname], row[dcid_colname]
        out[date].append(dcid)
    return out

def export_ts(df, fname, date_colname, dcid_colname):
    out = emit_dict(df, date_colname, dcid_colname)

    # sanity check
    for k, vals in out.items():
        assert len(set(vals)) == len(vals), 'duplicate keys!'

    with open(fname, 'w') as f:
        f.write(json.dumps(out, indent=2))

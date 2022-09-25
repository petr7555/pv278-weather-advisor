import os

import pandas as pd

from extract_section import extract_section

FOLDER = "/Users/petr.janik/Downloads"
STATS = [
    ("Průměrná teplota vzduchu", "AVG"),
    ("Úhrn srážek", "SUM"),
    ("Celková výška sněhové pokrývky", "SUM"),
    ("Doba trvání slunečního svitu", "SUM")
]


def create_json_data():
    months = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen",
              "listopad", "prosinec"]
    cols = ["Rok"] + [f"Hodnota {month}" for month in months]
    renamed_cols = ["year"] + list(range(1, 13))

    for stat, stat_code in STATS:
        for file in [f for f in os.listdir(f"{FOLDER}/{stat}") if f.endswith(".csv")]:
            output_file = extract_section(f"{FOLDER}/{stat}/{file}", "MĚSÍČNÍ DATA")
            df = pd.read_csv(output_file, sep=";")
            df = df[df["Statistika"] == stat_code]
            df = df[cols]
            df.columns = renamed_cols
            json_data = df.to_json(orient="records")
            with open(f"{output_file}.json", "w") as f:
                f.write(json_data)


create_json_data()

import json
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
    cols = [f"Hodnota {month}" for month in months]

    for stat, stat_code in STATS:
        for file in [f for f in os.listdir(f"{FOLDER}/{stat}") if f.endswith(".csv")]:
            monthly_data_file = extract_section(f"{FOLDER}/{stat}/{file}", "MĚSÍČNÍ DATA")
            df = pd.read_csv(monthly_data_file, sep=";", decimal=",")
            df = df[df["Statistika"] == stat_code]
            df = df[cols]
            df = df.mean()
            average_per_months = df.to_list()

            metadata_file = extract_section(f"{FOLDER}/{stat}/{file}", "METADATA")
            df = pd.read_csv(metadata_file, sep=";", decimal=",")
            name = df["Jméno stanice"].iloc[-1]
            latitude = df["Zeměpisná šířka"].iloc[-1]
            longitude = df["Zeměpisná délka"].iloc[-1]

            result = {
                "name": name,
                "latitude": latitude,
                "longitude": longitude,
                "averagePerMonths": average_per_months
            }
            with open(f"{monthly_data_file}.json", "w") as f:
                json.dump(result, f, indent=2)


create_json_data()

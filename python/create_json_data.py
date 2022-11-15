import json
import os
import re

import pandas as pd

from extract_section import extract_section

FOLDER = "/Users/petr.janik/Downloads"
STATS = [
    ("Průměrná teplota vzduchu", "AVG", "temperature"),
    ("Doba trvání slunečního svitu", "SUM", "sunshine"),
    ("Úhrn srážek", "SUM", "precipitation"),
    ("Celková výška sněhové pokrývky", "MAX", "snow"),
]


def create_json_data():
    months = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen",
              "listopad", "prosinec"]
    cols = [f"Hodnota {month}" for month in months]

    result = {}

    for stat, stat_code, dict_stat_key in STATS:
        csv_files = [f for f in os.listdir(f"{FOLDER}/{stat}") if re.match(r".+\.csv(\.\d)?$", f)]
        main_files = [f for f in csv_files if re.match(r".+\.csv$", f)]
        grouped_files = {}
        for main_file in main_files:
            grouped_files[main_file] = [f for f in csv_files if re.match(rf"{main_file}(\.\d)?$", f)]
        for files in grouped_files.values():
            merged_df = pd.DataFrame()
            for file in files:
                file_name = f"{FOLDER}/{stat}/{file}"
                monthly_data_file = extract_section(file_name, "MĚSÍČNÍ DATA")
                df = pd.read_csv(monthly_data_file, sep=";", decimal=",")
                if len(df[df["Statistika"] == stat_code]) == 0:
                    print(f"Skipping {file_name}, it does not have {stat_code} for {stat}.")
                    continue
                df = df[df["Statistika"] == stat_code]
                df = df[cols]
                merged_df = pd.concat([merged_df, df])
            # mean over all years
            merged_df = merged_df.mean()
            average_per_months = merged_df.to_list()

            metadata_file = extract_section(f"{FOLDER}/{stat}/{files[0]}", "METADATA")
            df = pd.read_csv(metadata_file, sep=";", decimal=",")
            name = df["Jméno stanice"].iloc[-1]
            latitude = df["Zeměpisná šířka"].iloc[-1]
            longitude = df["Zeměpisná délka"].iloc[-1]

            if name not in result:
                result[name] = {
                    "name": name,
                    "latitude": latitude,
                    "longitude": longitude,
                }
            assert result[name]["latitude"] == latitude
            assert result[name]["longitude"] == longitude
            assert dict_stat_key not in result[name]
            result[name][dict_stat_key] = average_per_months

    # remove stations that do not have all statistics
    for key in list(result.keys()):
        if len(result[key]) != 3 + len(STATS):
            print(f"Skipping {key}, it does not have all statistics.")
            del result[key]

    with open(f"locations.json", "w") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)


create_json_data()

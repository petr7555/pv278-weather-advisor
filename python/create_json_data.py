import json
import math
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

lengths_of_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


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

            # convert hours per month to hours per day
            if dict_stat_key == "sunshine":
                average_per_months = [x / days_in_month for x, days_in_month in
                                      zip(average_per_months, lengths_of_months)]

            metadata_file = extract_section(f"{FOLDER}/{stat}/{files[0]}", "METADATA")
            df = pd.read_csv(metadata_file, sep=";", decimal=",")
            location_id = df["Stanice ID"].iloc[-1]
            name = df["Jméno stanice"].iloc[-1]
            latitude = df["Zeměpisná šířka"].iloc[-1]
            longitude = df["Zeměpisná délka"].iloc[-1]

            if location_id not in result:
                result[location_id] = {
                    "id": location_id,
                    "name": name,
                    "latitude": latitude,
                    "longitude": longitude,
                }
            assert result[location_id]["latitude"] == latitude
            assert result[location_id]["longitude"] == longitude
            assert dict_stat_key not in result[location_id]
            result[location_id][dict_stat_key] = average_per_months

    # remove stations that do not have all statistics
    for key in list(result.keys()):
        if len(result[key]) != 4 + len(STATS):
            print(f"Skipping {key}, it does not have all statistics.")
            del result[key]
    # remove stations that have NaN values
    for key in list(result.keys()):
        for _, _, stat in STATS:
            if any([math.isnan(x) for x in result[key][stat]]):
                print(f"Skipping {key}, it has NaN values.")
                del result[key]
                break

    with open(f"locations.json", "w") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)


create_json_data()

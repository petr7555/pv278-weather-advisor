import os
import shutil
import time
from tempfile import TemporaryDirectory
from zipfile import ZipFile

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

MONTHLY_DATA_URL = "https://www.chmi.cz/historicka-data/pocasi/mesicni-data/mesicni-data-dle-z.-123-1998-Sb"
STATS = ["Průměrná teplota vzduchu", "Úhrn srážek", "Celková výška sněhové pokrývky", "Doba trvání slunečního svitu"]
REGION_CSS_SELECTOR = "td a"
LOCATION_CSS_SELECTOR = "td:first-child a"
DOWNLOADS_FOLDER = "/Users/petr.janik/Downloads"
NUMBER_OF_REGIONS = 14


def create_dir(path, remove_if_exists=False):
    if os.path.exists(path):
        if remove_if_exists:
            shutil.rmtree(path)
        else:
            return
    os.makedirs(path)


def move_unzip_decode_downloaded_files(source_dir, stat):
    dest_dir = f"{source_dir}/{stat}"
    create_dir(dest_dir)
    downloaded_files = [file for file in os.listdir(source_dir) if "csv" in file and "zip" in file]
    for file in downloaded_files:
        src_file = f"{source_dir}/{file}"
        with TemporaryDirectory() as tmp_dir:
            with ZipFile(src_file, 'r') as zipped_file:
                zipped_file.extractall(tmp_dir)
                extracted_file = zipped_file.namelist()[0]
                new_name = extracted_file
                i = 1
                while new_name in os.listdir(dest_dir):
                    new_name = f"{extracted_file}.{i}"
                    i += 1
                shutil.move(f"{tmp_dir}/{extracted_file}", f"{dest_dir}/{new_name}")

        os.remove(src_file)
    os.system(f"cd '{dest_dir}' && enca -L czech * -x utf8")


# locations_per_region = 2
regions_per_stat = 2
locations_per_region = "ALL"
# regions_per_stat = "ALL"
start_at_region = 2


def scrape_data():
    driver = webdriver.Firefox(options={})
    driver.get(MONTHLY_DATA_URL)
    driver.find_element(By.LINK_TEXT, "Rozumím").click()

    for stat in STATS:
        print(stat)
        driver.find_element(By.LINK_TEXT, stat).click()

        for i in range(start_at_region, NUMBER_OF_REGIONS):
            print("\tregion", i)
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, REGION_CSS_SELECTOR)))
            driver.find_elements(By.CSS_SELECTOR, REGION_CSS_SELECTOR)[i].click()

            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, LOCATION_CSS_SELECTOR)))
            locations = driver.find_elements(By.CSS_SELECTOR, LOCATION_CSS_SELECTOR)
            for loc_idx, location in enumerate(locations):
                print("\t\tlocation", loc_idx)
                location.click()
                time.sleep(1)
                if locations_per_region != "ALL" and loc_idx == locations_per_region - 1:
                    break
            driver.find_element(By.LINK_TEXT, "Zpět na seznam krajů").click()
            if regions_per_stat != "ALL" and i == start_at_region + regions_per_stat - 1:
                break
        driver.find_element(By.LINK_TEXT, "Zpět na úvodní stránku").click()

        move_unzip_decode_downloaded_files(DOWNLOADS_FOLDER, stat)

    driver.close()


scrape_data()

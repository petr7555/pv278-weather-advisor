import os
import shutil
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from zipfile import ZipFile

MONTHLY_DATA_URL = "https://www.chmi.cz/historicka-data/pocasi/mesicni-data/mesicni-data-dle-z.-123-1998-Sb"
STATS = ["Průměrná teplota vzduchu", "Úhrn srážek", "Celková výška sněhové pokrývky", "Doba trvání slunečního svitu"]
REGION_CSS_SELECTOR = "td a"
LOCATION_CSS_SELECTOR = "td:first-child a"
DOWNLOADS_FOLDER = "/Users/petr.janik/Downloads"
NUMBER_OF_REGIONS = 14


def create_dir(path):
    if os.path.exists(path):
        shutil.rmtree(path)
    os.makedirs(path)


def move_unzip_decode_downloaded_files(source_dir, stat):
    dest_dir = f"{source_dir}/{stat}"
    create_dir(dest_dir)
    downloaded_files = [file for file in os.listdir(source_dir) if file.endswith(".csv.zip")]
    for file in downloaded_files:
        src_file = f"{source_dir}/{file}"
        with ZipFile(src_file, 'r') as zipped_file:
            zipped_file.extractall(dest_dir)
        os.remove(src_file)
    os.system(f"cd '{dest_dir}' && enca -L czech * -x utf8")


def scrape_data():
    driver = webdriver.Firefox()
    driver.get(MONTHLY_DATA_URL)
    driver.find_element(By.LINK_TEXT, "Rozumím").click()

    for stat in STATS:
        print(stat)
        driver.find_element(By.LINK_TEXT, stat).click()

        for i in range(NUMBER_OF_REGIONS):
            print("\tregion", i)
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, REGION_CSS_SELECTOR)))
            driver.find_elements(By.CSS_SELECTOR, REGION_CSS_SELECTOR)[i].click()

            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, LOCATION_CSS_SELECTOR)))
            locations = driver.find_elements(By.CSS_SELECTOR, LOCATION_CSS_SELECTOR)
            for loc_idx, location in enumerate(locations):
                print("\t\tlocation", loc_idx)
                location.click()
                time.sleep(1)
                # TODO remove to get all data
                break
            driver.find_element(By.LINK_TEXT, "Zpět na seznam krajů").click()
            # TODO remove to get all data
            break
        driver.find_element(By.LINK_TEXT, "Zpět na úvodní stránku").click()

        move_unzip_decode_downloaded_files(DOWNLOADS_FOLDER, stat)

    driver.close()


scrape_data()

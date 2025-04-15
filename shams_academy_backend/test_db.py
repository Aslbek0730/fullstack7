import os
import psycopg2

try:
    conn = psycopg2.connect(
        dbname="shams_academy",
        user="postgres",
        password="postgres",
        host="localhost",
        port="5432",
        client_encoding='utf8'
    )
    print("Successfully connected to the database!")
    conn.close()
except Exception as e:
    print(f"Error: {e}") 
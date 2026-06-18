from dotenv import load_dotenv
from pathlib import Path
from typing import cast
import os

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set")

secret_key = os.getenv("SECRET_KEY")
if secret_key is None:
    raise ValueError("SECRET_KEY environment variable is not set")
SECRET_KEY = cast(str, secret_key)

ALGORITHM = os.getenv("ALGORITHM", "HS256")

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
)
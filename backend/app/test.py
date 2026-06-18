from jose import jwt

token = jwt.encode(
    {"sub": "123"},
    "secret",
    algorithm="HS256"
)

print(token)
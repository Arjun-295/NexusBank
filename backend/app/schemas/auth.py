from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str | None = None
    phone: str

class UserRead(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str | None = None
    phone: str | None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class LoginRequest(BaseModel):
    email: str
    password: str
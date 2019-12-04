from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class DB_Model(db.Model):
    __tablename__ = "sqlalchemy_DB"
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(100))

    def __init__(self, id, address):
        self.id = id
        self.address = address

    @property
    def get_jsonAddress(self):
        return{
            'id': self.id,
            'address': self.address
        }

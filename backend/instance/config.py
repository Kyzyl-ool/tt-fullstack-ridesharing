class Config:

    def __init__(self):
        self.DB_HOST = 'localhost'
        self.DB_HOST = '51.15.247.52'
        self.DB_USER = 'postgres'
        self.DB_PASSWORD = 'toor'
        self.DB_PORT = '5432' # TODO: change to your port
        self.DB_NAME = 'template1'
        self.DEBUG = True
        self.SERVER_NAME = 'localhost:5000'
        self.secret_key = '9vKmVjcZ3I0U3oHkZEmc'
        self.PRESERVE_CONTEXT_ON_EXCEPTION = False
        self.SQLALCHEMY_TRACK_MODIFICATIONS = False

    def _init_uri(self):
        self.DB_URI = 'postgresql://{user}:{password}@{host}:{port}/{db_name}'.format(
            user=self.DB_USER, password=self.DB_PASSWORD, host=self.DB_HOST, port=self.DB_PORT, db_name=self.DB_NAME
        )
        self.DB_URI_NODB = 'postgresql://{user}:{password}@{host}:{port}/'.format(
            user=self.DB_USER, password=self.DB_PASSWORD, host=self.DB_HOST, port=self.DB_PORT
        )


class DevelopmentConfig(Config):
    def __init__(self):
        super(DevelopmentConfig, self).__init__()
        self.DB_NAME = 'ridesharing_dev'
        self.TESTING = False
        self.DEBUG = True
        self._init_uri()


class TestConfig(Config):

    def __init__(self):
        super(TestConfig, self).__init__()
        self.DB_NAME = 'ridesharing_test'
        self.TESTING = True
        self.DEBUG = True
        self._init_uri()


class ProductionConfig(Config):

    def __init__(self):
        super(ProductionConfig, self).__init__()
        self.DB_NAME = 'ridesharing_prod'
        self.DEBUG = False
        self.TESTING = False
        self._init_uri()


configs = {
    'general': Config(),
    'test': TestConfig(),
    'dev': DevelopmentConfig(),
    'prod': ProductionConfig(),
}

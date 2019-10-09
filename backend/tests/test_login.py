from flask import url_for
from flask_testing import TestCase
from model import User
from utils.misc import generate_random_person
from app import db, create_app
from utils.exceptions import ResponseExamples


class LoginTests(TestCase):

    def create_app(self):
        return create_app('test')

    def _add_user_with_password(self, password):
        person = generate_random_person()
        name, surname, email = person.name(), person.surname(), person.email()
        user = User(name=name, surname=surname, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return email, password

    def setUp(self) -> None:
        self.app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = False
        db.session.close()
        db.drop_all()
        db.create_all()

    def test_incorrect_login(self):
        from views import login
        url = url_for('.'+login.__name__)
        email, password = self._add_user_with_password('1234')
        login_result = self.client.post(url,
                                        data={'email': email,
                                              # Here we add extra char
                                              'password': password + '1'})
        correct_answer = ResponseExamples.INCORRECT_LOGIN
        self.assert400(login_result)
        self.assertEqual(login_result.get_json(), correct_answer)

    def test_user_gets_cookies_after_login(self):
        from views import login
        # Create user
        email, password = self._add_user_with_password('1234')
        url = url_for('.'+login.__name__)
        result = self.client.post(url, data={'email': email, 'password': password})
        cookies = result.headers['Set-Cookie']
        self.assertTrue(len(cookies) > 0, "Didn't receive any cookies")

    def test_correct_login_status_code(self):
        from views import login
        url = url_for('.'+login.__name__)
        email, password = self._add_user_with_password('1234')
        login_result = self.client.post(url, data={'email': email, 'password': password})
        self.assert200(login_result)

    def test_correct_login_returns_user_id(self):
        from views import login
        url = url_for('.'+login.__name__)
        email, password = self._add_user_with_password('1234')
        user_id = db.session.query(User).filter(User.email == email).first().id
        login_result = self.client.post(url, data={'email': email, 'password': password})
        correct_answer = ResponseExamples.USER_ID
        correct_answer['user_id'] = user_id
        self.assertEqual(login_result.get_json(), correct_answer)

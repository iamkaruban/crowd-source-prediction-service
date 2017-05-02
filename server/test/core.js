// npm packages
import request from 'supertest';

// our packages
import app from '../src/app';

export default (test) => {
  test('GET /', (t) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end((err, res) => {
        const expectedBody = 'Hello world!';
        const actualBody = res.text;

        t.error(err, 'No error');
        t.equal(actualBody, expectedBody, 'Retrieve body');
        t.end();
      });
  });

  test('404 on nonexistant URL', (t) => {
    request(app)
      .get('/GETShouldFailOnRandomURL')
      .expect(404)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        const expectedBody = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /GETShouldFailOnRandomURL</pre>\n</body>\n</html>\n';
        const actualBody = res.text;

        t.error(err, 'No error');
        t.equal(actualBody, expectedBody, 'Retrieve body');
        t.end();
      });
  });
}

const http = require('http');

function request(method, path, data = null, token = null) {
  return new Promise((resolve) => {
    const opts = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    };

    if (data) {
      const jsonData = JSON.stringify(data);
      opts.headers['Content-Length'] = Buffer.byteLength(jsonData);
    }

    const req = http.request(opts, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body)
          });
        } catch {
          resolve({
            status: res.statusCode,
            data: body
          });
        }
      });
    });

    req.on('error', (err) => {
      resolve({ status: 0, error: err.message });
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function test() {
  console.log('Testing /me endpoint...\n');

  // Step 1: Signup
  const signup = await request('POST', '/api/auth/signup', {
    name: 'Test User',
    email: 'testuser' + Date.now() + '@test.com',
    password: 'testpass123',
    role: 'user'
  });

  if (signup.status !== 201) {
    console.log('Signup failed');
    console.log(JSON.stringify(signup, null, 2));
    return;
  }

  const token = signup.data.token;
  const userId = signup.data.user.id;

  console.log('✅ User created');
  console.log('   ID:', userId);
  console.log('   Token:', token.substring(0, 40) + '...');

  // Step 2: Get /me
  console.log('\nCalling GET /api/auth/me...');
  const me = await request('GET', '/api/auth/me', null, token);

  console.log('Status:', me.status);
  console.log('Full Response:');
  console.log(JSON.stringify(me.data, null, 2));
}

test().catch(console.error);

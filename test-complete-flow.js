const http = require('http');

// Test results tracker
const results = {
  passed: [],
  failed: []
};

function request(method, path, data, token = null) {
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
      opts.headers['Content-Length'] = JSON.stringify(data).length;
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

async function runTests() {
  console.log('\n🧪 COMPLETE FLOW TEST SUITE\n');
  console.log('═'.repeat(60));

  // TEST 1: Regular User Signup
  console.log('\n[1] User Signup');
  const userSignup = await request('POST', '/api/auth/signup', {
    name: 'John User',
    email: 'johnuser@test.com',
    password: 'user123',
    role: 'user'
  });
  
  if (userSignup.status === 201 && userSignup.data.token) {
    console.log('✅ PASS - Status:', userSignup.status);
    console.log('   Token received:', userSignup.data.token.substring(0, 30) + '...');
    console.log('   User role:', userSignup.data.user.role);
    results.passed.push('User Signup');
  } else {
    console.log('❌ FAIL - Status:', userSignup.status);
    results.failed.push('User Signup');
  }

  const userToken = userSignup.data?.token;

  // TEST 2: User Login
  console.log('\n[2] User Login');
  const userLogin = await request('POST', '/api/auth/login', {
    email: 'johnuser@test.com',
    password: 'user123'
  });

  if (userLogin.status === 200 && userLogin.data.token) {
    console.log('✅ PASS - Status:', userLogin.status);
    console.log('   Token received:', userLogin.data.token.substring(0, 30) + '...');
    results.passed.push('User Login');
  } else {
    console.log('❌ FAIL - Status:', userLogin.status, userLogin.data?.message);
    results.failed.push('User Login');
  }

  // First, create/get an admin account
  console.log('\n[2A] Admin Signup (for job creation test)');
  const adminSignup = await request('POST', '/api/auth/signup', {
    name: 'Admin User',
    email: 'admin' + Date.now() + '@test.com',
    password: 'admin123',
    role: 'admin'
  });

  let adminToken = null;
  if (adminSignup.status === 201 && adminSignup.data.token) {
    adminToken = adminSignup.data.token;
    console.log('✅ Admin account created');
  } else if (adminSignup.status === 409) {
    // Admin already exists, login instead
    console.log('✅ Admin already exists, attempting login');
    const adminLogin = await request('POST', '/api/auth/login', {
      email: 'admin001@test.com',
      password: 'admin123'
    });
    adminToken = adminLogin.data?.token;
  }

  // TEST 3: Create Job (Admin Only)
  console.log('\n[3] Admin Create Job');
  if (!adminToken) {
    console.log('⚠️  Skipping - No admin token available');
    results.failed.push('Admin Create Job');
  } else {
  
    const jobData = {
      title: 'Frontend Developer Internship',
      description: 'Build React applications with modern JavaScript',
      skills: ['React', 'JavaScript', 'HTML', 'CSS'],
      type: 'Internship',
      role: 'Frontend Developer',
      location: 'Remote',
      stipend: 50000,
      duration: '3 months'
    };

    const createJob = await request('POST', '/api/jobs', jobData, adminToken);

    if (createJob.status === 201 && createJob.data.data) {
      console.log('✅ PASS - Status:', createJob.status);
      console.log('   Job created:', createJob.data.data.title);
      console.log('   Job ID:', createJob.data.data._id);
      results.passed.push('Admin Create Job');
    } else {
      console.log('❌ FAIL - Status:', createJob.status);
      console.log('   Response:', createJob.data?.message || createJob.data);
      results.failed.push('Admin Create Job');
    }
  }

  const jobId = null;  // Will be set by job creation
  if (adminToken && results.passed.includes('Admin Create Job')) {
    const jobData = {
      title: 'Backend Developer Internship',
      description: 'Build Node.js APIs',
      skills: ['Node.js', 'Express', 'MongoDB'],
      type: 'Internship',
      role: 'Backend Developer',
      location: 'Remote',
      stipend: 60000,
      duration: '3 months'
    };
    const getJobs = await request('GET', '/api/jobs', null);
    if (getJobs.status === 200 && getJobs.data.jobs?.length > 0) {
      jobId = getJobs.data.jobs[0]._id;
    }
  }

  // TEST 4: Get All Jobs
  console.log('\n[4] Fetch All Jobs');
  const getAllJobs = await request('GET', '/api/jobs', null);

  if (getAllJobs.status === 200 && Array.isArray(getAllJobs.data.jobs)) {
    console.log('✅ PASS - Status:', getAllJobs.status);
    console.log('   Jobs found:', getAllJobs.data.jobs.length);
    if (getAllJobs.data.jobs.length > 0) {
      console.log('   First job:', getAllJobs.data.jobs[0].title);
    }
    results.passed.push('Fetch All Jobs');
  } else {
    console.log('❌ FAIL - Status:', getAllJobs.status);
    results.failed.push('Fetch All Jobs');
  }

  // TEST 5: Get Single Job
  if (jobId) {
    console.log('\n[5] Fetch Single Job');
    const getJob = await request('GET', `/api/jobs/${jobId}`, null);

    if (getJob.status === 200 && getJob.data.data) {
      console.log('✅ PASS - Status:', getJob.status);
      console.log('   Job title:', getJob.data.data.title);
      console.log('   Job type:', getJob.data.data.type);
      results.passed.push('Fetch Single Job');
    } else {
      console.log('❌ FAIL - Status:', getJob.status);
      results.failed.push('Fetch Single Job');
    }
  }

  // TEST 6: Apply for Job (User)
  if (jobId && userToken) {
    console.log('\n[6] User Apply for Job');
    const applyJob = await request('POST', '/api/applications', {
      jobId: jobId,
      resumeLink: 'https://example.com/resume.pdf',
      coverNote: 'I am interested in this internship!'
    }, userToken);

    if (applyJob.status === 201 && applyJob.data.data) {
      console.log('✅ PASS - Status:', applyJob.status);
      console.log('   Application created:', applyJob.data.data._id);
      console.log('   Status:', applyJob.data.data.status);
      results.passed.push('User Apply for Job');
    } else {
      console.log('❌ FAIL - Status:', applyJob.status);
      console.log('   Response:', applyJob.data?.message || applyJob.data);
      results.failed.push('User Apply for Job');
    }
  }

  // TEST 7: Get User's Applications
  if (userToken) {
    console.log('\n[7] Fetch User Applications');
    const userApps = await request('GET', '/api/applications/me', null, userToken);

    if (userApps.status === 200 && Array.isArray(userApps.data.data)) {
      console.log('✅ PASS - Status:', userApps.status);
      console.log('   Applications found:', userApps.data.data.length);
      results.passed.push('Fetch User Applications');
    } else {
      console.log('❌ FAIL - Status:', userApps.status);
      results.failed.push('Fetch User Applications');
    }
  }

  // TEST 8: Get Current User Info
  if (userToken) {
    console.log('\n[8] Fetch Current User Info');
    const userMe = await request('GET', '/api/auth/me', null, userToken);

    if (userMe.status === 200 && userMe.data.data) {
      console.log('✅ PASS - Status:', userMe.status);
      console.log('   User name:', userMe.data.data.name);
      console.log('   User role:', userMe.data.data.role);
      results.passed.push('Fetch User Info');
    } else {
      console.log('❌ FAIL - Status:', userMe.status);
      results.failed.push('Fetch User Info');
    }
  }

  // FINAL SUMMARY
  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 TEST SUMMARY');
  console.log('✅ Passed:', results.passed.length);
  results.passed.forEach(t => console.log('   •', t));
  console.log('\n❌ Failed:', results.failed.length);
  results.failed.forEach(t => console.log('   •', t));
  
  const total = results.passed.length + results.failed.length;
  const percentage = Math.round((results.passed.length / total) * 100);
  console.log('\n🎯 Overall: ' + results.passed.length + '/' + total + ' (' + percentage + '%)');
  console.log('\n' + '═'.repeat(60) + '\n');
}

runTests().catch(console.error);

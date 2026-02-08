# ⚙️ MongoDB Atlas Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create MongoDB Account
1. Go to: `https://www.mongodb.com/cloud/atlas`
2. Click "Sign Up Free"
3. Create account with email
4. Verify email

### Step 2: Create a Cluster
1. After login, click "Create" button
2. Select "M0 FREE" tier
3. Choose your preferred region (closest to you)
4. Click "Create Cluster"
5. Wait 1-3 minutes for cluster to be ready

### Step 3: Create Database User
1. In left sidebar, click "Security" → "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `jobapp_user` (or any name)
5. Password: Create a strong password (save it!)
6. Click "Add User"

### Step 4: Whitelist Your IP
1. In left sidebar, click "Security" → "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Databases" section
2. Click your cluster's "Connect" button
3. Choose "Connect your application"
4. Select "Node.js" as driver
5. Copy the connection string
6. It will look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/job-app?retryWrites=true&w=majority
```

### Step 6: Update .env File
1. Open `backend/.env`
2. Replace this line:
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/job-app?retryWrites=true&w=majority
```

With your actual connection string, replacing:
- `YOUR_USERNAME` → Your database user (e.g., `jobapp_user`)
- `YOUR_PASSWORD` → Your password (URL encode special chars: `!` → `%21`, `@` → `%40`)
- `cluster0.xxxxx` → Your cluster name from MongoDB

### Example
```
MONGODB_URI=mongodb+srv://jobapp_user:MyPassword123@cluster0.abcde.mongodb.net/job-app?retryWrites=true&w=majority
```

### Step 7: Test Connection
```bash
cd backend
npm run dev
```

You should see:
```
Server is running on port 5000
MongoDB Connected: cluster0.abcde.mongodb.net
```

---

## 🆘 Password Encoding

If your password contains special characters, encode them:

| Character | Encode As |
|-----------|-----------|
| ! | %21 |
| @ | %40 |
| # | %23 |
| $ | %24 |
| % | %25 |
| & | %26 |
| * | %2A |
| ( | %28 |
| ) | %29 |

**Example:** If password is `Pass@123!` → Use `Pass%40123%21`

---

## ✅ Success Indicators

When MongoDB is connected, you should see:
```
Server is running on port 5000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

**Then in another terminal:**
```
cd frontend
npm run dev
```

Open `http://localhost:3000` and test the app!

---

## 🔗 Useful Links

- MongoDB Atlas: https://mongodb.com/cloud/atlas
- Connection String Reference: https://docs.mongodb.com/manual/reference/connection-string/
- Mongoose Guide: https://mongoosejs.com/

---

**Once connected, your app is ready to use!** 🎉

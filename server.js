const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'your-secret-key-2024';
const EXPIRES_IN = '7d';

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

server.use(jsonServer.bodyParser);

server.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  const db = router.db;
  const users = db.get('users').value();
  
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { 
    id: Date.now().toString(), 
    email, 
    password: hashedPassword, 
    name: name || email.split('@')[0] 
  };
  db.get('users').push(newUser).write();
  
  const token = jwt.sign({ id: newUser.id, email }, SECRET_KEY, { expiresIn: EXPIRES_IN });
  res.json({ accessToken: token, user: { id: newUser.id, email, name: newUser.name } });
});

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const users = db.get('users').value();
  
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: user.id, email }, SECRET_KEY, { expiresIn: EXPIRES_IN });
  res.json({ accessToken: token, user: { id: user.id, email, name: user.name } });
});

server.get('/items', (req, res) => {
  const db = router.db;
  const items = db.get('items').value();
  res.json(items);
});

server.use(/^(?!\/login|\/register|\/items$).*$/, (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

server.use(router);
server.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});

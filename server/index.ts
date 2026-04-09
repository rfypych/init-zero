import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 1. SQL Injection Setup ---
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE users (id INT, username TEXT, password TEXT, role TEXT)");
  db.run("INSERT INTO users VALUES (1, 'admin', 'SuperSecretAdminP@ssw0rd123!', 'admin')");
  db.run("INSERT INTO users VALUES (2, 'guest', 'guest', 'user')");
  db.run("INSERT INTO users VALUES (3, 'flag_holder', 'INIT0{SQLM4p_Or_Bust}', 'user')");
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // VULNERABLE QUERY: String Concatenation directly from user input
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.get(query, (err, row: any) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    if (row) {
      res.json({ success: true, user: { username: row.username, role: row.role }, flag: row.username === 'admin' ? "INIT0{Un10n_B4s3d_M4st3r}" : null, raw_query: query });
    } else {
      res.status(401).json({ error: "Invalid credentials", raw_query: query });
    }
  });
});

// --- 2. Command Injection Setup ---
app.post('/api/ping', (req, res) => {
  const { ip } = req.body;

  if (!ip) {
      return res.status(400).json({ error: "IP is required" });
  }

  // VULNERABLE COMMAND EXECUTION: Passing input directly to bash
  const command = `ping -c 1 ${ip}`;

  exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
    // We intentionally return the output even if there's an error code (like when injecting commands)
    const output = stdout || stderr || (error ? error.message : "Unknown error");

    // Simulate finding a flag file if 'ls' or 'cat' is used successfully
    let simulatedOutput = output;
    if (command.includes('ls')) {
       simulatedOutput += "\nflag.txt\nindex.js\nserver.js\n";
    }
    if (command.includes('cat flag.txt')) {
       simulatedOutput += "\nINIT0{RCE_V1a_P1ng_Ut1l}\n";
    }

    res.json({ command_executed: command, output: simulatedOutput });
  });
});

// --- 3. Directory Traversal Setup ---
app.get('/api/read', (req, res) => {
  const filename = req.query.file as string;

  if (!filename) {
      return res.status(400).json({ error: "File parameter missing" });
  }

  // VULNERABLE PATH RESOLUTION: No sanitization of ../
  const basePath = path.join(__dirname, 'public_files');
  const requestedPath = path.join(basePath, filename);

  // We simulate reading sensitive files for safety, but the path traversal logic is real
  if (filename.includes('etc/passwd')) {
     return res.send("root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nINIT0{P4th_Tr4v3rs4l_M4st3r}");
  }

  // Try to read real files relative to server dir
  try {
     const data = fs.readFileSync(requestedPath, 'utf8');
     res.send(data);
  } catch (err: any) {
     res.status(404).send(`File not found: ${requestedPath}`);
  }
});


app.listen(port, () => {
  console.log(`Vulnerable API Backend listening on port ${port}`);
});

const express=require('express')
const cors=require('cors')
const mysql=require('mysql2')
const bodyParser=require('body-parser')


const app=express()
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const db=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'21@AishuJeev',
    database:'practice'
})

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});


app.post('/add',(req,res)=>{
  const { firstName, lastName, eId, email, phone, department, doj, role } = req.body;
  console.log('Received Data:', req.body);

  const checkQuery = 'SELECT * FROM employee WHERE email = ? OR eId = ?';
    db.query(checkQuery, [email, eId], (err, results) => {
      if (err) {
        console.error('Error during SELECT query:', err); // Log the error
        return res.status(500).json({ error: 'Database error during SELECT query' });
      }
  
      console.log('SELECT Query Results:', results);
  
      if (results.length > 0) {
        console.log('Duplicate Entry Detected');
        return res.status(400).json({ error: 'Email or Employee ID already exists' });
      }
        
        const insertQuery = 'INSERT INTO employee (eId,firstName,lastName,email,phone,dept,doj,workrole) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(insertQuery, [eId, firstName,lastName, email, phone, department, doj, role], (err) => {

            if (err){
              console.error('Error during INSERT query:', err); 
              return res.status(500).json({ error: 'Database error' });
          
            } 
            console.log('Data inserted successfully');
            res.status(200).json({ message: 'Employee added successfully' });
        });
    });
})

app.get('/employees', (req, res) => {
  const fetchQuery = 'SELECT * FROM employee';
  db.query(fetchQuery, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ error: 'Failed to fetch employees' });
    }
    res.status(200).json(results);
  });
});

app.listen(8000, () => {
    console.log(`Server is running`);
});


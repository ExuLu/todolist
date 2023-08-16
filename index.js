import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
let isItWork = false;

let todaysTasks = [
  'Buy fruits for smoothies in the grocery shop',
  'Feed a Kitty',
];
const workTasks = ['Make a call'];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.ejs', {
    tasks: todaysTasks,
  });
});

app.get('/work', (req, res) => {
  res.render('index.ejs', {
    tasks: workTasks,
  });
});

app.post('/submit', (req, res) => {
  let newTask = req.body.newtask;
  if (!isItWork) {
    todaysTasks.push(newTask);
    res.redirect('./');
  } else {
    workTasks.push(newTask);
    res.redirect('./work');
  }
});

app.post('/work', (req, res) => {
  isItWork = true;
  res.render('index.ejs', {
    tasks: workTasks,
  });
});

app.post('/everyday', (req, res) => {
  //   console.log(req.body);
  isItWork = false;
  res.redirect('./');
});

// app.post('/check', (req, res) => {
//   console.log(req.body.checkbox);
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/* 
1) create array with tasks
2) add massive to the EJS file
3) with help of EventHanldler add new tasks to massive
4) show new massive on the screen (upload server)
    4.1) it can be single function to add something to massive
5) when you click on the checkbox it "closes" your task
    5.1) google to know how to cross out text
6) add second page to the list with work tasks
    6.1) create new array for work tasks
7) depending on route show to the client two versions of lists
*/

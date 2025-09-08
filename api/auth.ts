import pluggy from '@api/pluggy';

pluggy.authCreate({
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));;

/*export default function handler(req, res) {
  const options = {
  method: 'POST',
  headers: {accept: 'application/json', 'content-type': 'application/json'},
  body: JSON.stringify({
    clientId: '7cc5a05b-4f2f-4001-bb71-c1e8eed47dcf',
    clientSecret: 'f9fbb78c-92db-4eda-ab94-6402339df857'
  })
};

fetch('https://api.pluggy.ai/auth', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
  res.status(200).json({ message: 'BACKEND EBAAA!' });
}

*/
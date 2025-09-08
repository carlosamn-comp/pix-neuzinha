import pluggy from '@api/pluggy';


export default function handler(req, res) {
  res.status(200).json({ message: 'BACKEND EBAAA!' });
}


pluggy.authCreate({
  clientId: '7cc5a05b-4f2f-4001-bb71-c1e8eed47dcf',
  clientSecret: 'f9fbb78c-92db-4eda-ab94-6402339df857'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
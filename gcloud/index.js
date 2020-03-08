const Datastore = require("@google-cloud/datastore")
const datastore = new Datastore({
    projectId:'atlantean-field-270420',
    keyFilename: 'datastore-credential.json'
});


exports.addDay = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {

        let log = req.query.log || req.body.log || '';
        let email = req.body.params.email || '';



        console.log("getting user")
        const userKey = datastore.key(['User', email]);
        const [entity] = await datastore.get(userKey);

        console.log("setting up day data")

        const dayKey = datastore.key(['Day']);

        const day = entity.dayNumber + 1;

        const dayData = {
            User: email,
            dayNumber: day,
            spending: req.body.params.spending,
            spendingBudget: entity.spendingBudget,
            savingsBudget: entity.savingsBudget
        }

        const dayEntity = {
            key: dayKey,
            data: dayData
        }

        console.log("creating day")
        await datastore.insert(dayEntity);

        console.log("calculating totals")
        const total = entity.total + entity.salary - req.body.params.spending;

        console.log("setting up user data")
        const userData = {
            dayNumber: day,
            savingsBudget: entity.savingsBudget,
            spendingBudget: entity.spendingBudget,
            salary: entity.salary,
            total: total
        }

        const userEntity = {
            key: userKey,
            data: userData
        }

        console.log("updating user data")
        await datastore.update(userEntity);

        res.status(200).json(userEntity).send(log);
    }
};


const Datastore = require("@google-cloud/datastore")
const datastore = new Datastore({
    projectId:'atlantean-field-270420',
    keyFilename: 'datastore-credential.json'
});

exports.getAllDays = async (req, res) => {
  console.log(req.body)
	//retrieve data for all of the days the user the played the game
  	console.log(res);
  	res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
      	console.log("in if");
    } else {
    	let log = req.query.log || req.body.log || '';	
        let email = req.body.params.email || '';
        const query = datastore.createQuery('Day').filter('User', '=', email);
        log = await datastore.runQuery(query).then(results => {
          res.json(results)
          console.log("results: ")
          console.log(results)
        })
          .catch(err => {console.error('error: ', err);});
        res.status(200).send(log);	
    }
}

exports.getStatus = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
      	console.log("in if");
    } else {
        console.log("in else");
      	console.log("req:", req);
  		console.log("req body:", req.body);
        let log = req.query.log || req.body.log || '';
        let email = req.body.params.email || '';
        console.log("email", email);
        const key = datastore.key(['User', email]);
        const [entity] = await datastore.get(key);

        if (!entity) {
            // create a new user
            const data = {
                dayNumber: 0,
                savingsBudget: 0,
                spendingBudget: 0,
                salary: 50,
                total: 50
            };
            const entity = {
                key: key,
                data: data
            };
            await datastore.insert(entity);
            res.json(entity)
        } else {
            const [entity] = await datastore.get(key);
            res.json(entity)
        }
        res.status(200).send(log);
    }
};


exports.points = async (req, res) => {
  	console.log(res);
  	res.set('Access-Control-Allow-Origin', '*');
  
  	if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'GET');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    } else {
      console.log(req.body)
      let log = req.query.log || req.body.log || '';
      let email = req.body.params.email || '';

      console.log("getting user")
      const userKey = datastore.key(['User', email]);
      const [entity] = await datastore.get(userKey);

      const points = req.body.params.points;
      console.log("email:", email);
      console.log("points:", points);

      const salary = entity.salary + (points * 2);

      const userData = {
        dayNumber:entity.day,
        savingsBudget:entity.savingsBudget,
        spendingBudget:entity.spendingBudget,
        salary: salary,
        total: entity.total
      }

      const userEntity = {
        key: userKey,
        data: userData
      }

      await datastore.update(userEntity);

      res.status(200).json(userEntity).send(log);

      console.log(res);
    }
}

exports.updateUser = async (req, res) => {
	console.log(res);
	res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
	// Send response to OPTIONS requests
	res.set('Access-Control-Allow-Methods', 'GET');
	res.set('Access-Control-Allow-Headers', 'Content-Type');
	res.set('Access-Control-Max-Age', '3600');
	res.status(204).send('');
  } else {
	let log = req.query.log || req.body.log || '';
	let email = req.body.params.email || '';
	const key = datastore.key(['User', email]);
	const [entity] = await datastore.get(key);
	if(!entity){
		//create a new user
		console.log("creating new user!");
		const data = {
			dayNumber: 0,
			savingsBudget: req.body.params.savingsBudget,
			spendingBudget: req.body.params.spendingBudget,
			salary: 50,
			total: 50
		};
		const entity = {
			key: key,
			data: data
		};
		await datastore.insert(entity);		
	} else {
		//update an existing user
		console.log("updating a user!");
		const [entity] = await datastore.get(key);
		const data = {
			dayNumber: entity.dayNumber,
			savingsBudget: req.body.params.savingsBudget,
			spendingBudget: req.body.params.spendingBudget,
			salary: entity.salary,
			total: entity.total
		};
		const updateEntity = {
			key: key,
			data: data
		};
		await datastore.update(updateEntity);
	}
  }
  res.status(200).send(log);
}

/*
	index.js
	Entry point for the app.
	To start node index.js
*/

const mysql = require("mysql");
const connection = mysql.createConnection({
	// Require modifications if changes are made in MySQL.
	host: "localhost",
	user: "user99",
	password: "user99",
	database: "com3105"
});

var express = require('express');
var argon2 = require('argon2');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
	// Display the com3105_project.html file.
	res.sendFile(__dirname + "/com3105_project.html");
});

app.get('/view_catalog', function (req, res) {
	// Display the com3105_shopping_cart.html file.
	res.sendFile(__dirname + "/com3105_shopping_cart.html");
});

app.get('/check_login', function (req, res) {

	switch (req.query.action.toLowerCase()) {
		case "username":
			// Detect if the problem comes from invalid username.
			return connection.query(`SELECT cust_id FROM customer WHERE cust_username='${req.query.f_username}'`, (err, result) => {
				if (err) throw err;
				if (result.length < 1) {
					// Return false if there is no such username.
					res.send(false);
				} else {
					res.send(true);
				}
			});
		case "password":
			// Detect if the problem comes from invalid password.
			return connection.query(`SELECT cust_password FROM customer WHERE cust_username='${req.query.f_username}'`, (err, results) => {
				if (err) throw err;
				var correct_password = results[0]["cust_password"];
				if (hashVerify(correct_password, req.query.password)) {
					res.send(true)
				} else {
					res.send(false);
				}
			});
		default:
			connection.end();
	};
});

app.get('/modify_user', async function (req, res) {
	// Hash the input password
	var hashed = await hash(req.query.password);

	switch (req.query.action.toLowerCase()) {
		case 'add':
			// Add new customer info into table "customer"
			// Assume default credit limit = 10000
			var sql = "INSERT INTO customer (cust_id, cust_username, cust_password, cust_email, cust_name, cust_phone, cust_credit_limit) "
			sql += "VALUES (null, '" + req.query.f_username + "'," + "'" + hashed + "'," + "'" + req.query.email + "'," + "'" + req.query.f_username + "', null," + "10000);";
			break;
		case 'update':
			// Update customer info into table "customer" with new password
			var sql = "UPDATE customer set cust_password = '" + hashed + "' ";
			sql += "WHERE cust_username = '" + req.query.f_username + "';";
			break;
		default:
			break;
	};

	connection.query(sql, (err, result) => {
		if (err) throw error;
	});
	return res.send(true);
});

app.get('/add_cart', async function (req, res) {
	let hasAccount = await userExists(req.query.f_username);
	if (!hasAccount) {
		if (!req.query.password) return res.status(400).send();
		await createUserAccount(req.query.f_username, req.query.password, req.query.email);
	}

	// Create the format for the pop-up confirmation window.
	var responseText = 'Prod_id: ' + req.query.prod_id + '<br>';
	responseText += 'Qty: ' + req.query.qty + '<br>';
	responseText += 'Price: ' + req.query.price + '<br>';
	responseText += 'Username: ' + req.query.f_username + '<br><br>';

	var now = new Date();
	var cur_date_yyyy_mm_dd = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

	var cust_id = await usernameToID(req.query.f_username);

	var sql = "INSERT INTO cart (cust_id, cart_order_date, prod_id, cart_qty, cart_price) ";
	sql += "VALUES (" + "'" + cust_id + "'," + "'" + cur_date_yyyy_mm_dd + "', " + req.query.prod_id + ", " + req.query.qty + ", " + req.query.price + ");";

	connection.query(sql, function (err, result) {
		if (err) throw err;

		if (result.affectedRows > 0) {
			responseText += 'Thank you for your order! ' + req.query.f_username + '<br>';
			responseText += 'The above item has been added to your shopping cart. <br>';
		} else {
			responseText += 'MySQL ERROR: Item not added!<br>';
		}
		responseText += '<br><br>';
		responseText += '<input type="button" value = "Close this page" onclick="self.close();" />';
		res.send(responseText);
	});
});

app.get('/check_out', async function (req, res) {
	/* paypal information 1 */
	var responseText = '<!DOCTYPE html>';
	responseText += '<head><meta name="viewport" content="width=device-width, initial-scale=1">';
	responseText += '<meta http-equiv="X-UA-Compatible" content="IE=edge" /></head>';
	responseText += '<body><script src="https://www.paypal.com/sdk/js?client-id=ATSWa9vavLRPYABa5DAFOb7d6xFXlYIfpC4eE0ML-fo4wvxD7MhswAQkklI625Mqnbudf6psDaPUC5mj">';
	responseText += '</script>';

	var cust_id = await usernameToID(req.query.f_check_out_username);

	var sql = "SELECT DATE_FORMAT(cart.cart_order_date, '%Y-%m-%d') AS order_date, ";
	sql += "cart.prod_id, product.prod_desc, cart.cart_qty, cart.cart_price ";
	sql += "FROM cart ";
	sql += "INNER JOIN product ON cart.prod_id = product.prod_id ";
	sql += "WHERE cart.cust_id = '" + cust_id + "'";
	sql += "ORDER BY order_date ASC, prod_id DESC;";
	connection.query(sql, function (err, result) {
		if (err) throw err;
		responseText += 'Thank you for your order! ' + req.query.f_check_out_username + '<br>';
		responseText += 'Your order details: <br><br>';
		responseText += '<table border="2">';
		responseText += '<tr><th>Original Order Date</th><th>Product ID</th><th>Product Description</th><th>Quantity</th><th>Price</th><th>Amount</th></tr>';
		var total_due = 0;
		var sub_total = 0;
		for (var i = 0; i < result.length; i++) {
			sub_total = result[i].cart_qty * result[i].cart_price;
			responseText += '<tr><td>' + result[i].order_date + '</td><td>' + result[i].prod_id + '</td><td>' + result[i].prod_desc + '</td><td>' + result[i].cart_qty + '</td><td>' + result[i].cart_price + '</td><td>' + sub_total + '</td></tr>';

			total_due += sub_total;
		}
		responseText += '</table>';
		responseText += '<br>Total Due: ' + total_due.toFixed(2);
		responseText += '<br><br>';
		/* paypal information 2 */
		responseText += '<div id="paypal-button-container"></div>';
		responseText += '<p id="txt1"></p>';
		responseText += '<script>';
		responseText += 'paypal.Buttons({';
		responseText += 'createOrder: function(data, actions) {';
		responseText += 'return actions.order.create({';
		responseText += 'purchase_units: [{';
		responseText += 'amount: {';
		responseText += 'value: ' + total_due.toFixed(2) + '}';
		responseText += '}]';
		responseText += '});';
		responseText += '},';
		responseText += 'onApprove: function(data, actions) {';
		responseText += 'return actions.order.capture().then(function(details) {';
		responseText += 'alert("Transaction completed by " + details.payer.name.given_name);';
		responseText += 'document.querySelector("#txt1").innerHTML = "Payment has completed! This web page can be closed now!";';
		responseText += 'document.querySelector("#txt1").style.backgroundColor = "yellow";';
		responseText += 'document.querySelector("#txt1").style.color = "red";';
		responseText += '});';
		responseText += '}';
		responseText += '}).render("#paypal-button-container");';
		responseText += '</script>';
		//			responseText += '<input type="button" value = "Close this page" onclick="self.close();" />';
		responseText += '</body></html>';
		res.send(responseText);
	});
});

app.get("/checkIfUserExists", async (req, res) => {
	var exist = await usernameToID(req.query.f_username) !== false;
	exist ? res.send(true) : res.send(false);
});

app.listen(3000, function () {
	console.log('index.js listening to http://127.0.0.1:3000/ or http://localhost:3000/');
});

function usernameToID(f_username) {
	return new Promise((resolve) => {
		connection.query(`SELECT cust_id FROM customer WHERE cust_username = '${f_username}';`, function (err, result) {
			if (err) throw err;
			if (result.length < 1) return resolve(false);
			resolve(result[0].cust_id);
		});
	});
}

function userExists(f_username) {
	return new Promise((resolve) => {
		connection.query(`SELECT cust_id FROM customer WHERE cust_username = '${f_username}';`, function (err, result) {
			if (err) throw err;
			if (result.length > 0) return resolve(true);
			resolve(false);
		});
	});
}

function createUserAccount(f_username, password, email) {
	return new Promise(async (resolve) => {
		var hashed = await hash(password);

		connection.query(`INSERT INTO customer (cust_id, cust_email, cust_username, cust_password, cust_name, cust_credit_limit) VALUES (null, '${email}','${f_username}', '${hashed}', '${f_username}', 10000) ;`, function (err, result) {
			if (err) throw err;
			resolve();
		});
	});
}

function hash(toBeHashed) {
	return argon2.hash(toBeHashed, {
		type: argon2.argon2id,
		timeCost: 4,
		memoryCost: 50 * 1024,
		parallelism:
			Math.trunc(require("os").cpus().length / 2) < 1
				? 1
				: Math.trunc(require("os").cpus().length / 2),
		hashLength: 40,
	});
}

function hashVerify(hashed, toBeVerified) {
	return argon2.verify(hashed, toBeVerified);
}

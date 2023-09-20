# com3105-final-assignment

com3105, E-commerce Application Development, is a course offered by The Hang Seng University of Hong Kong, and taught by Professor Dr. Hans YIP. 

According to the [university website](https://www.hsu.edu.hk/en/academic-programmes/undergraduate/ahcc/academic-structure/?shortname=COM3105&cid=2101), 

`
This module introduces to students concepts of electronic commerce. It aims to equip students with (i) knowledge of several key concepts in e-commerce, e.g., e-marketing, PKI etc. and (ii) the ability to design and implement e-commerce applications. There is a project in the module requiring students to develop an e-commerce application, which consolidates the knowledge they have learnt in the programme.
`

## Table of Content
- [com3105-final-assignment](#com3105-final-assignment)
  - [Table of Content](#table-of-content)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Program Structure](#program-structure)
    - [Quick Start](#quick-start)
    - [Demo](#demo)
  - [License](#license)
  - [Credits](#credits)
  - [FAQ (Frequently Asked Questions)](#faq-frequently-asked-questions)

## Installation

The program is re-stored after one year, showing the original completed website for an imaginary retail company.

IDE(Integrated Development Environment): `Visual Studio Code` for whole web development.

![Alt text](/markdown_images/vsc.png)

Other tools: 

`Node.js` (version: `18.17.1 LTS`) for server side development.

![Alt text](/markdown_images/nodejs.png)

`MySQL Workbench` (version: `8.0.34`, `Community Downloads`) for hosting local databases and tables.

![Alt text](/markdown_images/mysql-workbench.png)


## Usage

### Program Structure

```
com3105-final-assignment
 ┣ public
 ┃ ┣ images
 ┃ ┃ ┣ background.jpg
 ┃ ┃ ┣ company.jpg
 ┃ ┃ ┣ Fruit1.jpg
 ┃ ┃ ┣ Fruit2.jpg
 ┃ ┃ ┗ Fruit3.jpg
 ┃ ┣ setups
 ┃ ┃ ┣ create_cart_table.sql
 ┃ ┃ ┣ create_customer_table.sql
 ┃ ┃ ┣ create_product_table.sql
 ┃ ┃ ┗ create_user_with_database.sql
 ┃ ┗ styles
 ┃ ┃ ┣ approval.css
 ┃ ┃ ┣ project.css
 ┃ ┃ ┗ shopping_cart.css
 ┣ com3105_project.html
 ┣ com3105_shopping_cart.html
 ┣ index.js
 ┣ package-lock.json
 ┣ package.json
```

### Quick Start

To run the code, both `node.js` and `MySQL Workbench` is required. 

For `node.js`, navigate to where the main folder `com3105-final-assignment` are, and use any command-line interpreter applications, e.g., `cmd`, to initiate the below commands:

- `npm install`: To install the required packages listed in `package.json`. A folder containing the required packages, named `node_modules` and a `JSON` file named `package-lock.json` will be created.
  - `npm update`: To update the required packages and `package-lock.json`to its latest version.
- `npm start`: According to the script written in `packcage.json`, it will initiate the `node index.js` and host the entire project on `127.0.0.1` or `localhost`.

![Alt text](/markdown_images/successful-host.png)

For `MySQL Workbench`, a `MySQL Connection` must be created if any root `user` and `password`. The method is  recommended to be conencted with `Standard (TCP/IP)`. Then, follow the `.sql` files listed in `/public/setups`.

![Alt text](/markdown_images/setups.png)

### Demo

![Alt text](/markdown_images/project-screencap.png)

![Alt text](/markdown_images/cart-screencap.png)

## License

N/A

## Credits

Credits to my groupmates, namely `Wong Ka Chuen`, `Lee Chi Hong`, `Kwok kam Yau`, `Lau Cheuk Yan Ivan`.

`Lau Cheuk Yan Ivan` has given incredible guidiance and support throughout the assignment.

## FAQ (Frequently Asked Questions)

N/A
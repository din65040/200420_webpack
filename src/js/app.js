import $ from 'jquery';
import add from './modules/add';
import tax from './modules/tax';

const item1Price = 400;
const item2Price = 600;
const totalPrice = add(item1Price, item2Price);
const salesTax = 1.08;
const priceIncludeTax = tax(totalPrice, salesTax);

$('body').text(priceIncludeTax);

console.log('console');

// ---
// import {add, sub as SUB} from './math.js'
// add(1,2);
// SUB(3,2);

// ---
// import * as math from './math.js'
// math.add(1,2);
// math.sub(3,2);
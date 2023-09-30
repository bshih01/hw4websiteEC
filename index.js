/* associative array that maps the item to its price */
const prices = {
    "hotdogs": 3.75,
    "fries": 3.00,
    "sodas": 2.50
};

const taxRate = 0.0625;

/* function to round to 2 decimal places */
function roundToTwo(num) {
    let result = Math.round(num * 100) / 100;
    
    /* convert to string */
    let str = result.toString();
    
    /* case for whole numbers */
    if (str.indexOf('.') == -1) {
        return str + '.00';
    }

    /* add trailing zero if needed */
    let parts = str.split('.');
    if (parts[1].length == 1) {
        return str + '0';
    }

    return str;
}

function placeOrder() {
    /* initializing subtotal and quantity associative array */
    let quantity = {};
    let subtotal = 0;

    /* reading in quantities and calculating subtotal */
    for (let item in prices) {
        quantity[item] = parseInt(prompt(`How many ${item} do you want?`));
        subtotal += quantity[item] * prices[item];
    }
    
    /* ternary for whether or not the discount is applied */
    let discount = subtotal >= 25 ? subtotal * 0.1 : 0;

    /* calculate the total after the discount and tax */
    subtotal -= discount;
    let tax = subtotal * taxRate;
    let total = subtotal + tax;

    /* getting the discount element to input if there is a nonzero discount */
    let discountElement = `<p>Discount: -$${roundToTwo(discount)}</p>
                           <p>Subtotal (after discount):
                           $${roundToTwo(subtotal)}</p>`;

    /* updating the website to display the order and calculations */
    document.getElementById('orderSummary').innerHTML = `
    
        <p>Hotdogs: ${quantity['hotdogs']} - Total: 
                    $${roundToTwo(quantity['hotdogs'] * prices['hotdogs'])}</p>

        <p>Fries: ${quantity['fries']} - Total: 
                  $${roundToTwo(quantity['fries'] * prices['fries'])}</p>

        <p>Sodas: ${quantity['sodas']} - Total: 
                  $${roundToTwo(quantity['sodas'] * prices['sodas'])}</p>

        <p>Subtotal ${discount ? '(before discount)' : ''}
                    : $${roundToTwo(subtotal + discount)}</p>

        ${discount ? discountElement : ''}
        <p>Tax: $${roundToTwo(tax)}</p>
        <p>Total: $${roundToTwo(total)}</p>
    `;

    /* making the textbox visible after the order is made */
    document.getElementById('orderSummary').style.display = 'block';
}


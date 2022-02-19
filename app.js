// Reading File
const data = require('./3-input.json');

let aux = {

}

for (let revenue of data['revenueData']) {
    let date = new Date(revenue['startDate']);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    if (!aux.hasOwnProperty(year)) {
        aux[year] = {
            "minMonth": 12,
            "maxMonth": 0
        }
    }

    if (!aux[year].hasOwnProperty(month)) {
        aux[year]['minMonth'] = Math.min(month, aux[year]['minMonth']);
        aux[year]['maxMonth'] = Math.max(month, aux[year]['maxMonth']);
        aux[year][month] = {
            "date": date,
            "balance": revenue['amount']
        }

    }

    else {
        let newBalance = aux[year][month]['balance'] + revenue['amount'];
        aux[year][month]['balance'] = newBalance;
    }
}

for (let expense of data['expenseData']) {
    let date = new Date(expense['startDate']);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    if (!aux.hasOwnProperty(year)) {
        aux[year] = {
            "minMonth": 12,
            "maxMonth": 0
        }
    }

    if (!aux[year].hasOwnProperty(month)) {
        aux[year]['minMonth'] = Math.min(month, aux[year]['minMonth']);
        aux[year]['maxMonth'] = Math.max(month, aux[year]['maxMonth']);
        aux[year][month] = {
            "date": date,
            "balance": 0 - expense['amount']
        }

    }

    else {
        let newBalance = aux[year][month]['balance'] - expense['amount'];
        aux[year][month]['balance'] = newBalance;
    }
}

for (year in aux) {
    for (let i = aux[year]['minMonth']; i < aux[year]['maxMonth']; i++) {
        if (!aux[year].hasOwnProperty(i)) {
            aux[year][i] = {
                "date": new Date(`${year}-0${i}`),
                "balance": 0
            }
        }
    }
}

let result = {
    "balance": []
}

for (year in aux) {
    for (let i = aux[year]['minMonth']; i <= aux[year]['maxMonth']; i++) {
        let temp = {
            "amount": aux[year][i]['balance'],
            "startDate": aux[year][i]['date']
        }
        result['balance'].push(temp);
    }
}

console.log(JSON.stringify(result, 0, 2));

// This Code Will Work For Multiple Years In Same JSON File As Well. You Can Check It With 3-input.json file.
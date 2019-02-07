// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with

const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

const words = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'test', 'test', 'test', 'test'];

function displayResultsInList(resultArray) {
    //console.log('function input: ', resultArray);
    const resultList = document.getElementById('resultList');
    //clear List first
    while (resultList.hasChildNodes()) {
        resultList.removeChild(resultList.firstChild);
    }

    if (!Array.isArray(resultArray)) {
        resultList.appendChild(createLi("NOT AN ARRAY"));
    }
    else if (!resultArray.length) {
        resultList.appendChild(createLi("EMPTY ARRAY"));
    } else {
        resultArray.forEach(element => {
            resultList.appendChild(createLi(element));
        });
    }
}

function createLi(liText) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(liText));
    return li;
}

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
function task1() {
    const filteredArray = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);
    const resultArray = filteredArray.map(element => element.first);
    displayResultsInList(resultArray);
}
// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names
function task2() {
    const resultArray = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
    displayResultsInList(resultArray);
}
// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
function task3() {
    const resultArray = inventors
        .sort((a, b) => a.year - b.year)
        .map(inventor => inventor.last + '' + inventor.year);
    displayResultsInList(resultArray);
}

// Array.prototype.reduce()
// 4. How many years did all the inventors live?
function task4() {
    const totalYears = inventors.reduce((accumulator, currentInventor) => {
        return accumulator + (currentInventor.passed - currentInventor.year)
    }, 0);
    displayResultsInList([`total years: ${totalYears}`]);
}

// 5. Sort the inventors by years lived
function task5() {
    const resultArray = inventors
        .sort((a, b) => (a.passed - a.year) - (b.passed - b.year)) //youngest first
        .map(inventor => inventor.last + ' ' + inventor.year + ' ' + inventor.passed)
    displayResultsInList(resultArray);
}

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
async function task6() {
    const arrayOfBoulevardItems = await queryBoulevards();
    if (arrayOfBoulevardItems.Error) {
        displayResultsInList([`Error in Fetch: ${arrayOfBoulevardItems.Error}`]);
        return;
    }
    const resultArray = arrayOfBoulevardItems
        .map(item => item.title)
        .filter((element) => {
            return element.toLowerCase().includes('de');
        });

    //console.log('array: ', arrayOfBoulevards);
    displayResultsInList(resultArray);
}

async function queryBoulevards() {
    try {
        const response = await fetch('https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&list=categorymembers&cmtitle=Category%3ABoulevards_in_Paris&cmlimit=200');
        const responseJson = await response.json();
        return responseJson.query.categorymembers;
    }
    catch (error) {
        //console.log('Error: ', error);
        return { Error: error };
    }
}

// 7. sort Exercise
// Sort the people alphabetically by last name
function task7() {
    /*
    let tempArray = [];
    people.forEach((element) => {
        const splittedStringInArray = element.split(',');
        const last = splittedStringInArray[0].trim();
        const first = splittedStringInArray[1].trim();
        const peopleObject = { last: last, first: first };
        tempArray.push(peopleObject);
    });
    const sortedArray = tempArray.sort((a, b) => {
        const lastA = a.last.toUpperCase();
        const lastB = b.last.toUpperCase();
        if (lastA < lastB) {
            return -1;
        }
        if (lastA > lastB) {
            return 1;
        }

        // equal
        return 0;
    });
    //console.log(tempArray);
    //console.log(sortedArray);
    const resultArray = sortedArray.map(element => element.last);
    */
    const resultArray = people.sort((a, b) => {
        const [aLast, aFirst] = a.split(', ');
        const [bLast, bFirst] = b.split(', ');
        return aLast > bLast ? 1 : -1;
    });
    displayResultsInList(resultArray);
}

// 8. Reduce Exercise
// Sum up the instances of each word
function task8() {
    let arrayOfInstances = [];
    const instancesObject = words.reduce((allwordsObject, word) => {
        if (!(word in allwordsObject)) {
            allwordsObject[word] = 0;
        }
        allwordsObject[word]++;
        return allwordsObject;
    }, {});
    //console.log(instancesObject);
    Object.entries(instancesObject).forEach(([key, value]) => {
        //console.log(`${key}: ${value}`);
        arrayOfInstances.push({ word: key, instances: value });
    });
    //console.log(arrayOfInstances);
    const resultArray = arrayOfInstances.map(element => element.word + ': ' + element.instances);
    displayResultsInList(resultArray);
}

// let moment = require('moment');

//  TEST TRIPS
let trip1 = {
    name: "John",
    email: "john@gmail.com",
    phone: "12345678910",
    to: "PVD",
    from: "BROWN",
    earliest: new Date(2019, 3, 23, 9, 30),
    latest: new Date(2019, 3, 23, 12, 0)
};

let trip2 = {
    phone: "12345678910",
    to: "BOS",
    from: "BROWN",
    earliest: new Date(2019, 3, 23, 11, 30),
    latest: new Date(2019, 3, 23, 15, 0)
};

let trip3 = {
    phone: "12345678910",
    to: "PVD",
    from: "BROWN",
    earliest: new Date(2019, 3, 23, 3, 30),
    latest: new Date(2019, 3, 23, 16, 0)
};

let test_trips = [trip1, trip2, trip3];

MAX_GROUP_SIZE = 4;

function cleanTrips(trips) {
    // cleans input trips... for now only just reformats date and time to be moment objects
    for (i = 0; i < trips.length; i++) {
        trips[i].earliest = moment(trips[i].earliest); // reformat date-time as moment object
        trips[i].latest = moment(trips[i].latest); // reformat date-time as moment object
    }
    return trips;
}
function organizeTrips(trips) {
    // organizes trips by FROM/TO and DATE
    // takes an array of trips and groups them into a dictionary where each key is "{FROM},{TO},{DATE}"
    // and each value is an array of all trips of that type
    groupings = {}
    for (i = 0; i < trips.length; i++) {
        type = trips[i].from + "," + trips[i].to + "," + trips[i].earliest.format("M-D-YYYY");
        if (type in groupings) {
            groupings[type].push(trips[i]); // add trip to the list of the rest with the same type in groupings
        } else {
            groupings[type] = [trips[i]]; // current type not already in groupings, so add new key/val to groupings
        }
    }
    return groupings;
}

function momentWithin(time, interval) {
    // checks if given time (moment object) is within interval (any object with earliest and latest property)
    return (time.isBefore(interval.latest) && time.isAfter(interval.earliest));
}
function momentOverlaps(interval1, interval2) {
    // check if interval1 (any object that has an earliest and latest property) overlaps with interval2
    return (momentWithin(interval1.earliest, interval2) || momentWithin(interval1.latest, interval2));
}

function momentMax(moment1, moment2) {
    // returns the 'later' of 2 moments
    return (moment1.isAfter(moment2) ? moment1 : moment2);
}

function momentMin(moment1, moment2) {
    // returns the 'earlier' of 2 moments
    return (moment1.isBefore(moment2) ? moment1 : moment2);
}

function makeMatches(trips) {
    // makes matches on a collection of trips, assuming all given trips are of the same type
    groups = [];
    for (let t = 0; t < trips.length; t++) {
        foundAGroup = false
        trip = trips[t];
        for (let g = 0; g < groups.length; g++) {
            group = groups[g];
            if (momentOverlaps(trip, group) && group.size < MAX_GROUP_SIZE) {
                foundAGroup = true; // mark that a group was found for this trip
                // add trip to group
                group.trips.push(trip);
                group.size++;
                // tighten the interval of the group given the new trip
                group.earliest = momentMax(group.earliest, trip.earliest);
                group.latest = momentMin(group.latest, trip.latest);
            }
        }
        if (!foundAGroup) {
            groups.push({ // add a group containing just this trip
                trips: [trip],
                size: 1,
                earliest: trip.earliest,
                latest: trip.latest
            });
        }
    }
    return groups;
}

function makeAllMatches(trips) {
    organized = organizeTrips(cleanTrips(trips));
    
    for (let t = 0; t < Object.keys(organized).length; t++) { // loop through each trip type (types are unique by FROM/TO and DATE)
        type = Object.keys(organized)[t];
        current_trips = organized[type];
    }
    
}

console.log(makeMatches(cleanTrips(test_trips)));
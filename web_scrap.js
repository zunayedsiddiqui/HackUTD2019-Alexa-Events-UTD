const https = require("https")
let cheerio = require("cheerio")
let jsonframe = require("jsonframe-cheerio")

/*format that we want our data in

event-detail 

date (category-name)
|
|_title         (div cat-events -> span featured-title)
|_day           (span day)
|_month         (span month)
|_day number    (span day-left)
|_time          (span event-time-left id tleft)
|_location      (span featured-location span orange)

*/

let events = []

/*
    Gets our html data from utdallas calendar website
*/
https.get("https://www.utdallas.edu/calendar/mobile/events-by-date.php?type=thirty", (res) => {
    let data = '';
   
    res.on('data', (chunk) => {
        data += chunk
    })

    res.on('end', () => {
        console.log("Finished collecting data!")
        let $ = cheerio.load(data)

        $('#event-detail .cat-events.thirty-type').each(function(index, element){
            events[index] = {}
            events[index]['title'] = $(element).find('.featured-title a').text()
            events[index]['day'] = $(element).find('.day').text()
            events[index]['month'] = $(element).find(".month").text()
            events[index]['day'] = $(element).find(".day-left").text()
            events[index]['time'] = $(element).find(".event-time-left").text()
            console.log(events[index])
        })

        /*
        jsonframe($)
        let weekly_data = $("body #event-detail div").scrape(frame)

        console.log("parsed data: " + weekly_data)
        */
    })
}).on("error", (err) => {
    console.log("Error: " + err.message)
})

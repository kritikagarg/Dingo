function Dingo() {

    var _this = this;

    //cloaking
    this.cloak = () => {
        var curr_origin = document.location["origin"];
        document.write(iframe); 

        if (curr_origin.includes("web.archive.org"))
        {
            document.write("archived!!")       
        }
    }

    //return random number
    this.randarg = () => {
        var lastRand, randNum;
        function rand()
            {
                while(randNum == lastRand)
                    randNum = (new Date().getTime()*Math.PI)%1;

                return lastRand = randNum;
            };

        var argument = rand()/rand();
        return _this.argument;
    }

//return current datetime in epoch 
async function get_datetime() {
    var time_api = "https://worldtimeapi.org/api/timezone/Etc/UTC";
    var dturl = time_api+ "?=" + randarg();
    let response = await fetch(dturl);
    let data = await response.json();
    current_epoch = data.unixtime;
    return current_epoch;
}

//set clock
async function clock() {
    current_datetime = await get_datetime();

    var interval = setInterval( () => {
        // current datetime in ISO
        var s = new Date(current_datetime * 1000).toISOString();
        //console.log(s)

        document.getElementById("clock").innerHTML = s;
        current_datetime += 1;

    }, 1000)
};

var url = "https://www.pilotonline.com/";

//To fetch URL
function getURL(url){
    var rand_url = url+ "?=" + randarg();
    return fetch(rand_url, {
        method: 'GET'
    });
};

//To get Iframe of the specified URL
getURL(url).then(function() {
    var iframe = '<iframe id="inframe" height="450" width="900" src="'+rand_url +'"> </iframe>';
    document.getElementById("inframe").innerHTML = iframe;
});
}

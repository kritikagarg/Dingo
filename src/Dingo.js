class Dingo {

    constructor(url) {
        this.url = url;
    }

    cloak() {
        var curr_origin = document.location["origin"];
        document.write(iframe); 

        if (curr_origin.includes("web.archive.org"))
        {
            document.write("archived!!")       
        }
    }

    get_mementodatetime() {
        var pathname = window.location.pathname;
		var archivetime = pathname.split("/");
		var at = archivetime[2]; 
		var mementodatetime = at[0] + at[1] + at[2] + at[3] + "-" + at[4] + at[5] + "-" + at[6] + at[7] + "T" + at[8] + at[9] + ":" + at[10] + at[11] + ":" + at[12] + at[13] + "Z (" + at + ")";
        return mementodatetime
    }
    
    randarg(){
        var lastRand, randNum;
        function rand()
            {
                while(randNum == lastRand)
                    randNum = (new Date().getTime()*Math.PI)%1;

                return lastRand = randNum;
            };

        const argument = rand()/rand();
        return argument;
    }

    async  get_datetime() {
        var time_api = "https://worldtimeapi.org/api/timezone/Etc/UTC";
        var dturl = time_api+ "?=" + this.randarg();
        let response = await fetch(dturl);
        let data = await response.json();
        let current_epoch = data.unixtime;
        return current_epoch;
    }

    async clock() {
        current_datetime = await get_datetime();

        var interval = setInterval( () => {
            // current datetime in ISO
            var s = new Date(current_datetime * 1000).toISOString();
            //console.log(s)

            document.getElementById("clock").innerHTML = s;
            current_datetime += 1;

        }, 1000)
    }

    getURL(){
        var rand_url = this.url+ "?=" + this.randarg();
        return fetch(rand_url, {
            method: 'GET'
        });
    };

    runit() {
        this.getURL(this.url).then(function() {
            var iframe = '<iframe id="inframe" height="450" width="900" src="'+rand_url +'"> </iframe>';
            document.getElementById("inframe").innerHTML = iframe;
        });
    }

}

class Dingo {

    constructor(url) {
        this.url = url;
        this._current_origin = document.location["origin"] || ""   ;
        this._in_archive = this._current_origin.includes("web.archive.org")
        //console.log(this._in_archive)
    }

    get current_origin() {
        return this._current_origin;
    }
    
    get in_archive() {
        return this._in_archive
    }

    cloak() {
        if(this.in_archive) {
            document.write("archived!!")
        }
        else
            {console.log("To demonstrate cloaking, page should be archived!!") 
        }     
    }
    

    get_mementodatetime() {
        if (this._in_archive){
            var pathname = window.location.pathname;
            var archivetime = pathname.split("/");
            var at = archivetime[2]; 
            var mementodatetime = at[0] + at[1] + at[2] + at[3] + "-" + at[4] + at[5] + "-" + at[6] + at[7] + "T" + at[8] + at[9] + ":" + at[10] + at[11] + ":" + at[12] + at[13] + "Z (" + at + ")";
            return mementodatetime
        }
        else{
            return "Archive the page to get Memento-Datetime"
        }
    }
    
    // To get random number

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
        var time_api = "https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now";
        var time_api = time_api+ "&=" + this.randarg();
        console.log(time_api)
        let response = await fetch(time_api, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        console.log(response)
        let data = await response.json();
        let current_epoch = data.UnixTimeStamp;
        return current_epoch;
    }

    async getURL(){
        var rand_url = this.url+ "?=" + this.randarg();
        //return rand_url;
        return await fetch(rand_url, {
            method: 'GET'
        });
    };

    async runit() {
        var rand_url = this.getURL(this.url);
        var iframe = '<iframe id="inframe" height="450" width="900" src="'+rand_url +'"> </iframe>';
        document.getElementById("inframe").innerHTML = iframe;
        
    }

}

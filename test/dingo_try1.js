function Dingo() {

    var url;

    var current_origin = document.location["origin"] || ""   ;
    console.log(current_origin);
    var _in_archive = current_origin.includes("web.archive.org");

    const setUrl = (i) => {
        url = i;
    };

    const getURL = (i) => {
        console.log(url);
        return fetch(url, {
            method: 'GET'
        });
    };

    const cloak = () => {
        if(_in_archive) {
            document.write("archived!!")
        }
        else
            {console.log("To demonstrate cloaking, page should be archived!!") 
        }     
    };    

    const get_mementodatetime = () => {
        if (_in_archive){
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
    
    var randarg = () => {
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

//    var api_response;
    
    const get_datetime = () => {
        var time_api = "https://worldtimeapi.org/api/timezone/Etc/UTC";
        var time_api = time_api+ "?" + randarg();
        console.log(time_api)

        // let api_response = fetch(time_api, {
        //     method: 'GET'
        // });
        // console.log(api_response)
        // return api_response;
        return fetch(time_api, {
                method: 'GET'
            })
            .then(response => response.json())
			.then(data => {
                current_epoch = data.unixtime;
                console.log(current_epoch);
	        });;
    };
    
    // get_datetime().then( current_epoch => {
    //     let data = api_response.json();
    //     current_epoch = data.unixtime;
    //     return current_epoch;
    // });    

    return {getURL, setUrl, cloak, get_mementodatetime, get_datetime, _in_archive};


};
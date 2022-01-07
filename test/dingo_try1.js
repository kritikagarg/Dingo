function Dingo() {

    var url;

    var current_origin = document.location["origin"] || ""   ;
    console.log(current_origin);
    //var _in_archive = current_origin.includes("web.archive.org");

    // const _test_async = async (t) => {
    //     return new Promise((resolve) => {
    //         setTimeout(resolve, t)
    //     })
    // }

    // const _test = async () => {
    //     console.log("_test is called")
    //     _test_async(1500).then(() => console.log("it works"));
    // }

    const setUrl = (i) => {
        url = i;
    };

    const getURL = (i) => {
        console.log(url);
        return fetch(url, {
            method: 'GET'
        });
    };

    const check_in_archive = async () => {
        const memento = "https://web.archive.org/web/19961017235908/http://www2.yahoo.com/";
        console.log(memento);
        return fetch(memento, {
            mode: 'no-cors',
            // headers: {
            //   'Access-Control-Allow-Origin':'*'
            // }
          }).then((response) => {
                // console.log(response);
                // console.log(response.status); // returns 200
                mdt = response.headers.get('memento-datetime');
                //console.log(mdt)
                if(!mdt){
                    _in_archive = false;
                    //console.log("Live web");
                }else {
                    //console.log(mdt)
                    _in_archive = true
                    //console.log("Archive"); 

                }
                return _in_archive
        });        
    }

    //var _in_archive = await check_in_archive();

    const cloak = async () => {
        var _in_archive = await check_in_archive();
        if(_in_archive) {
            document.write("archived!!")
        }
        else
            {console.log("To demonstrate cloaking, page should be archived!!") 
        }     
    };    

    const get_mementodatetime = async () => {
        var _in_archive = await check_in_archive();
        console.log(window.location.pathname)
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

    var fetch_retry = async (url) => {
        while(true){
            let res = await fetch(url);
            if(res.status == 200){
                return res
                break;
            }
        } 
    };

    const get_datetime = async () => {
        let time_api = "https://worldtimeapi.org/api/timezone/Etc/UTC";       
        let dturl = time_api+ "?=" + randarg();
        let response = await fetch_retry(dturl);
        console.log(response.status);
        let data = await response.json();
        current_epoch = data.unixtime;
        console.log(current_epoch);
        return current_epoch;
    }

    

    const chaff = async (value) => {
        //value = await get_datetime();
        current_datetime = new Date( value * 1000).toISOString();
        date = current_datetime.split("T")[0].replace(/-/g , '/');
        console.log(date)

        const iframe1 = "<iframe style=\"display: none;\" src=\"https://www.bostonherald.com/" + date + "/\"></iframe>";
        const iframe2 = "<iframe style=\"display: none;\" src=\"https://www.chicagotribune.com/" + date + "/\"></iframe>";
        const iframe3 = "<iframe style=\"display: none;\" src=\"https://nypost.com/2021/11/07/" + date + "/\"></iframe>";
        
        document.getElementById("inframe1").innerHTML = iframe1;
        document.getElementById("inframe2").innerHTML = iframe2;
        document.getElementById("inframe3").innerHTML = iframe3; 
        //return [iframe1, iframe2, iframe3];

    }; 

    return {getURL, setUrl, cloak, get_mementodatetime, get_datetime, check_in_archive, chaff};


};

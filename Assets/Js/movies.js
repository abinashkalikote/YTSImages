    import checkInternet from "../../middlewares/checkInternet.middleware.js";

    let count = 1;
    let counterMinusElem = document.querySelector("#prev");
    let counterPlusElem = document.querySelector("#next");
    let loader = document.getElementById("loader");

    // This is counter use for next button
    counterPlusElem.addEventListener("click", () => {
        loader.style.display = 'initial';
        count++;
        document.getElementById("prev").removeAttribute("disabled");
        moviesYTS(count);
    });


    // This is counter use for prev button
    counterMinusElem.addEventListener("click", () => {
        loader.style.display = 'initial';
        if (count == 1) {
            count = 1;
            document.getElementById("prev").setAttribute("disabled", "disabled");
        } else {
            count--;
            document.getElementById("prev").removeAttribute("disabled");
            moviesYTS(count);
        }
    });

    // if(checkInternet() == true){
    //     moviesYTS();
    // }

    //Checking Internet is on or off
    checkInternet(moviesYTS);


    // function to fetch movies from api
    function moviesYTS(i) {

        let url = new URL(`https://yts.mx/api/v2/list_movies.json?limit=9&page=${i}`);


        // this is a div where all movies name are listed
        let movies = document.querySelector("#movies");
        movies.innerText = "";


        // Async function to fetch data from api
        async function list_movies() {
            await fetch(url)
                .then((Response) => Response.json())
                .then((data) => showMovies(data.data.movies));
        }

        list_movies();

        async function showMovies(data) {
            loader.style.display = 'none';

            // data.forEach(element => {
            //     console.log(element.title)
            // });

            let ul = document.createElement("ul");
            ul.setAttribute("class", "list");

            await data.map((element) => {
                //   console.log(element);

                let li = document.createElement("li");
                li.setAttribute("onclick", "showText(this.innerText)");
                li.innerText = element.title;
                ul.appendChild(li);
            });

            movies.appendChild(ul);
        }
    }


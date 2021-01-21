let settings = {
  isFilterEnabled: false,
  qtt: 1,
  filter: "years",
};

class SetupFilter {
  addFontAwesome = function () {
    document.head.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />`;
  };

  addFilterStyle = function () {
    document.head.innerHTML += `        
    <style>
      #my-filter {          
        display: flex;
        justify-content: center;
      }

      #filter-paragraph {
        width: 100%;
        display: grid;
        grid-template-columns: 0.8fr 2fr 1fr;
        font-family: Roboto, Noto, sans-serif;
        font-weight: 500;
        font-style: normal;
        line-height: 18px;
        font-size: 14px;
        color: lightgray;
        background: #ffffff;
        padding: 10px 10px 10px 30px;
        cursor: pointer;
      }    

      #open-filter-options {
        color: blue;
        display: block;
      }

      #close-filter-options {
        color: red;
        display: none;
      }

      #filter-options {
        width: 100%;
        //height: 150px;
        background: #ffffff;
        padding: 10px 30px;
        display: none;
      }

      #filter-options > p {
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 1px;
        padding-bottom: 10px;
        padding-left: 5px;
      }

      #filter-options > #selection {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-bottom: 20px;
      }
      
      #selection > div > label {      
        font-size: 12px;
      }
      
      #filter-options #donate{
        //background: yellow;
      }

      #filter-options #donate p {
        border: 1px solid red;
        padding: 5px;
        letter-spacing: 1px;
        text-transform: uppercase;
        fons-size: 15px;
        font-weight: bold;
        border-radius: 5px;
        width: 160px;
      }

      #filter-options #donate p span {
        margin: 0 4px;
      }

      #filter-options #donate p a {
        text-decoration: none;
        color: #030303;
      }

      .hidden-el {
        display: none;
      }

    </style>
    `;
  };

  createFilter = function () {
    let buttons = document.querySelector("#items");
    let div = document.createElement("div");
    div.id = "my-div";
    div.innerHTML = `
    <div id="my-filter">
      <p id="filter-paragraph">
        <span class="filter-header"><i class="fas fa-filter"></i></span>
        <span class="filter-header">
          <span>Filtered: </span>
          <span id="unwanted-videos-counter"></span>    
        </span>
        <span id="open-filter-options"><i class="fas fa-plus"></i></span>
        <span id="close-filter-options"><i class="fas fa-minus"></i></span>
      </p>
    </div>
    
    <div id="filter-options">
      <p>Filter by:</p>
  
      <div id="selection">
      </div>  
    </div> 
  `;

    buttons.prepend(div);
  };

  populateSelection = function () {
    let selection = document.querySelector("#selection");
    let options = ["live", "hours", "days", "weeks", "months", "years"];
    let checked = "";

    options.forEach((option) => {
      if (option === "years") checked = "checked";

      selection.innerHTML += `
     <div class="input filter-input">
       <input type="radio" id="${option}" name="selection" value="${option}" class="filter-sort-by" ${checked}/>
       <label for="${option}" class='range-label'>${option}</label>
     </div>`;
    });
  };

  createDonateButton = function () {
    let donate = document.querySelector("#filter-options");

    donate.innerHTML += `    
    <div id="donate">
      <p>
        <a href="https://www.paypal.com/donate?business=jasonchocolatebrownie%40hotmail.com&item_name=Buy+me+a+coffee+%3A%29&currency_code=USD" target="_blank">
          <span><i class="fas fa-coffee"></i></span>
          <span>buy me a coffee</span>
          <span><i class="fas fa-coffee"></i></span>
        </a>
      </p>
    </div>
    `;
  };
}

class HideElements {
  hideUnwantedHomePageItems = async function () {
    let items = document.querySelectorAll("#contents > ytd-rich-item-renderer");
    await this.hideUnwantedElements(items);
  };

  hideUnwantedElements = async function (items) {
    let counter = 0;

    await items.forEach((item) => {
      let videoDate = item.querySelector("#metadata-line > span:nth-child(2)");

      if (videoDate) {
        let arrayFromDate = videoDate.innerText.split(" ");

        if (arrayFromDate[0].toLowerCase() === "streamed") {
          arrayFromDate.shift();
        }

        let times = [];

        // ----------------------------

        if (settings.filter === "live") {
          times = [
            "minute",
            "minutes",
            "hour",
            "hours",
            "day",
            "days",
            "week",
            "weeks",
            "month",
            "months",
            "year",
            "years",
          ];
        } else if (settings.filter === "hours") {
          times = [
            "day",
            "days",
            "week",
            "weeks",
            "month",
            "months",
            "year",
            "years",
          ];
        } else if (settings.filter === "days") {
          times = ["week", "weeks", "month", "months", "year", "years"];
        } else if (settings.filter === "weeks") {
          times = ["month", "months", "year", "years"];
        } else if (settings.filter === "months") {
          times = ["year", "years"];
        } else if (settings.filter === "years") {
          times = [];
        }

        // ----------------------------

        times.forEach((time) => {
          if (arrayFromDate[1] === time) {
            item.style.display = "none";
            counter++;
          }
          document.querySelector(
            "#unwanted-videos-counter"
          ).innerHTML = counter;
        });
      } else {
        let live = document.querySelectorAll(
          "#meta > ytd-badge-supported-renderer > div > span"
        );

        if (live) {
          live.forEach((el) => {
            if (el.innerHTML.toLocaleLowerCase() !== "live now") {
              item.style.display = "none";
              counter++;
            }
          });
        } else {
          item.style.display = "none";
          counter++;
        }
        document.querySelector("#unwanted-videos-counter").innerHTML = counter;
      }
    });
  };
}

class FilterSettings {
  hideFIlterOptionsIfNotInHomePage = function () {
    document.body.addEventListener("click", () => {
      const url = window.location.href;

      if (url === "https://www.youtube.com/") {
        document.querySelector("#my-div").style.display = "block";
      } else {
        document.querySelector("#my-div").style.display = "none";
      }
    });
  };

  showFIlterOptions = function () {
    let optionsButton = document.querySelector("#open-filter-options");

    optionsButton.addEventListener("click", () => {
      optionsButton.style.display = "none";
      document.querySelector("#close-filter-options").style.display = "block";
      let filterOptions = document.querySelector("#filter-options");
      filterOptions.style.display = "block";
    });
  };

  hideFIlterOptions = function () {
    let optionsButton = document.querySelector("#close-filter-options");

    optionsButton.addEventListener("click", () => {
      optionsButton.style.display = "none";
      document.querySelector("#open-filter-options").style.display = "block";
      let filterOptions = document.querySelector("#filter-options");
      filterOptions.style.display = "none";
    });
  };
}

class SetFilter {
  setFilterRange = function () {
    let sort = document.querySelectorAll(".filter-sort-by");

    sort.forEach((el) => {
      el.addEventListener("click", () => {
        settings.filter = el.id;
      });
    });
  };
}

class StartFilter {
  initiateFilter = function () {
    // identify an element to observe
    const elementToObserve = document.querySelector("#contents");

    // create a new instance of `MutationObserver` named `observer`,
    // passing it a callback function
    const observer = new MutationObserver(function () {
      const url = window.location.href;

      if (url === "https://www.youtube.com/" && settings.isFilterEnabled) {
        const hideElements = new HideElements();
        hideElements.hideUnwantedHomePageItems();
      }
    });

    // call `observe()` on that MutationObserver instance,
    // passing it the element to observe, and the options object
    observer.observe(elementToObserve, { subtree: true, childList: true });
  };

  filterOnClick = function () {
    let filters = document.querySelectorAll(".filter-sort-by");

    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        if (settings.isFilterEnabled) {
          let items = document.querySelectorAll(
            "#contents > ytd-rich-item-renderer"
          );

          items.forEach((item) => {
            if (item.style.display === "none") item.style.display = "block";
          });

          const hideElements = new HideElements();
          hideElements.hideUnwantedHomePageItems();
        }
      });
    });
  };

  enableDisableFiler = function () {
    let filterHeader = document.querySelectorAll(".filter-header");

    filterHeader.forEach((el) => {
      el.addEventListener("click", () => {
        if (settings.isFilterEnabled) {
          settings.isFilterEnabled = false;

          filterHeader.forEach((el) => {
            el.style.color = "lightgray";
          });

          let items = document.querySelectorAll(
            "#contents > ytd-rich-item-renderer"
          );
          items.forEach((item) => {
            item.style.display = "block";
          });
        } else {
          settings.isFilterEnabled = true;

          filterHeader.forEach((el) => {
            el.style.color = "#030303";
          });

          const hideElements = new HideElements();
          hideElements.hideUnwantedHomePageItems();
        }
      });
    });
  };
}

const setupFilter = new SetupFilter();
setupFilter.addFontAwesome();
setupFilter.addFilterStyle();
setupFilter.createFilter();
setupFilter.populateSelection();
setupFilter.createDonateButton();

const filterSettings = new FilterSettings();
filterSettings.showFIlterOptions();
filterSettings.hideFIlterOptions();
filterSettings.hideFIlterOptionsIfNotInHomePage();

const setFilter = new SetFilter();
setFilter.setFilterRange();

const filterItems = new StartFilter();
filterItems.filterOnClick();
filterItems.initiateFilter();
filterItems.enableDisableFiler();

// put your API key here;
const apiKey = "";  

// search base URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

// constructing the initial search query
// const search =  'mask AND unit_code:"FSG"';
const search =  `type:edanmdm+AND+on%20exhibit%3A%22Yes%22%20AND%20online_media_type:%22Images%22`;

// array that we will write into
let myArray = [];

let nArtifacts = 0;

// string that will hold the stringified JSON data
let jsonString = '';

// search: fetches an array of terms based on term category
function fetchSearchData(searchTerm) {
    let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
    console.log(url);
    window
    .fetch(url)
    .then(res => res.json())
    .then(data => {
    //   console.log(data)
      
      // constructing search queries to get all the rows of data
      // you can change the page size
      let pageSize = 1000;
      let numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
      nArtifacts = data.response.rowCount;
      console.log('nArtifacts: ', nArtifacts);

      // console.log(numberOfQueries)
      for(let i = 0; i < numberOfQueries; i++) {
        // making sure that our last query calls for the exact number of rows
        if (i == (numberOfQueries - 1)) {
          searchAllURL = url + `&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}`;
        } else {
          searchAllURL = url + `&start=${i * pageSize}&rows=${pageSize}`;
        }
        fetchAllData(searchAllURL);
      }
    })
    .catch(error => {
      console.log(error);
    })
}

// fetching all the data listed under our search and pushing them all into our custom array
function fetchAllData(url) {
   window
  .fetch(url)
  .then(res => res.json())
  .then(data => {
    // console.log(data)
    console.log(data)
    data.response.rows.forEach(function(n) {
      addObject(n);
    });
  })
  .catch(error => {
    console.log(error)
  })

}

// create your own array with just the data you need
function addObject(objectData) {  

  let currentImage;
  if( objectData.content.descriptiveNonRepeating.hasOwnProperty('online_media') && objectData.content.descriptiveNonRepeating.online_media.hasOwnProperty('media')) {
    currentImage = objectData.content.descriptiveNonRepeating.online_media.media;
  } else {
    currentImage = null;
  }

  myArray.push({
    id: objectData.id,
    title: objectData.title,
    date: objectData.content.indexedStructured.date,
    images: currentImage,
    museum_short: objectData.unitCode,
    museum_long: objectData.content.descriptiveNonRepeating.data_source,
    source_link: objectData.content.descriptiveNonRepeating.record_link
  });

}

function putDataInWindow(data, nArtifacts) {
    // header with data size
    const h3 = document.createElement('h3')
    h3.innerHTML = `Getting data: ${nArtifacts} artifacts`;
    document.getElementById('data').append(h3);

    // feed the data in a <pre> tag
    const pre = document.createElement('pre');
    pre.innerHTML = data;
    document.getElementById('data').append(pre);
}

setTimeout(() => {
    document.getElementById("dwn-btn").value = 'Data ready: Download JSON';
    putDataInWindow(JSON.stringify(myArray, null, 2), myArray.length);
}, 15000);


if(nArtifacts === myArray.length) {

  // click the download button to initiate download
  document.getElementById("dwn-btn").addEventListener("click", function(){
    // name of our file
    const filename = "data.json";

    download(filename, JSON.stringify(myArray, null, 2));

  }, false);
      
}

fetchSearchData(search);

// download the file with the data you need only
function download(filename, text) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}






//---------------------------UNIT CODES------------------------------
// ACAH: Archives Center, National Museum of American History
// ACM: Anacostia Community Museum
// CFCHFOLKLIFE: Smithsonian Center for Folklife and Cultural Heritage
// CHNDM: Cooper-Hewitt, National Design Museum
// FBR: Smithsonian Field Book Project
// FSA: Freer Gallery of Art and Arthur M. Sackler Gallery Archives
// FSG: Freer Gallery of Art and Arthur M. Sackler Gallery
// HAC: Smithsonian Gardens
// HMSG: Hirshhorn Museum and Sculpture Garden
// HSFA: Human Studies Film Archives
// NAA: National Anthropological Archives
// NASM: National Air and Space Museum
// NMAAHC: National Museum of African American History and Culture
// NMAfA: Smithsonian National Museum of African Art
// NMAH: Smithsonian National Museum of American History
// NMAI: National Museum of the American Indian
// NMNHANTHRO: NMNH - Anthropology Dept.
// NMNHBIRDS: NMNH - Vertebrate Zoology - Birds Division
// NMNHBOTANY: NMNH - Botany Dept.
// NMNHEDUCATION: NMNH - Education & Outreach
// NMNHENTO: NMNH - Entomology Dept.
// NMNHFISHES: NMNH - Vertebrate Zoology - Fishes Division
// NMNHHERPS: NMNH - Vertebrate Zoology - Herpetology Division
// NMNHINV: NMNH - Invertebrate Zoology Dept.
// NMNHMAMMALS: NMNH - Vertebrate Zoology - Mammals Division
// NMNHMINSCI: NMNH - Mineral Sciences Dept.
// NMNHPALEO: NMNH - Paleobiology Dept.
// NPG: National Portrait Gallery
// NPM: National Postal Museum
// SAAM: Smithsonian American Art Museum
// SI: Smithsonian Institution, Digitization Program Office
// SIA: Smithsonian Institution Archives
// SIL: Smithsonian Libraries
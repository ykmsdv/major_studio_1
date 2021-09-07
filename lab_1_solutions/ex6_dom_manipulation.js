/*
  Exercise 6
  DOM manipulation with vanilla JS
*/

// Task
// What does DOM stand for?
// Document Object Model

// Task
// Open the file index.html in AWS Cloud9. Click "Preview" > "Preview File index.html". (Note that you can open it in a new window). What do you see?
// The index.html webpage with a pink rectangle in the upper left corner

// Task
// Delete the div with the class rectangle from index.html and refresh the preview.
// The rectangle disappears

// Task
// What does the following code do?
// When we click the div with class 'viz', the addChildToViz function creates a new div element with a className of rectangle, random (0 to 1) times 100 height, which is positioned next to the original rectangle. All new rectangles are positioned next to the previous rectangle horizontally and have different heights. In addition the console prints out the div with class viz as structured in the DOM with the original rectangle div nested in it. The console also prints HTMLCollection [div.rectangle] containing an array of all rectangles (updated after each click event) and the data that belongs to them
const viz = document.body.querySelector(".viz");

console.log(viz, viz.children);

const addChildToViz = () => {
  const newChild = document.createElement("div");
  newChild.className = "rectangle";
  newChild.style.height = Math.random() * 100 + "px";
  viz.appendChild(newChild);
};

viz.addEventListener("click", addChildToViz);

// Task
// Where can you see the results of the console.log below? How is it different from in previous exercises?
// The data can be seen in the browser's console in Dev Tools. It is different as it does not show HTML elements and their respective data, but shows the data we fetched with the drawIrisData() function from the iris_json.json file in the data object

function drawIrisData() {
  window
    .fetch("./iris_json.json")
    .then(data => data.json())
    .then(data => {
      console.log(data);
      console.log(typeof(data));
      
      const dataPrint = document.body.querySelector(".dataPrint");
      const allData = document.createElement("div");
      allData.innerHTML = JSON.stringify(data, null, 2);
      dataPrint.appendChild(allData);
    });
}

drawIrisData();

// Task
// Modify the code above to visualize the Iris dataset in the preview of index.html.
// Feel free to add additional CSS properties in index.html, or using JavaScript, as you see fit.

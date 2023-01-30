
		// LOGIN PAGE
// ------------------------------- 

// Function to call on "LOGIN" button click
function login(){
	// Define the valid login details
	var allowed_user = "user"
	var allowed_password = "password"
	
	// Store the user input
	var log_user = document.getElementById("uname").value
	var log_password = document.getElementById("pword").value
	
	// Check the user input against the valid login details
	if(log_user === allowed_user &&  log_password === allowed_password){
		// If valid enter the Home Page
		window.location = "home.html";
	}
	else{
		// If not valid Pop-up an error message
		alert("Invaild Login Details Entered. Please Try Again!")
	}	
}

		// ARTWORK PAGE
// ------------------------------- 

// Clicker counter functions called when clicked on a heart in the image - TO OPTIMIZE (or check different solution)!
// Functions increase the defined variables and add it to div with specified id
// MINIMALISM
	// Image 1
function clickOneM() {
	// Increase var mOne for 1
	mOne += 1;
	// Add new value to the div with id "oneM"
	document.getElementById("oneM").innerHTML = mOne;
};
	// Image 2
function clickTwoM() {
	mTwo += 1;
	document.getElementById("twoM").innerHTML = mTwo;
};
	// Image 3
function clickThreeM() {
	mThree += 1;
	document.getElementById("threeM").innerHTML = mThree;
};
	// Image 4
function clickFourM() {
	mFour += 1;
	document.getElementById("fourM").innerHTML = mFour;
};
// REALISM
	// Image 1
function clickOneR() {
	rOne += 1;
	document.getElementById("oneR").innerHTML = rOne;
};
	// Image 2
function clickTwoR() {
	rTwo += 1;
	document.getElementById("twoR").innerHTML = rTwo;
};
	// Image 3
function clickThreeR() {
	rThree += 1;
	document.getElementById("threeR").innerHTML = rThree;
};
	// Image 4
function clickFourR() {
	rFour += 1;
	document.getElementById("fourR").innerHTML = rFour;
};


// Functions to show/hide the artwork on button click and page enter
// for MINIMALISM
function showMini() {
	// Hiding div with id "gridReal" - realism
	document.getElementById("gridReal").style.display = "none";
	// Showing div with id "gridMini" - minimalsim
	document.getElementById("gridMini").style.display = "block";
}
// for REALISM
function showReal() {
	// Hiding div with id "gridMini" - minimalsim
	document.getElementById("gridMini").style.display = "none";
	// Showing div with id "gridReal" - realism
	document.getElementById("gridReal").style.display = "block";
}


		// INSIGHTS PAGE
// -------------------------------

// Function to call on "DRAW CHART" button click
// Draws  the chart on the screen depending on the selection (checks the values through DOM)
	// select data: csv file or array
	// height of the chart
	// width of the chart
	// duration of transition (drawing)
	// color
function drawChart(){
	// If selection ("Select data") value is equal to "month"
		// "Sales by Month" selected in "Select data:"
	if(document.getElementById("chartData").value == "month"){

	// Read a csv file
	d3.csv("yearlySales.csv").then(function(data){
		console.log(data);
	
	// Assigning values selected in the form to variables
		// Values are extracted from HTML form using DOM
	var height = document.getElementById("chartHeight").value;
	var width = document.getElementById("chartWidth").value;
	var chartColor = document.getElementById("colorPicker").value;
	var animation = document.getElementById("chartAnimation").value;
	
	// Defining the data length (number of elements)
		// Adding or removing data won't affect the chart
	var dataCount = data.length;
	// Defining the gap between the bars in the chart
	var gap = 2;
	
	// Converting values to number after reading from csv
	data.forEach (function(d){
		d.sales = Number(d.sales);
	})
	
	// Scale the data (Y scale) to make sure data fits to the chart	
	let yScale = d3.scaleLinear()
		.domain([0, d3.max(data, function (d){
			return d.sales;
		})])
		.range([height, 0]);
	
	// Defining Y axis
	let yAxis = d3.axisLeft()
		.scale(yScale);
	
	// Removing already drawn chart (avoid multiple charts being drawn)
	d3.select("#graphContainer").selectAll("*").remove();
	
	// Append an svg container to a div with id "graphContainer"
	let svgContainer = d3.select ("#graphContainer").append("svg")
		// SVG container width
		.attr("width", 1200)
		// SVG container height 
		.attr("height", 700);
		
	// Defining the rectangle (bars in chart)	
	let myRectangle = svgContainer.selectAll("rect")
		.data(data);
	
	// Drawing the chart (D3 enter method)
	myRectangle.enter()
		// Appending bars (rectangles)
		.append("rect")
			// Attributes before transition:
			// Bars color
			.attr("fill", "black")
			// Positioning all bars from left of the screen
				// Position depends on the width and array length
			.attr("x", function (d, i){
				return (50 +(i* (width/dataCount)));
			})
			//  Position bars from top of the screen
				// Chart will be drawn from bottom up
			.attr("y", height)
			// Bars width
			.attr("width", (width/dataCount - gap))
			
			// Transition (from above values to below)
			.transition()
			// Duration of transition
			.duration(animation)
			
			// Attributes after transition:
			// // Positioning all bars from left of the screen (stays the same)
			.attr("x", function (d, i){
				return (50 +(i* (width/dataCount)));
			})
			
			// Position from the top of the screen (using sales column data from csv)
			.attr("y", function(d){
				return yScale(d.sales);			
			})
			// Bars width
			.attr("width", (width/dataCount - gap))
			// Bars height (scaled sales data)
			.attr("height", function(d){
				return height - yScale(d.sales);
			})
			// Bars color
			.attr("fill", chartColor);
			
			
	// Adding text to svg
	let myLabels = svgContainer.selectAll("text")
		.data(data);
	
	// Appending text to the chart and positioning it
		// Positioning is in line with the bar positioning
	myLabels.enter()
		.append("text")
			// Before transition
			.attr("x", function (d, i){
				return ( 50 + ((width/dataCount)/2)  +(i* (width/dataCount)));
			})
			.attr("y", height)
			
			// Transition 1 - going up
			.transition()
			.duration(animation)
			.delay (1000)
			.ease(d3.easeLinear)
			
			// After transition
			// Position text from left of the screen but in the centre of bars
			.attr("x", function (d, i){
				return ( 50 + ((width/dataCount)/2)  +(i* (width/dataCount)));
			})
			// Position slightly up from the bar (20px)
			.attr("y", function(d){
				return  yScale(d.sales) + 20;			
			})
			// Styling
			.attr("text-anchor", "middle")
			.attr("font-family", "arial")
			.attr("font-size", "15px")
			// Text content (sales)
			.text(function(d) {
				return d.sales;
			})
			
			// Transition 2 - falling down
			.transition()
			.duration(animation)
			.delay (1000)
			.ease(d3.easeBounceOut)
			
			// Position from left of the screen
			.attr("x", function (d, i){
				return ( 50 + ((width/dataCount)/2)  +(i* (width/dataCount)));
			})
			// Position from top of the screen
				// 20px from the bottom of the bar
			.attr("y", (height - 20))
			// Styling
			.attr("text-anchor", "middle")
			.attr("font-family", "arial")
			.attr("font-size", "13px")
			// Text content (month)
			.text(function(d) {
				return d.month;
			});
	
	// Append an svg group into the svg container
	svgContainer.append("g")
		// Transition
		.transition()
		// Transition duration
		.duration(animation)
		.delay (2000)
		// Add class to axis to access it in CSS
		.attr("class", "axisWhite")
		// Position the axis
		.attr("transform", "translate(45, 0)")
		// Drawing the axis
		.call(yAxis);
	
	})
	
	}
	// If selected is not "month" then read data from an array
	else{
	// Define an array (2D)
    let data = [
			["Mini #1", 10],
			["Mini #2", 28],
			["Mini #3", 13],
			["Mini #4", 22],
			["Real #1", 50],
			["Real #2", 30],
			["Real #3", 20],
			["Real #4", 27],
	]
	
	
	// Assigning values selected in the form to variables
		// Values are extracted from HTML form using DOM
	var height = document.getElementById("chartHeight").value;
	var width = document.getElementById("chartWidth").value;
	var chartColor = document.getElementById("colorPicker").value;
	var animation = document.getElementById("chartAnimation").value;
	
	// Defining the array length (number of elements)
		// Adding or removing data from the array won't affect the chart
	var dataCount = data.length;
	// Defining the gap between the bars in the chart
	var gap = 2;
	
		// Scale the data (Y scale) to make sure data fits to the chart
		
	let yScale = d3.scaleLinear()
		.domain([0, d3.max(data, function (d){
			return d[1];
		})])
		.range([height, 0]);
	
	// Defining Y axis
	let yAxis = d3.axisLeft()
		.scale(yScale);
	
	// Removing already drawn chart (avoid multiple charts being drawn)
	d3.select("#graphContainer").selectAll("*").remove();
	
	// Append an svg container to a div with id "graphContainer"
	let svgContainer = d3.select ("#graphContainer").append("svg")
		.attr("width", 1200)
		.attr("height", 700);
		
	// Assigning data from the array to all rectangles (bars)	
	let myRectangle = svgContainer.selectAll("rect")
		.data(data);
	
	// Drawing the chart
	myRectangle.enter()
		// Appending bars (rectangles)
		.append("rect")
			// Attributes before transition
			// Bars color
			.attr("fill", "black")
			// Positioning all bars from left of the screen
				// Position depends on the width and array length
			.attr("x", function (d, i){
				return (50 +(i* (width/dataCount)));
			})
			// Position all bars from bottom (top) of the screen
				// Chart will be drawn from bottom to top
			.attr("y", height)
			// Bars width
			.attr("width", (width/dataCount - gap))
			
			// Transition
			.transition()
			// Transition duration
			.duration(animation)
			
			// Attributes after transition:
				// Positioning all bars from left of the screen (stays the same)
			.attr("x", function (d, i){
				return (50 +(i* (width/dataCount)));
			})
			//  Position bars from top of the screen
			.attr("y", function(d){
				return yScale(d[1]);			
			})
			// Bars width
			.attr("width", (width/dataCount - gap))
			// Bars height
			.attr("height", function(d){
				return height - yScale(d[1]);
			})
			// Bars color
			.attr("fill", chartColor);
			
			
	// Adding text to svg		
	let myLabels = svgContainer.selectAll("text")
		.data(data);
	
	// Appending text to the chart and positioning it
		// Positioning is in line with the bar positioning	
	myLabels.enter()
		.append("text")
			// Attributes before transition 
			.attr("x", function (d, i){
				return ( 50 + ((width/dataCount)/2)  +(i* (width/dataCount)));
			})
			.attr("y", height)
			
			// Transition 1 - going up
			.transition()
			.duration(animation)
			.delay (1000)
			.ease(d3.easeLinear)
			
			// Attributes after transition
			.attr("x", function (d, i){
				return ( 50 + ((width/dataCount)/2)  +(i* (width/dataCount)));
			})
			.attr("y", function(d){
				return  yScale(d[1]) + 20;			
			})
			.attr("text-anchor", "middle")
			.attr("font-family", "arial")
			.attr("font-size", "15px")
			.text(function(d) {
				return d[1];
			})
			
			// Transition 2 - falling down
			.transition()
			.duration(animation)
			.delay (1000)
			.ease(d3.easeBounceOut)
			
			// Position from left of the screen
			.attr("x", function (d, i){
				return ( 50 + ((width/dataCount)/2)  +(i* (width/dataCount)));
			})
			// Position from top of the screen
				// 20px from the bottom of the bar

			.attr("y", (height - 20))
			// Text styling
			.attr("text-anchor", "middle")
			.attr("font-family", "arial")
			.attr("font-size", "13px")
			// Text content (first array level contents)
			.text(function(d) {
				return d[0];
			});
	
	// Append an svg group into the svg container	
	svgContainer.append("g")
		// Transition
		.transition()
		// Transition duration
		.duration(animation)
		// Delay
		.delay (2000)
		// Add class to axis to access it in CSS
		.attr("class", "axisWhite")
		// Position the axis
		.attr("transform", "translate(45, 0)")
		// Drawing the axis
		.call(yAxis);
  }

}


		// ABOUT PAGE
// ------------------------------- 

// Function to change the styling of the description text (container with id "aboutProject")and reveals the heart (container with id "redHeart")
function colorRed() {	
	// Changes color to red
	document.getElementById("aboutProject").style.color = "#880808";
	// Makes all letters lowercase 
	document.getElementById("aboutProject").style.textTransform = "lowercase";
	// Changes opacity of the red heart, making it visible
	document.getElementById("redHeart").style.opacity = "1";
}

// Function to change the HTML content and styling (container with id "aboutProject")
function project() {
	// Changes description text 
	document.getElementById("aboutProject").innerHTML = "THIS WEBSITE IS DONE AS A PROJECT FOR WEB APPLICATION DEVELOPMENT MODULE ON GMIT, BY ANTE DUJIC.";
	// Changes color
	document.getElementById("aboutProject").style.color = "white";
	// Changes display property (removing from page)
	document.getElementById('redDot').style.display = "none";
	// Changes all letters to uppercase
	document.getElementById("aboutProject").style.textTransform = "uppercase";
}
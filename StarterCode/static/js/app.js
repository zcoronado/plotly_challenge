function getPlot(id) {
//Read json file
d3.json("data/samples.json").then((data) => {   
    console.log(data) 

//Filter Data for top 10 
var samples = data.samples.filter(top10 => top10.id.toString() === id)[0]; 

//Get top 10 
var samplevalues = (sample.sample_values.slice(0,10)).reverse(); 

//Top 10 OTU
var OTU_top = (samples.otu_ids.slice(0,10)).reverse(); 

//Get OTU ID
var OTU_id = OTU_top.map( x => "OTU" + x); 

// console.log(OTU_id); 

//Get labels for plot 
var labels = samples.otu_labels.slice(0,10); 

//Create trace 
var trace = {
    x: samplevalues,
    y: OTU_id,
    text: labels,  
    type: "bar", 
    orientation: "h", 
}; 

//Create data variable 
var data = [trace];

//create layout variable to set plot layout 
var layout = {
    title: "Top 10 OTU", 
    yaxis: { 
        tickmode: "linear",
    }, 
    margin: {
        l:100,
        r:100,
        t:100,
        b:30
    }
}; 

// Create the bar plot 
Plotly.newPlot("bar", data, layout); 

//Create bubble chart 
var trace1 = { 
    x: samples.otu_ids, 
    y: samples.sample_values, 
    mode: "markers", 
    marker: {
        size:samples.sample_values, 
        color: samples.otu_ids
    }, 
    text: samples.otu_labels
}; 

//Sett Bubble Bar layout 
var layout_bar = {
    xaxis:{title: "OTU ID"}, 
    height:600, 
    width: 1000
}; 


//Create data variable 
var data1 = [trace1]; 

//Create bubble plot 
Plotly.newPlot("bubble", data1, layout_b); 

}); 
}







//change functio
function optionChanged(id) {
    renderData(id);
    getPlot0(id); 
 }

function renderData() {
    var pick = d3.select("#selDataset");

//Read

    d3.json("data/samples.json").then((data) => { 
        console.log(data); 

        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key,val]) =>{
           d3.select('.panel-body').append('h5').text(key.toUpperCase()+': '+ val)
        })}; 




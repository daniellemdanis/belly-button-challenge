// Get Samples Endpoint
const sampledata = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch data and create the plot
function buildPlot(sampleIndex) {
  d3.json(sampledata).then(function (data) {
    console.log(data);

    // Extract sample values, otu ids, and otu labels from the data
    let sample_values = data.samples[sampleIndex].sample_values;
    let otu_ids = data.samples[sampleIndex].otu_ids;
    let otu_labels = data.samples[sampleIndex].otu_labels;

    updateDemographicInfo(data.metadata[sampleIndex]);

    // Display the plot
    let trace1 = {
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };

    let layout = {
      title: `Top 10 OTUs for Sample ${data.names[sampleIndex]}`,
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    Plotly.newPlot("bar", [trace1], layout);

    let trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        text: otu_labels,
        marker: {
          size: sample_values,
          color: otu_ids
        }
      };
      
      
    let layout2 = {
        showlegend: false,
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot('bubble', [trace2], layout2);
  });

}

// Initialize the dropdown menu
function init() {
  let dropdownMenu = d3.select("#selDataset");

  d3.json(sampledata).then(function (data) {
    let sampleNames = data.names;

    sampleNames.forEach(function (name, index) {
      dropdownMenu
        .append("option")
        .text(name)
        .property("value", index);
    });

    // Build the initial plot
    buildPlot(0);
  });
}

// Function to handle dropdown selection
function optionChanged(sampleIndex) {
  // Update the plot with the selected sample
  buildPlot(sampleIndex);
}

function updateDemographicInfo(metadata) {
    // Select the element with the id "sample-metadata"
    let demographicInfoBox = d3.select("#sample-metadata");
  
    // Clear existing content
    demographicInfoBox.html("");
  
    // Iterate through metadata properties and append them to the box
    Object.entries(metadata).forEach(([key, value]) => {
      demographicInfoBox
        .append("p")
        .text(`${key}: ${value}`);
    });
  }
// Initialize the dashboard
init();

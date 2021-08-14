
d3.json('samples.json').then(({ names }) => {
    names.forEach(name => {
        d3.select('select').append('option').text(name)
    });
    renderData();
});

function renderData() {
    var pick = d3.select('select').property('value');

    d3.json('samples.json').then(({ metadata, samples }) => {
        var meta = metadata.filter(obj => obj.id == pick)[0];
        var sample = samples.filter(obj => obj.id == pick)[0];
        var { otu_ids, sample_values, otu_labels } = sample;

        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key, val]) => {
            d3.select('.panel-body').append('h5').text(key.toUpperCase() + ': ' + val)
        });

        var barData = [
            {
                y: otu_ids.slice(0, 10).reverse().map(x => 'OTU ' + x),
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels,
                type: 'bar',
                orientation: 'h'
            }
        ];

        Plotly.newPlot('bar', barData);

        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,  
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale:'Earth'
            
            }}];

        var layout_b = {
            xaxis:{title: " <b>OTU ID</b>"},
            height: 500,
            width: 1200
        };

        Plotly.newPlot('bubble', bubbleData, layout_b);


        var gaugedata = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: meta.wfreq,
              title: { text: "<b>Belly Button Wash Frequency</b> <br> Scrubs Per Week" },
              type: "indicator",
              mode: "gauge+number",
              gauge: { axis: { range: [0, 9] } }
            }
          ];
          
          var layout = { width: 500, height: 500 };
          Plotly.newPlot('gauge', gaugedata, layout);

    });
}

function optionChanged() {
    renderData();
    getPlot();
};




d3.json('samples.json').then(({names})=>{
    names.forEach(name => {
        d3.select('select').append('option').text(name)
    });

    renderData();
});

function renderData() {
    var pick = d3.select('select').property('value');

    d3.json('samples.json').then(({metadata, samples}) => {
        var meta = metadata.filter( obj => obj.id == pick)[0]; 
        var sample = samples.filter( obj => obj.id == pick)[0]; 
        console.log(sample); 

        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key,val]) =>{
           d3.select('.panel-body').append('h5').text(key.toUpperCase()+': '+ val)
        })




        var data = [
            {
              x: ['giraffes', 'orangutans', 'monkeys'],
              y: [20, 14, 23],
              type: 'bar',
              orientation: 'h'
            }
          ];
          
          Plotly.newPlot('bar', data);
    })
};

function optionChanged() {
    renderData();
};
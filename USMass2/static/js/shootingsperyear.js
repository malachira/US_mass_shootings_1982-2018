
var url = ("/incidents_per_year");
Plotly.d3.json(url, function(error,response){
    console.log(response)
    //var year = response[0]
    //var frequency = response[1];
      var year = [];
      var frequency = []; 
      
    for ( x in response){
        console.log( x + "-" + response[x])
        year.push(x)
        frequency.push(response[x]*7)
    }
    var trace1 = {
        x: year,
        type: "scatter",
        mode: 'markers',
        
        marker: {
            size: frequency,
            color: year
        }       
        
        
      };        

    var data = [trace1]       
    
    var layout = {
        title: "Number of Mass Shootings in the US from 1982 - 2018",
        xaxis: {
            type: "date",
            title:"Year"
        },
        yaxis: {
            autorange: true,
            type: "linear",
            title: "Number of Incidents"
        }
    };
    Plotly.newPlot('linePlot', data,layout);      
    
});

var url2 = ("/victims_per_year");
Plotly.d3.json(url2, function(error,response){
// console.log(response)

var year = [];
var fatalities = [];  
var injured = []; 
for ( x in response){

    var each = response[x]
    
    // console.log( x + "-" + response[x])
    year.push(each.Year)
    fatalities.push(each.Fatalities)
    injured.push(each.Injured)
}


var trace1 = {
    x: year,
    y:fatalities,
    type: "bar",
    name: "Fatalities"           
    
  };  
  
var trace2 = {
    x: year,
    y: injured,
    type:"bar",
    name: "Injured"
}

var data = [ trace1, trace2]       

var layout = {barmode: 'group',
    title: "Number of Mass Shooting Victims in the US from 1982 - 2018",
    xaxis: {
        type: "date",
        title: "Year"
    },
    yaxis: {
        type:"linear",
        title: "Victims",
        autorange: true,
        
    }}

Plotly.newPlot('lineplot1', data ,layout);    
});


var url = ("/venue");
Plotly.d3.json(url, function(error,result){
// console.log(response)

var venue = [];
var numberOfShootings = [];  

for ( each in result){
    console.log( each + "-" + result[each])
    venue.push(each)
    numberOfShootings.push(result[each])
}

var data = [{
    values: numberOfShootings,
    labels: venue,
    type: 'pie'
    
  }];
  
  var layout = {
    title:"Targeted Venues"
  };
  
  Plotly.newPlot('pie', data, layout);

});






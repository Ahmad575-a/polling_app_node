const form = document.getElementById('vote-form')

// form submit event
form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = { os: choice }

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res = _res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

    e.preventDefault();
})

fetch('http://localhost:3000/poll')
.then(res => res.json())
.then(data => {
    const votes = data.votes
    const totalVotes = votes.length
    // count votes points - acc / current
    const voteCounts = votes.reduce((acc, vote)=>((acc[vote.os]= (acc[vote.os] || 0) + parseInt(vote.points)), acc),{})

    // canvasJs

let dataPoints = [
    {label: 'Windows', y: voteCounts.Windows},
    {label: 'MacOs', y: voteCounts.MacOs},
    {label: 'Linux', y: voteCounts.Linux},
    {label: 'Other', y: voteCounts.Other},
];

const chartContainer = document.querySelector('#chartContainer')

if(chartContainer){
    const chart = new CanvasJS.Chart('chartContainer',{
        animationEnabled: true,
        theme: 'theme1',
        title:{
            text: `Total Votes ${totalVotes}`
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    })
    chart.render();

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('cee11e983a5b34f0291f', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data) {
      dataPoints = dataPoints.map(x =>{
          if(x.label == data.os){
              x.y += data.poites;
              return x;
          }else{
              return x;
          }
      })
      chart.render();
    });
}
})


const ctx = document.getElementById('myChart').getContext('2d');
    
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May','june'],
        datasets: [{
            label: 'Sales',
            data: [12, 19, 15, 5, 9,14,16],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 85, 192)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: 'white', // X-axis label color
                    font: { size: 14, weight: 'bold' }
                }
            },
            y: {
                ticks: {
                    color: 'white', // Y-axis label color
                    font: { size: 14, weight: 'bold' }
                }
            }
        },
        
    },
    
});
let btn=document.querySelector(".predict-btn");
btn.addEventListener("click",function(){
    let pr=document.querySelector(".inp");
    pr.classList.add("entry");
});
let out=document.querySelector(".out");

let predict = document.querySelector("#submit-btn");
predict.addEventListener("click", function () {
    let val = document.getElementById("val").value;
    out.classList.add("in");
    fetch("https://f074-34-124-134-80.ngrok-free.app/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "interval": val })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error || "Server error"); });
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("output").innerText =data.prediction;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("output").innerText = "Error: " + error.message;
    });
});
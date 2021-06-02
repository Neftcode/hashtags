document.addEventListener("DOMContentLoaded", (e) => {
    const data = {
        labels: [],
        datasets: [{
            axis: 'y',
            label: 'Hashtags',
            data: [],
            backgroundColor: [
                '#808000',
                '#000080',
                '#800080',
                '#008000',
                '#800000',
                '#FFFF00',
                '#C0C0C0',
                '#00FFFF'
            ],
            borderColor: [
                '#2E2E2E'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    var myChart = new Chart(document.getElementById('myChart'), config);

    function update() {
        try {
            axios.get('http://ec2-54-236-52-59.compute-1.amazonaws.com:5000/hashtags').then((response) => {
                console.log(response);
                try {
                    if (response) {
                        if (response.status == 200) {
                            myChart.data.labels = Object.keys(response['data']);
                            // console.log(Object.keys(response['data']));
                            // console.log(response['data']);
                            // var datasets = [];
                            // // for (hash in response['data']) {
                            //     let data = {
                            //         axis: 'y',
                            //         label: 'Hashtags',
                            //         data: Object.values(response['data']),
                            //         backgroundColor: [
                            //             '#808000',
                            //             '#000080',
                            //             '#800080',
                            //             '#008000',
                            //             '#800000',
                            //             '#FFFF00',
                            //             '#C0C0C0',
                            //             '#00FFFF'
                            //         ],
                            //         borderColor: [
                            //             '#2E2E2E'
                            //         ],
                            //         borderWidth: 1,
                            //         parsing: {
                            //             yAxisKey: 'hash'
                            //         }
                            //     }
                            //     // console.log(hash);
                            //     datasets.push(data);
                            // // }
                            // console.log(datasets);
                            // console.log("________________________");
                            myChart.data.datasets[0].data = Object.values(response['data']);
                            myChart.update();
                        } else if (response.status == 401) {
                            throw new Error("Acceso no autorizado...");
                        } else if (response.status == 404) {
                            throw new Error("Página no encontrada...");
                        } else {
                            throw new Error("Error Interno...");
                        }
                    } else {
                        throw new Error("No hay respuesta del servidor...");
                    }
                } catch (e) {
                    console.error(e);
                    clearInterval(interval);
                }
            });
            // clearInterval(interval);
        } catch (er) {
            console.error(er);
            clearInterval(interval);
        }
    }
    update();
    var interval = setInterval(update, 1000)
});
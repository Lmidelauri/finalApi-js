

let load = document.getElementById("loader");
window.addEventListener("load", function () {

    load.style.display = "none";
})


async function displayData(el) {
    const name = el
    console.log(el)
    fetch('https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(el => {
                if (name == el.name) {
                    console.log(el.name)
                    document.getElementById('companyInfo').innerText = el.name;
                    document.getElementById('companyContact').innerText = el.email;
                    document.getElementById('boxes').value = el.boxes;

                    const storedEl = document.getElementById('boxes');
                    calculateBoxes(el.boxes)
                        .then((res) => document.getElementById('CountBoxes').innerText = res);
                    storedEl.addEventListener('input', () => calculateBoxes(document.getElementById('boxes').value)
                        .then((res) => document.getElementById('CountBoxes').innerText = res))
                }


            });
            console.log(data)
        })


        .catch(err => console.log(err))
}

async function calculateBoxes(el) {
    let numb = el.split(',')
    let num = el.split(',').map(el => { return Number(el); });
    let add = 0;
    num.forEach(el => { add += el });
    if (add % 10 == 0){
         return add / 10;}
    
    else {
        return Math.ceil(add / 10)};
}
// visualization of a bubble sort algorythm
// https://en.wikipedia.org/wiki/Bubble_sort
//
// pseudo code:
// procedure bubbleSort(A : list of sortable items)
//     n := length(A){}
//     repeat
//         newn := 0
//         for i := 1 to n - 1 inclusive do
//             if A[i - 1] > A[i] then
//                 swap(A[i - 1], A[i])
//                 newn := i
//             end if
//         end for
//         n := newn
//     until n ≤ 1
// end procedure

// setup
const size_input = document.querySelector("#arraylength");
const speed_input = document.querySelector("#sortingspeed");

// canvas setup
const canvas = document.querySelector("#canvas");
canvas.width = 1000;
canvas.height = 500;
const ctx = canvas.getContext("2d");

// array setup
let array_length;
const url = new URL(location.href);
if(url.searchParams.get("size")){
    array_length = url.searchParams.get("size");
    size_input.value = array_length;
}
else{
    array_length = 100;
}
const number_array = randomArray(array_length,1,canvas.height);

// these vars are soley used for drawing
let endpoint = number_array.length;
let compare_a = 0;
let compare_b = 1;
let speed_ms = 10;

// check for changes from the inputs
size_input.addEventListener("change", ()=>{
    const url = new URL(location.href);
    url.searchParams.set("size", size_input.value);
    location.href = url.href;
});
speed_input.addEventListener("input", ()=>{
    speed_input.nextElementSibling.innerHTML = speed_input.value;
    speed_ms = speed_input.value;
});

// generate array of given length with random ints
function randomArray(len, min, max){
    const arr = [];
    for(let i = 0; i < len; i++){
        arr.push(Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)));
    }
    return arr;
}

// ZzzZZz
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rectWidth = canvas.width / number_array.length;

    for(let i = 0, len = number_array.length; i < len; i++){
        ctx.fillStyle = "#c0c0c0";
        if(i === compare_a){
            ctx.fillStyle = "#32c832";
        }
        if(i === compare_b){
            ctx.fillStyle = "#3e5db3";
        }
        if(i >= endpoint){
            ctx.fillStyle = "#c72c2c";
        }
        ctx.save();
        ctx.translate(0, -number_array[i]);
        ctx.fillRect(i*rectWidth, canvas.height, rectWidth, number_array[i]);
        ctx.restore();
    }
    requestAnimationFrame(draw);
}

async function bubbleSort(arr){
    // let endpoint = arr.length;
    while(endpoint > 0){
        let new_endpoint = 0;
        for(let i = 1; i < endpoint; i++){
            compare_a = i - 1;
            compare_b = i;
            if(arr[i - 1] > arr[i]){
                swap(arr, i - 1, i);
                new_endpoint = i;
            }
            await sleep(speed_ms);
        }
        endpoint = new_endpoint;
    }
    console.log(number_array);
}

function swap(arr, a, b){
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

requestAnimationFrame(draw);
bubbleSort(number_array);
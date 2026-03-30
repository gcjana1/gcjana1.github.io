let arr = [];
window.ops = 0;

function sleep(){
  return new Promise(r=>setTimeout(r,100));
}

function init(){
  const select = document.getElementById("algoSelect");

  Object.keys(ALGORITHMS).forEach(k=>{
    let opt = document.createElement("option");
    opt.value=k;
    opt.innerText=ALGORITHMS[k].name;
    select.appendChild(opt);
  });
}

function start(){
  window.ops = 0;

  const input = document.getElementById("arrayInput").value;
  arr = input.split(",").map(Number);

  const algoKey = document.getElementById("algoSelect").value;
  const algo = ALGORITHMS[algoKey];

  // UI updates
  document.getElementById("complexity").innerText = algo.complexity;
  document.getElementById("explain").innerText = algo.explain;

  const lang = document.getElementById("langSelect").value;
  document.getElementById("code").innerText = algo.code[lang];

  algo.run(arr, draw);
}

function reset(){
  arr=[];
  draw([]);
}

init();

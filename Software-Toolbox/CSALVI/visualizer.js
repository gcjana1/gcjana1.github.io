function draw(arr, highlight=-1){
  const container = document.getElementById("bars");
  container.innerHTML="";

  arr.forEach((v,i)=>{
    let bar = document.createElement("div");
    bar.className="bar";
    bar.style.height = v*3+"px";

    if(i===highlight) bar.style.background="red";

    container.appendChild(bar);
  });

  document.getElementById("ops").innerText = window.ops;
}

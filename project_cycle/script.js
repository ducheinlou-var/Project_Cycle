let username = "louloubelle1503";
let activeKey = "aio_UpXO225eU9179YK9BRqatjofROP2";

const IO = new AdafruitIO(username, activeKey);

IO.setLimit(1); 
IO.getData("temperature", function(data) {
  console.log(data.feed, data.json[0].value);
});

document.querySelector("#progesterone").addEventListener("click", function() {
    document.querySelector(".bulle.bleu").classList.toggle("inactive");
    document.querySelector(".bulle.bordeau").classList.add("inactive");
})
document.querySelector("#estrogen").addEventListener("click", function() {
    document.querySelector(".bulle.bordeau").classList.toggle("inactive");
    document.querySelector(".bulle.bleu").classList.add("inactive");
})
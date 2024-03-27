const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
 
const dropdowns = document.querySelector("#dropdown select");
const btn = document.querySelector("#submit");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns){
    for (currCode in countrylist){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
          } 
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countrylist[currCode];
    let newSrc = "https://flagsapi.com/${countryCode}/flat/64.png";
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
const updateER = async () => {
    let amount = document.querySelector("#fromvalue");
    let amt = amount.value;
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amt * rate;
    msg.innerText = `${amt} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateER();
});
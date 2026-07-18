const marketing=startup.marketing;

document.getElementById("seo").innerText=
marketing.seoStrategy;

document.getElementById("channels").innerHTML=
marketing.marketingChannels
.map(item=>`<li>${item}</li>`)
.join("");
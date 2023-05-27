let footer = null;
window.addEventListener("DOMContentLoaded", function() {
    load_lacb();

    footer = document.querySelector("footer");
    const scroll_to_bottom_btn = document.querySelector(".scroll-to-bottom-button");
    const observer = new IntersectionObserver(function(e) {
        scroll_to_bottom_btn.style.display = (e[0].isIntersecting) ? "none" : "grid"; 
    });
    observer.observe(footer);

})  

function scroll_to_bottom() {
    if(footer !== null) footer.scrollIntoView({"behavior": "smooth"});
}

function toggle_proof(event) {
    const sender = event.srcElement;
    const proof_env = sender.parentElement.parentElement;
    proof_env.querySelector(".environment-body").classList.toggle("hyde");
    sender.innerText = (sender.innerText === 'visibility') ? 'visibility_off' : 'visibility';
}

function load_lacb() {
    const LACB_URL = "https://raw.githubusercontent.com/lorenzoarlo/website-utilities/main/lacb.js"
    fetch(LACB_URL).then(function(doc) {
        return doc.text();
    }).then(function(testo) {
        eval(testo);
    })
}
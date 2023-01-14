function set_proof_state(event) 
{
    const sender = event.srcElement;
    const proof_env = sender.parentElement.parentElement;
    proof_env.querySelector(".proof-body").classList.toggle("hyde");
    sender.innerText = (sender.innerText === 'visibility') ? 'visibility_off' : 'visibility';
}
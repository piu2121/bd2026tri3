const aaaaa=()=>{
    const bb = {
        nome: document.querySelector("[name='nomee']").value,
        id: 222222,
        tipo: "oi"
    }
    console.log(bb)
}
const bt=document.querySelector('button')
bt.addEventListener('click',aaaaa)
console.log(bt)
/*try {
    fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(bb)
    })
} catch (e) { console.error("adadada", e) }*/
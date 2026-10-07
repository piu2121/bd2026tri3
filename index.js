//const anos_lista = [];
//const eventos_lista = [];
//onst incidentes_lista = [];
let anos = document.querySelectorAll('#ano-div');
let eventos = document.querySelectorAll('#eventos-div');
let incidentes = document.querySelectorAll('#incidentes-div');

const get_anos = async () => {
    try {
        const resposta = await fetch("http://localhost:3000/Clima_ano", {
            method: "GET",
        })
        const a = await resposta.json();
        console.log(a)
        show_anos(a)
    } catch (e) { console.error(e) }
}
const get_eventos = async (ano) => {
    try {
        const resposta = await fetch(`http://localhost:3000/Eventos_climatico?ano=${ano}`, { method: "GET", })
        const a = await resposta.json();
        console.log(a)
        show_eventos(a)
    } catch (e) { console.error(e) }
}
const get_incidentes = async (ano) => {
    try {
        const resposta = await fetch(`http://localhost:3000/Incidentes?ano=${ano}`, { method: "GET", })
        const a = await resposta.json();
        console.log(a)
        show_incidentes(a)
    } catch (e) { console.error(e) }
}

const show_anos = (lista) => {
    const nav = document.querySelector('#nav-anos')
    const template = document.querySelector('#ano-template').content
    lista.forEach(element => {
        const div = template.querySelector('#ano-div').cloneNode(true)
        div.querySelector('h2').textContent = "ano: " + element.ano
        div.querySelector('h3').textContent = "temperatura: " + element.temperatura_do_globo + "°C"
        div.setAttribute('data-id', element.id)
        div.addEventListener('click', (event => {
            get_eventos(element.ano)
        }))
        nav.prepend(div)
    });
}
const show_eventos = (lista) => {
    const nav = document.querySelector('#nav-eventos')
    const tem = nav.querySelectorAll('#eventos-div');
    if (tem.length > 0) {
        tem.forEach(element => {
            element.remove()
        });
    }
    const template = document.querySelector('#eventos-template').content
    lista.forEach(element => {
        const div = template.querySelector('#eventos-div').cloneNode(true)
        div.querySelector('.ano').textContent = "ano : " + element.ano
        div.querySelector('.nome').textContent = "nome : " + element.nome
        div.querySelector('.continente').textContent = "continente : " + element.continente
        div.setAttribute('data-id', element.id)
        div.addEventListener('click', (event => {
            get_incidentes(element.ano)
        }))
        nav.prepend(div)
    });
}
const show_incidentes = (lista) => {
    const nav = document.querySelector('main')
    const tem = nav.querySelectorAll('#incidentes-div');
    if (tem.length > 0) {
        tem.forEach(element => {
            element.remove()
        });
    }
    const template = document.querySelector('#incidentes-template').content
    lista.forEach(element => {
        const div = template.querySelector('#incidentes-div').cloneNode(true)
        div.querySelector('.ano').textContent = "ano: " + element.ano
        div.querySelector('.tipo').textContent = "tipo: " + element.tipo
        div.querySelector('.cidade').textContent = "cidade: " + element.cidade
        div.querySelector('.estado').textContent = "estado: " + element.estado
        div.querySelector('.pais').textContent = "pais: " + element.pais
        div.querySelector('.continente').textContent = "continente: " + element.continente
        div.setAttribute('data-id', element.id)
        nav.prepend(div)
    });
}
get_anos();
const anos_lista = [];
const eventos_lista = [];
const incidentes_lista = [];
let anos = document.querySelectorAll('ano-div');
let eventos = document.querySelectorAll('eventos-div');
let incidentes = document.querySelectorAll('incidentes-div');

const get_anos = () => {
    try {
        const resposta = fetch(, {})
    } catch (e) { console.error(e) }
}
const get_eventos = (id) => {
    try {
        const resposta = fetch(, {})
    } catch (e) { console.error(e) }
}
const get_incidentes = (id) => {
    try {
        const resposta = fetch(, {})
    } catch (e) { console.error(e) }
}

const show_anos = () => {
    const nav = document.querySelector('#nav-anos')
    const template = document.querySelector('#ano-template').content
    const div = template.querySelector('#ano-div').node(true)
    anos_lista.forEach(element => {
        div.querySelector('h2').value = element.ano
        div.setAttribute('data-id', element.id)
        nav.prepend(div)
    });
}
const show_eventos = () => {
    const nav = document.querySelector('#nav-eventos')
    const template = document.querySelector('#eventos-template').content
    const div = template.querySelector('#eventos-div').node(true)
    eventos_lista.forEach(element => {
        div.querySelector('h2').value = element.evento
        div.querySelector('h2').value = element.continente
        div.setAttribute('data-id', element.id)
        nav.prepend(div)
    });
}
const show_incidentes = () => {
    const nav = document.querySelector('#nav-anos')
    const template = document.querySelector('#ano-template').content
    const div = template.querySelector('#ano-div').node(true)
    anos_lista.forEach(element => {
        div.querySelector('h2').value = element.incidente
        div.querySelector('h2').value = element.tipo
        div.querySelector('h2').value = element.cidade
        div.querySelector('h2').value = element.estado
        div.querySelector('h2').value = element.pais
        div.querySelector('h2').value = element.continente
        div.setAttribute('data-id', element.id)
        nav.prepend(div)
    });
}

anos.forEach(element => {
    element.addEventListener('click', (event => { get_eventos(event.target.dataset.id) }))
});
eventos.forEach(element => {
    element.addEventListener('click', (event => { get_incidentes(event.target.dataset.id) }))
});
get_anos();
import Handlebars from 'Handlebars'
import './header/header'
import '../style.scss'
var template = Handlebars.compile(document.querySelector('#person-partial').innerHTML);
var data = {
    status: "DONE",
    people: [
        {
            person: 'vin'
        }
    ],

};
document.querySelector('.test').innerHTML = template(data);
console.log("ss")

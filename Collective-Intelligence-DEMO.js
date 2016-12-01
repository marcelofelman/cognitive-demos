var request = require('request');

//USA TUS PROPIAS KEYS QUE PODES OBTENER EN LUIS.AI O PORTAL.AZURE.NET
var qs = 'https://api.projectoxford.ai/luis/v2.0/apps/{API-KEY}?subscription-key={SUBSCRIPTION-KEY}&q={QUERY}&verbose=true';

//DEFINICIONES DE RESPUESTAS (NUNCA HAGAS ESTO EN LA VIDA REAL :)
var bigData = 'El Big Data o Datos masivos es un concepto que hace referencia a la acumulación de grandes cantidades de datos y a los procedimientos usados para encontrar patrones repetitivos dentro de esos datos.';
var inteligenciaArtificial = 'La inteligencia artificial (IA) es un área multidisciplinaria, que a través de ciencias como las ciencias de la computación, la matemática, la lógica y la filosofía, estudia la creación y diseño de sistemas capaces de resolver problemas cotidianos por sí mismas utilizando como paradigma la inteligencia humana.';
var defaultTechResponse = 'Disculpa, no tengo informacion sobre esa tecnologia.';
var noEntendi = 'Disculpa, no te entendi. Podras decirlo de nuevo de otra manera distinta?';
var tecnologias = 'Las tecnologias a utilizar son: Big Data, Inteligencia Artificial, IoT y Business Analytics';
var etapas = 'Las etapas son  KNOW, DESIGN, MVP, POC, WRAP.'
var query;

//PARA OBTENER LOS ARGUMENTOS DE LA CONSOLA
process.argv.forEach(function (val, index, array) {
    if(index == 2) {
        qs = qs.replace('{QUERY}', val);
        query = val;
    }
});


request(qs, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var luisResponse = JSON.parse(body);
    }

    console.log('\n\n\n');
    console.log('\x1b[36m', 'YO:' ,'\x1b[0m');
    console.log(query);
    console.log('\x1b[36m', 'BOT:' ,'\x1b[0m');

    var entities = luisResponse['entities'];
    var topEntity;
    if(entities.length > 0){
        topEntity = entities[0].entity;
    }

    var topIntent = luisResponse['intents'][0].intent;

    switch (topIntent) {
        case 'None':
            console.log(noEntendi);
            break;

        case 'Consultar-Etapas':
            console.log(etapas);
            break;

        case 'Definicion-Tecnologia':
            if(topEntity == 'big data'){
                console.log(bigData);
            }
            if(topEntity == 'inteligencia artificial'){
                console.log(inteligenciaArtificial);
            }
            else{
                console.log(defaultTechResponse);
            }
            break;

        case 'Consultar-Tecnologias':
            console.log(tecnologias);
            break;
        default:
            console.log('No entre en ninguno')
            break;
    }

    console.log('\n\n\n');

});

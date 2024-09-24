
import {createServer} from 'node:http';

// const server = createServer((request,response)=>{
//     request  é os paramentros para fazer algo, por exemplo o email,nome,numeros de alguem
//     response é a resposta, seria o return . 

const server = createServer((request,response)=>{
    response.write('oi dog');
    return response.end();
})
server.listen(3333)

server.get('/', () => {
    return 'Olá a tela inicial';
})

server.get('/cachorro', () => {
    return 'Olá Cachorro';
})

server.get('/Node', () => {
    return 'Olá Node';
})

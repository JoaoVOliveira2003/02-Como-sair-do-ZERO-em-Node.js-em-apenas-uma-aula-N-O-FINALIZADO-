import { fastify } from "fastify";
import { DatabaseMemory } from './DatabaseMemory.js';

const server = fastify();
const database = new DatabaseMemory();

server.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running at ${address}`);
});

// POST: Criação de um novo vídeo
server.post('/videos', (request, reply) => {
    const { titulo, descricao, duracao } = request.body;

    database.create({
        titulo,
        descricao,
        duracao,
    });

    return reply.status(201).send({ message: "Vídeo criado com sucesso" });
});

// GET: Lista todos os vídeos, com ou sem filtro de busca
server.get('/videos', (request, reply) => {
    const search = request.query.search;
    const videos = database.list(search);

    return reply.status(200).send(videos);
});

// PUT: Atualiza um vídeo por ID
server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id;
    const { titulo, descricao, duracao } = request.body;

    const updated = database.update(videoId, { titulo, descricao, duracao });

    if (updated) {
        return reply.status(200).send({ message: "Vídeo atualizado com sucesso" });
    } else {
        return reply.status(404).send({ message: "Vídeo não encontrado" });
    }
});

// DELETE: Deleta um vídeo por ID
server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id;

    const deleted = database.delete(videoId);

    if (deleted) {
        return reply.status(200).send({ message: "Vídeo deletado com sucesso" });
    } else {
        return reply.status(404).send({ message: "Vídeo não encontrado" });
    }
});

// PATCH: Atualiza parcialmente um vídeo
server.patch('/videos/:id', (request, reply) => {
    const videoId = request.params.id;
    const { titulo, descricao, duracao } = request.body;

    const video = database.findById(videoId);

    if (video) {
        const updatedVideo = {
            titulo: titulo ?? video.titulo,
            descricao: descricao ?? video.descricao,
            duracao: duracao ?? video.duracao,
        };

        database.update(videoId, updatedVideo);
        return reply.status(200).send(updatedVideo);
    } else {
        return reply.status(404).send({ message: "Vídeo não encontrado" });
    }
});

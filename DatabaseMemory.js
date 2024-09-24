import { randomUUID } from "node:crypto";

export class DatabaseMemory {
    #videos = new Map();

    // Mostrar todos os vídeos com ou sem filtro
    list(search) {
        return Array.from(this.#videos.values())
            .filter(video => {
                if (search) {
                    return video.titulo.toLowerCase().includes(search.toLowerCase());
                }
                return true;
            });
    }

    // Cria um novo vídeo
    create(video) {
        const videoID = randomUUID();
        this.#videos.set(videoID, { id: videoID, ...video });
    }

    // Atualiza um vídeo por ID
    update(id, video) {
        if (this.#videos.has(id)) {
            this.#videos.set(id, { id, ...video });
            return true; // Atualização bem-sucedida
        }
        return false; // Vídeo não encontrado
    }

    // Deleta um vídeo por ID
    delete(id) {
        if (this.#videos.has(id)) {
            this.#videos.delete(id);
            return true; // Deleção bem-sucedida
        }
        return false; // Vídeo não encontrado
    }

    // Retorna um vídeo por ID
    findById(id) {
        return this.#videos.get(id);
    }
}

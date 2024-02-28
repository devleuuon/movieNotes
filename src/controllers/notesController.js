const knex = require('../database/knex')
const appError = require('../utils/appError')

class NotesController {
    async create(request, response){
        const { title, description, rating, tags } = request.body
        const { user_id } = request.params

        const [ note_id ] = await knex('movie_notes').insert({
            title,
            description,
            rating,
            user_id
        })

        if(rating < 1 || rating > 5) {
            throw new appError('avaliação só é válida de 1 a 5.')
        }


        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        })

        await knex('movie_tags').insert(tagsInsert)

        response.json()
    }

    async show(request, response) {
        const { id } = request.params

        const note = await knex('movie_notes').where({ id }).first()
        const tags = await knex('movie_tags').where({ note_id: note.id }).orderBy('name')

        return response.json({
            ...note, 
            tags
        })
    }
}

module.exports = NotesController
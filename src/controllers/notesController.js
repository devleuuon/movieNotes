const { request, response } = require('express')
const knex = require('../database/knex')
const appError = require('../utils/appError')

class NotesController {
    async create(request, response){
        const { title, description, rating, tags } = request.body
        const { user_id } = request.params

        if(rating < 1 || rating > 5) {
            throw new appError('avaliação só é válida de 1 a 5.')
        }

    
        const [ note_id ] = await knex('movie_notes').insert({
            title,
            description,
            rating,
            user_id
        })



        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        })

        await knex('movie_tags').insert(tagsInsert)

        return response.json()
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

    async delete(request, response) {
        const { id } = request.params

        await knex('movie_notes').where({ id }).delete()

        return response.json()
    }

    async index(request, response) {
        const { user_id, title, tags } = request.query //query vai vir do insomnia

        let notes

        if (tags) {
            const filterTags = tags.split(',').map(tag => tag.trim())
      
         notes = await knex("movie_tags")
           .select([
             "movie_notes.id",
             "movie_notes.title",
             "movie_notes.user_id",
           ])
           .where("movie_notes.user_id", user_id)
           .whereLike("movie_notes.title", `%${title}%`)
           .whereIn("name", filterTags)
           .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
           .orderBy("movie_notes.title")

        } else {
            notes = await knex('movie_notes')
            .where({ user_id })
            .whereLike('title', `%${title}%`) //mecanismo de pesquisa, no insomia digitar parâmetros
            .orderBy('title')
    
        }
        
        return response.json(notes)
    }
}

module.exports = NotesController
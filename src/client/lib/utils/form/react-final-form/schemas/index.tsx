import { z } from 'zod'
import { acceptedImageTypes } from '../types'


//types
import type { TextOptions, TextAreaOptions, CheckBoxOptions, ImageOptions, ChoiceOptions, ListOptions,} from "../types"

const text_schema = (options:TextOptions) => {
    const {required=true, min, max, matches} = options
    const isMin = typeof min !== 'undefined'
    const isMax = typeof max !== 'undefined'
    const schema =  z.string({required_error: "required", invalid_type_error: "must be a string",})
    const required_schema = !isMin ? schema.min(1, {message: 'required'}) : schema
    const min_schema = isMin ? required_schema.min(min) : required_schema
    const max_schema = isMax ? min_schema.max(max) : min_schema.max(900)
    const matches_schema = matches ? max_schema.regex(matches[0], {message:matches[1]}) : max_schema
    return matches_schema.trim()
}

const textarea_schema = (options:TextAreaOptions) => {
    const {required=true, min, max, matches} = options
    const isMin = typeof min !== 'undefined'
    const isMax = typeof max !== 'undefined'
    const schema =  z.string({required_error: "required", invalid_type_error: "must be a string",})
    const required_schema = !isMin ? schema.min(1, {message: 'required'}) : schema
    const min_schema = isMin ? required_schema.min(min) : required_schema
    const max_schema = isMax ? min_schema.max(max) : min_schema.max(900)
    const matches_schema = matches ? max_schema.regex(matches[0], {message:matches[1]}) : max_schema
    return matches_schema.trim()
}


const text_schema_optional = (options:TextOptions) => {
    const {required=true, min, max, matches} = options
    const isMin = typeof min !== 'undefined'
    const isMax = typeof max !== 'undefined'
    const schema =  z.string({required_error: "required", invalid_type_error: "must be a string",})
    const required_schema = required && !isMin ? schema.min(1, {message: 'required'}) : schema
    const min_schema = isMin ? required_schema.min(min) : required_schema
    const max_schema = isMax ? min_schema.max(max) : min_schema.max(900)
    const matches_schema = matches ? max_schema.regex(matches[0], {message:matches[1]}) : max_schema
    const optional_schema =  required ? matches_schema.trim() : matches_schema.trim().optional()
    return optional_schema
}

const textarea_schema_optional = (options:TextAreaOptions) => {
    const {required=true, min, max, matches} = options
    const isMin = typeof min !== 'undefined'
    const isMax = typeof max !== 'undefined'
    const schema =  z.string({required_error: "required", invalid_type_error: "must be a string",})
    const required_schema = required && !isMin ? schema.min(1, {message: 'required'}) : schema
    const min_schema = isMin ? required_schema.min(min) : required_schema
    const max_schema = isMax ? min_schema.max(max) : min_schema.max(900)
    const matches_schema = matches ? max_schema.regex(matches[0], {message:matches[1]}) : max_schema
    const optional_schema =  required ? matches_schema.trim() : matches_schema.trim().optional()
    return optional_schema
}

const checkbox_schema = (options:CheckBoxOptions) => {
    const {required} = options
    const schema =  z.boolean({required_error: "required", invalid_type_error: "must be a boolean [true of false]",}) 
    const required_schema = required ? schema : schema.optional()
    return required_schema
}

const valid_image_file = (required=true, accpeted=acceptedImageTypes) => {
    const schema = z.union([
        z.instanceof(File, {message: 'required'}),
        z.instanceof(Blob, {message: 'required'})
    ]).refine(file => [!(accpeted.includes(file.type) && required), {
        code: "custom",
        path: ['file'],
        message: `invalid image file type, must be one of: ${accpeted.join(', ')}`
    }])
    return schema
}
const image_schema = (options:ImageOptions) => {
    const {required=true, fileTypes=acceptedImageTypes} = options
    let schema
    if(typeof window === 'undefined'){
        schema = z.object({
            url: z.string().max(1000).trim(),
            alt: text_schema({required}),
        }, {required_error: "required"})
    }
    else{
        schema = z.object({
            url: z.string().trim().optional(),
            src: required ? z.string({required_error: "required", invalid_type_error: "must be a string"}).min(1, {message: 'required'}).trim() : z.string().trim().optional(),
            file: valid_image_file(required, fileTypes),
            alt: text_schema({required}),
        }, {required_error: "required"})
    }
    const required_schema = required ? schema : schema.partial().optional()
    return required_schema
}


function choice_schema<T extends readonly [string, ...string[]]>(values:T, options:ChoiceOptions){
    const {required} = options
    const schema = z.enum(values)
    const required_schema = required ? schema : schema.optional()
    return required_schema
}



export { text_schema, textarea_schema, text_schema_optional, textarea_schema_optional, checkbox_schema, image_schema, choice_schema }



type ValidImageMimeTypes =  'image/jpeg' | 'image/png' | 'image/webp' | 'image/svg' | 'image/svg+xml' //| 'image/gif' 
export const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg', 'image/svg+xml',] //'image/gif']
export const acceptedImageTypesExtensions = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': [],
    'image/webp': [],
    'image/svg': [],
    'image/svg+xml': [],
    'image/gif': [],
}


//helper_vars
import type { z } from 'zod'

type CmsZod = z.ZodTypeAny //IMPORVEMENT: use generic to propagate zod schema type from the function calls all the way to the relevant option type, instead of just using object

type TextOptions =  {iv?:string, zod?:CmsZod, required?:boolean, min?:number, max?:number, matches?:[RegExp, string]}
type Text = {type:'text', path:string, label:string, options?:TextOptions}

type TextAreaOptions =  {iv?:string, zod?:CmsZod, required?:boolean, min?:number, max?:number, matches?:[RegExp, string]}
type TextArea = {type:'textarea', path:string, label:string, options?:TextAreaOptions}

type CheckBoxOptions =  {iv?:boolean, zod?:CmsZod, required?:boolean}
type CheckBox = {type:'checkbox', path:string, label:string, options?:CheckBoxOptions}

type ImageOptions = {iv?:File|Blob, zod?:CmsZod, required?:boolean, fileTypes?:Array<ValidImageMimeTypes>}
type Image = {type:'image', path:string, label:string, options?:ImageOptions}
interface ImageConfig {path:string}

type ChoiceOptions =  {iv?:boolean, zod?:CmsZod, required?:boolean}
type Choice = {type:'choice', path:string, label:string, options?:ChoiceOptions}


type ListElements = Text | TextArea | CheckBox | Image | Choice
type ListOptions =  {iv?:boolean, zod?:CmsZod, required?:boolean}
interface ListConfig {path:string}
type List = {type:'list', path:string, label:string, template:Array<ListElements>, options?:ListOptions}



export type { 
    Text, TextOptions,
    TextArea, TextAreaOptions,
    CheckBox, CheckBoxOptions,
    Image, ImageOptions,  ImageConfig,
    Choice, ChoiceOptions,
    List, ListOptions, ListConfig, ListElements,
    CmsZod,
    ValidImageMimeTypes,
}


import { Prisma } from "@prisma/client"

// interface IExampleASeedOpts {name:string, icon?:string, banner?:string}
// export const seed_examples_a = async (): Promise<Array<Prisma.ExampleACreateInput>> => {
//     return [
//         {name:"example 0"},
//         {name:"example 1", icon:"/example-icon1.jpg"},
//         {name:"example 2", icon:"example-icon2.jpg", banner:"example-banner2.jpg"},
//         {name:"example 3", icon:"example-icon3.jpg", banner:"example-banner3.jpg"},
//         {name:"example 0"},
//         {name:"example 1", icon:"/example-icon1.jpg"},
//         {name:"example 2", icon:"example-icon2.jpg", banner:"example-banner2.jpg"},
//         {name:"example 3", icon:"example-icon3.jpg", banner:"example-banner3.jpg"},
//     ].map((opts, i) => example_a_template(i, opts))
// }

// export const example_a_template = (i:number, opts:IExampleASeedOpts, ):Prisma.CommunityCreateInput => {
//     const { name, icon, banner } = opts
//     return {
//         name: name,
//         icon: icon||'/default-icon.jpg',
//         banner: banner||'/default-community-banner.jpg',
//     }
// }
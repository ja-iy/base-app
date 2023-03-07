import { Prisma } from "@prisma/client"


// export const seed_examples_b = async (): Promise<Array<Prisma.ExampleBCreateInput>> => {
//     return [...Array(5).keys()].map((i) => {

//         return {
//             ...example_b_template(i), 
//         }
//     })
// };

// const example_b_template = (i: number):Prisma.ExampleBCreateInput => ({

//     name: `Example B ${i}`,
//     order: i,
    
//     relatedModelA: { create: {
//         name: `Related Model A ${i}`,
//     }},

//     relatedModelB: { createMany: [...Array(5).keys()].map((j) => ({
//         name: `Related Model A ${i} - ${j}`,
//     }))},

//     jsonFieldObject: {
//         prop1: "value1",
//         prop2: "value2",
//         prop3: "value3",
//     },

//     jsonFieldArray: [ 
//         1,
//         2,
//         3,
//     ],
    
// })
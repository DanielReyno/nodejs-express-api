const z = require('zod')

const userSchema = z.object({
    name: z.string(),
    age: z.number().int(),
    level: z.number().int()

})



function validateUser(object){
    return userSchema.safeParse(object)
}

function updateUser(object) {
    return userSchema.partial().safeParse(object)
}

module.exports = {
    validateUser,
    updateUser
}
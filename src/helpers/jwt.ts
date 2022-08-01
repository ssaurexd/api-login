import jwt from 'jsonwebtoken'


export const checkJWT = ( token: string ) => {

    try {

        const { uid } = jwt.verify( token, `${process.env.JWT_SEED}` ) as { uid: string }
        
        return [ true, uid ]
    } catch (error) {

        console.log("🚀 ~ file: jwt.ts ~ line 12 ~ checkJWT ~ error", error)
        return [ false, null ]
    }
}

export const getUserId = ( token: string ): string => {

    const { uid } = jwt.verify( token, `${process.env.JWT_SEED}` ) as { uid: string }
    return uid
}

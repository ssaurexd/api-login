import jwt from 'jsonwebtoken'


export const checkJWT = ( token: string ) => {

    try {

        const { uid } = jwt.verify( token, `${process.env.JWT_SEED}` ) as { uid: string }

        return [ true, uid ]
    } catch (error) {

        return [ false, null ]
    }
}

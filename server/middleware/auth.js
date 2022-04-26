import jwt from 'jsonwebtoken';

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustom = token.length < 500;

        let decodedData;

        if(token && isCustom){
            decodedData = jwt.verify(token, 'Atharva');

            req.userId = decodedData?.id;
        }
        else{
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.error(error);
    }
}

export default auth;
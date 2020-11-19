import passport from "passport"
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"

import { User } from "app/user/models"
import env from "config/env"
import { checkPassword } from "utils/user"

const strategies = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password",
            },
            async (username, password, done) => {
                // find user
                let user = await User.findOne({ username: username })
                if (!user) {
                    return done(null, false)
                }

                const isPasswordCorrect = checkPassword(password, user.password)
                if (!isPasswordCorrect) {
                    return done(null, false)
                }

                const responseUser = {
                    username: user.username,
                }

                return done(null, responseUser)
            }
        )
    )

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: env.JWT_SECRET,
            },
            async (jwtPayload, done) => {
                let user = await User.findOne({ username: jwtPayload.username })
                if (!user) {
                    return done(null, false)
                }

                const responseUser = {
                    username: user.username,
                }

                return done(null, responseUser)
            }
        )
    )
}

export default strategies

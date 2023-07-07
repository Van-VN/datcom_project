import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import User from "../models/schemas/user.model";

passport.use(new LocalStrategy(async function verify(username: string, password: string, cb: any) {
    const user = await User.findOne({name: username})
    if (!user) {
        return cb(null, false, {message: 'Incorrect username or password.'});
    }
    if (user.password !== password) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, user);
}))
passport.serializeUser(function(user: any, cb) {
    process.nextTick(function() {
        cb(null, { id: user._id, name: user.name , role:user.role });
    });
});

passport.deserializeUser(function(user: any, cb): any {
    console.log(user)
    process.nextTick(function(): any {
        return cb(null, user);
    });
});

export default passport;
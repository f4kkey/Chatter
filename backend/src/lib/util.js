import jwt from "jsonwebtoken"

export const generateAccessToken = (userID, res) => {
    const accessToken = jwt.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    })
    console.log(accessToken)
    res.cookie("accessToken", accessToken, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    })

    return accessToken
}

export const generateRefreshToken = (userID, res) => {

    const refreshToken = jwt.sign({ userID }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    })
    res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    })

    return refreshToken
}
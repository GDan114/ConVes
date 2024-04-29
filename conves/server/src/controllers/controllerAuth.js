async function Logout(req, resp) {
    resp.clearCookie('cookie_usuario')
    return resp.redirect('/')
}

module.exports= {
    Logout
}
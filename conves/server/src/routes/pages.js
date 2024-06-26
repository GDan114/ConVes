const express = require('express');
const router = express.Router();
const axios = require('axios');
const controller_Auth = require('../controllers/controllerAuth')

router.get('/', (req, res) => { // Página raiz
    res.render('lading_Page')
});

router.get('/registrar', (req, res) => {
    const erro = req.query.erro
    res.render('cadastro', {erro: erro})
})

router.get('/login', (req, res) => {
    const erro = req.query.erro
    res.render('loginpage', {erro: erro})
})

router.get('/home', controller_Auth.AuthEstaLogado, async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/auth/puxarPostagem')
        const postagens = response.data

        const responseProfessores = await axios.get('http://localhost:5000/auth/puxarProfessores')
        const professores = responseProfessores.data

        const tipoUsuario = req.cookies.cookie_tipoUsuario
        const idPerfil = req.cookies.cookie_usuario

        let perfil = null
        if (tipoUsuario == 'Aluno') {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilAluno/${idPerfil}`)
            perfil = responsePerfil.data
        } else {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idPerfil}`)
            perfil = responsePerfil.data

        }

        res.render('home', { postagens, perfil, tipoUsuario, professores }) // Renderiza sua página HBS com os dados das postagens como contexto
    } catch (error) {
        console.error(error)
        res.status(500).send('Erro ao buscar postagens')
    }
})

router.get('/home/perfil', controller_Auth.AuthEstaLogado, async (req, res) => {
    try {
        const tipoUsuario = req.cookies.cookie_tipoUsuario
        const idPerfil = req.cookies.cookie_usuario

        let perfil = null
        let numPosts = null
        let postagens = null
        if (tipoUsuario == 'Aluno') {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilAluno/${idPerfil}`)
            perfil = responsePerfil.data
            res.render('perfilAluno', { perfil, tipoUsuario, numPosts })
        } else {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idPerfil}`)
            perfil = responsePerfil.data

            const responseNumPosts = await axios.get(`http://localhost:5000/auth/puxarNumPosts/${idPerfil}`)
            numPosts = responseNumPosts.data

            const response = await axios.get(`http://localhost:5000/auth/puxarPostagensProf/${idProf}`)
            postagens = response.data

            res.render('perfilProf', { perfil, tipoUsuario, numPosts, postagens })
        }

        // res.render('perfil', { perfil, tipoUsuario, numPosts })
    } catch (error) {
        console.error(error)
        res.status(500).send('Erro ao buscar perfil')
    }
})

router.get('/home/postagens', controller_Auth.AuthEstaLogado, async (req, res) => {
    try {
        const tipoUsuario = req.cookies.cookie_tipoUsuario

        const response = await axios.get('http://localhost:5000/auth/puxarPostagem')
        const postagens = response.data

        const idPerfil = req.cookies.cookie_usuario

        let perfil = null
        if (tipoUsuario == 'Aluno') {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilAluno/${idPerfil}`)
            perfil = responsePerfil.data
        } else {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idPerfil}`)
            perfil = responsePerfil.data
        }

        res.render('postagens', { tipoUsuario, postagens, perfil })
    } catch(error) {
        console.error(error)
        res.status(500).send('Erro ao buscar postagens')
    }
    
})

router.get('/home/professores', controller_Auth.AuthEstaLogado, async (req, res) => {
    try {
        const tipoUsuario = req.cookies.cookie_tipoUsuario

        const responseProfessores = await axios.get('http://localhost:5000/auth/puxarProfessores')
        const professores = responseProfessores.data

        const idPerfil = req.cookies.cookie_usuario

        let perfil = null
        if (tipoUsuario == 'Aluno') {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilAluno/${idPerfil}`)
            perfil = responsePerfil.data
        } else {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idPerfil}`)
            perfil = responsePerfil.data
        }

        res.render('professores', { tipoUsuario, professores, perfil })
    } catch(error) {
        console.error(error)
        res.status(500).send('Erro ao buscar postagens')
    }
    
})

router.get('/home/postagensProfessor/:idProf', controller_Auth.AuthEstaLogado, async (req, res) => {
    try {
        const tipoUsuario = req.cookies.cookie_tipoUsuario

        const idPerfil = req.cookies.cookie_usuario

        const idProf = req.params.idProf

        const response = await axios.get(`http://localhost:5000/auth/puxarPostagensProf/${idProf}`)
        const postagens = response.data

        let perfil = null
        if (tipoUsuario == 'Aluno') {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilAluno/${idPerfil}`)
            perfil = responsePerfil.data
        } else {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idPerfil}`)
            perfil = responsePerfil.data
        }

        res.render('postagens', { tipoUsuario, postagens, perfil })
    } catch(error) {
        console.error(error)
        res.status(500).send('Erro ao buscar postagens')
    }
    
})

router.get('/home/postagens/criar', controller_Auth.AuthEstaLogado, async (req, res) => {
        const tipoUsuario = req.cookies.cookie_tipoUsuario
        const idPerfil = req.cookies.cookie_usuario

        let perfil = null
        if (tipoUsuario == 'Aluno') {
            res.redirect('/home')
        } else {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idPerfil}`)
            perfil = responsePerfil.data
            res.render('adicionarPostagem', {perfil, tipoUsuario})
        }
    
})

router.get('/home/postagens/editarPost/:idPost', controller_Auth.AuthEstaLogado, async (req, res) => {
    const tipoUsuario = req.cookies.cookie_tipoUsuario
    const idPerfil = req.cookies.cookie_usuario
    const idPost = req.params.idPost
    
    let perfil = null
    let postagem = null
    if (tipoUsuario == 'Aluno') {
        res.redirect('/home')
    } else {
        const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idPerfil}`)
        perfil = responsePerfil.data

        const responsePostagem = await axios.get(`http://localhost:5000/auth/puxarPostagemUnica/${idPost}`)
        postagem = responsePostagem.data
        res.render('editarPostagem', {perfil, postagem, tipoUsuario})
    }
})

router.get('/home/postagens/:id', controller_Auth.AuthEstaLogado, async (req, res) => {
    try {
        const idPost = req.params.id
        const response = await axios.get(`http://localhost:5000/auth/puxarPostagemUnica/${idPost}`)
        const postagem = response.data

        const tipoUsuario = req.cookies.cookie_tipoUsuario
        const idPerfil = req.cookies.cookie_usuario

        const responseQtdViews = await axios.get(`http://localhost:5000/auth/puxarNumViewsPost/${idPost}`)
        const qtdViews = responseQtdViews.data

        let perfil = null
        if (tipoUsuario == 'Aluno') {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilAluno/${idPerfil}`)
            perfil = responsePerfil.data
        } else {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idPerfil}`)
            perfil = responsePerfil.data
        }

        res.render('post', { postagem, perfil, qtdViews, tipoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar a postagem');
    }
})

router.get('/home/dashboard', controller_Auth.AuthEstaLogado, async(req, res) => {
    try {
        const tipoUsuario = req.cookies.cookie_tipoUsuario
        const idPerfil = req.cookies.cookie_usuario

        let perfil = null
        let Rank = null
        let qtdPosts = null
        let qtdViews = null

        let TopUm = null
        let TopDois = null
        let TopTres = null

        let qtdViewsTopUm = null
        let qtdViewsTopDois = null
        let qtdViewsTopTres = null

        if (tipoUsuario == "Aluno") {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilAluno/${idPerfil}`)
            perfil = responsePerfil.data
        } else {
            const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idPerfil}`)
            perfil = responsePerfil.data

            const responseQtdPosts = await axios.get(`http://localhost:5000/auth/puxarNumPosts/${idPerfil}`)
            qtdPosts = responseQtdPosts.data

            const responseQtdViews = await axios.get(`http://localhost:5000/auth/puxarNumViews/${idPerfil}`)
            qtdViews = responseQtdViews.data

            /*RESPONSE DO RANK*/
            const responseRank = await axios.get(`http://localhost:5000/auth/selectRankViews`)
            Rank = responseRank.data

            /* DADOS DO RANK*/
            const idTopUm = Rank.idTopUm;
            const idTopDois = Rank.idTopDois;
            const idTopTres = Rank.idTopTres;
            qtdViewsTopUm = Rank.qtdViewsTopUm;
            qtdViewsTopDois = Rank.qtdViewsTopDois;
            qtdViewsTopTres = Rank.qtdViewsTopTres;

            const responseTopUm = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idTopUm}`)
            TopUm = responseTopUm.data

            const responseTopDois = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idTopDois}`)
            TopDois = responseTopDois.data

            const responseTopTres = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idTopTres}`)
            TopTres = responseTopTres.data
        }

        res.render('dashboard', {perfil, Rank, tipoUsuario, qtdPosts, qtdViews, TopUm, TopDois, TopTres, qtdViewsTopUm, qtdViewsTopDois, qtdViewsTopTres})
    } catch(error) {
        console.error(error)
        res.status(500).send('Erro ao carregar página')
    }
})

router.get('/home/sobre', controller_Auth.AuthEstaLogado, async(req, res) => {
    const tipoUsuario = req.cookies.cookie_tipoUsuario
    const idPerfil = req.cookies.cookie_usuario

    let perfil = null

    if (tipoUsuario == "Aluno") {
        const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilAluno/${idPerfil}`)
        perfil = responsePerfil.data
    } else {
        const responsePerfil = await axios.get(`http://localhost:5000/auth/puxarPerfilProfessor/${idPerfil}`)
        perfil = responsePerfil.data
    }

    res.render('sobre', { perfil, tipoUsuario })
})

module.exports = router;

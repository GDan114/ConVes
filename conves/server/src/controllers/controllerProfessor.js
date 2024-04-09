const { ModelProfessorPerfil } = require('../models/modelProfessorPerfil')
const { ModelProfessorRegistro } = require('../models/modelProfessorRegistro')

async function CriarProfessor (req, res) {
    console.log('Tá rodando')
    try {
        const {
            profNome,
            profCpf,
            profEmail,
            profSenha
        } = req.body
    
        const ProfessorCriado = await ModelProfessorPerfil.create({
            rm_professor: "",
            nm_professor: profNome,
            cpf_prof: profCpf,
            fk_plano: 1
        })
    
        const idCriado = ProfessorCriado.id_professor
    
        const RegistroProfessorCriado = await ModelProfessorRegistro.create({
            fk_professor: idCriado,
            id_senhaProfessor: profSenha,
            ds_emailProfessor: profEmail
        })
    
        return {ProfessorCriado, RegistroProfessorCriado}
    } catch(erro) {
        console.error('Erro na inserção: ', erro)
        return resp.status(400).json({ message: 'Erro na inserção'})
    }
}

module.exports = {
    CriarProfessor
}
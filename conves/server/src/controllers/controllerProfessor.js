const { ModelProfessorPerfil } = require('../models/modelProfessorPerfil')
const { ModelProfessorRegistro } = require('../models/modelProfessorRegistro')
const bcrypt = require('bcrypt')

async function CriarProfessor (req, res) {
    // console.log('Tá rodando')
    try {
        console.log(req.body)
        console.log(ModelProfessorRegistro)
        const {
            profNome,
            profCpf,
            profEmail,
            profSenha, 
            profMatricula
        } = req.body

        const ProfProposto = await ModelProfessorRegistro.findOne({
            where: {ds_emailProfessor: profEmail}
        })
        
    
        if (ProfProposto) {
            return res.redirect('/registrar?erro=Erro no registro, email já registrado no sistema!')
        } else {
            const ProfessorCriado = await ModelProfessorPerfil.create({
                rm_professor: profMatricula,
                nm_professor: profNome,
                cpf_prof: profCpf,
                fk_plano: 1
            })
        
            const idCriado = ProfessorCriado.id_professor
            
            const hashedPassword = await bcrypt.hash(profSenha, 10)

            const RegistroProfessorCriado = await ModelProfessorRegistro.create({
                fk_professor: idCriado,
                id_senhaProfessor: hashedPassword,
                ds_emailProfessor: profEmail
            }) // cria registro

            if (!RegistroProfessorCriado) {
                res.redirect('/registrar?erro=Erro no registro, verifique se todos os campos estão preenchidos corretamente.')
            } else {
                res.redirect('/login')
            }

            return {ProfessorCriado, RegistroProfessorCriado}
        }
        
    } catch(erro) {
        console.error('Erro na inserção: ', erro)
        return res.status(400).json({ message: 'Erro na inserção'})
    }
}



module.exports = {
    CriarProfessor
}
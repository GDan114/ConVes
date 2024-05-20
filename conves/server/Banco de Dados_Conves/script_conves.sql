create database if not exists bd_Conves;	
use bd_Conves;


/* CRIAR UMA TABELA DE MATRÍCULA DO ALUNO */

create table if not exists tb_alunoPerfil(
id_aluno int not null auto_increment,
nm_aluno varchar (60) not null,
dt_nascimento_aluno date not null,
img_fotoPerfil longtext NOT NULL,
constraint pk_aluno primary key (id_aluno)
);

create table if not exists tb_alunoRegistro(
id_alunoRegistro int not null auto_increment,
fk_aluno int not null,
ds_emailAluno varchar(50) not null,
id_senhaAluno varchar(255) not null, /* DESSE TAMANHO PQ É CRIPTOGRAFADA */

constraint pk_alunoRegistro primary key (id_alunoRegistro),
constraint fk_aluno foreign key(fk_aluno) references tb_alunoPerfil(id_aluno)
);

create table if not exists tb_plano(
id_plano int not null auto_increment,
nm_plano varchar(20) not null,
vl_plano numeric(5,2) not null,

constraint pk_plano primary key (id_plano)
);

create table if not exists tb_professorPerfil(
id_professor int not null auto_increment,
rm_professor char (5) not null,
nm_professor varchar (40) not null, 
cpf_prof char (14) NOT NULL,
fk_plano int not null,
img_fotoPerfil longtext NOT NULL,

constraint pk_prof primary key (id_professor),
constraint fk_plano foreign key (fk_plano) references tb_plano(id_plano)
);

create table if not exists tb_professorRegistro(
id_professorRegistro int not null auto_increment,
fk_professor int not null,
id_senhaProfessor varchar(255) not null, /* DESSE TAMANHO PQ É CRIPTOGRAFADA */
ds_emailProfessor varchar(50) not null,

constraint pk_professorRegistro primary key (id_professorRegistro),
constraint fk_professorPerfil foreign key (fk_professor) references tb_professorPerfil(id_professor)
);

/*create table if not exists tb_assunto(
id_assunto int not null auto_increment,
nm_assunto varchar (40) not null,

constraint pk_assunto primary key (id_assunto)
);*/


create table if not exists tb_postagem(
id_postagem int not null auto_increment,
nm_tituloPostagem varchar (30) NOT NULL,
fk_professorAutor int NOT NULL,
-- fk_assunto int not null, --
ds_conteudoPost text NOT NULL,
img_capaPost longtext NOT NULL,

constraint pk_postagem primary key (id_postagem),
constraint fk_professorAutor foreign key (fk_professorAutor) references tb_professorPerfil (id_professor)
-- constraint fk_assunto foreign key (fk_assunto) references tb_assunto (id_assunto) --
);


/*INSERT*/

insert tb_alunoPerfil (nm_aluno, dt_nascimento_aluno, img_fotoPerfil)
	values ('Miguel Carvalho dos Santos', '2005-05-16', '/Imagens/perfil.png'),
		   ('Danilo Dias Lobianco Soares', '2007-04-05', '/Imagens/perfil.png'),
		   ('José Ricardo Uzal dos Anjos Felix', '2007-02-22', '/Imagens/perfil.png'),
		   ('Matheus Eduardo Nascimento Santos', '2006-11-30', '/Imagens/perfil.png'),
           ('Letycia Antunes Coelho de Almeida dos Santos', '2006-12-08', '/Imagens/perfil.png');
		
insert tb_alunoRegistro(fk_aluno, ds_emailAluno, id_senhaAluno)
	values (1, 'miguel@gmail.com', 'pacoca'),
		   (2, 'danilo@gmail.com', 'jesus'),
           (3, 'jose@gmail.com', 'spfc'),
           (4, 'matheus@gmail.com', 'santos'),
           (5, 'letycia@gmail.com', 'cesar');
           
insert into tb_plano(nm_plano, vl_plano)
	values ('Gratuito', 0),
		   ('Premium', 30);
           
insert into tb_professorPerfil(nm_professor, rm_professor, cpf_prof, fk_plano, img_fotoPerfil)
			values ('Denise', '07443', '47457908845', 2, '/Imagens/perfil.png'),
				   ('Valdirene', '05129', '47457939877', 1, '/Imagens/perfil.png'),
				   ('Charles', '05333', '47404739809', 2, '/Imagens/perfil.png'),
				   ('Michel', '37390', '47457990342', 1, '/Imagens/perfil.png');
                   
insert into tb_professorRegistro(fk_professor, ds_emailProfessor, id_senhaProfessor)
	values (1, 'denise@gmail.com', 'portugues'),
		   (2, 'valdirene@gmail.com', 'historia'),
           (3, 'charles@gmail.com', 'matematica'),
           (4, 'michel@gmail.com', 'biologia');
                  
/*insert into tb_materia(fk_curso, nm_materia)
			values('1', 'Português'),
				  ('1', 'Matemática'),
				  ('1', 'História'),
				  ('1', 'Sociologia'),
				  ('1', 'Tecnologias da Informação e Comunicação'),
				  ('2', 'Ciências da Natureza e suas tecnologias'),
				  ('2', 'Ciências Humanas e Sociais Aplicadas'),
				  ('1', 'Redação'),
				  ('2', 'Redação'); */

/*SELECT*/

select * from tb_alunoPerfil;
select * from tb_alunoRegistro;
select * from tb_professorPerfil;
select * from tb_professorRegistro;
select * from tb_plano;
Select * from tb_postagem;

-- select * from tb_assunto; --
desc tb_alunoPerfil;
desc tb_alunoRegistro;
desc tb_professorPerfil;
desc tb_professorRegistro;
desc tb_plano;
desc tb_postagem;
-- desc tb_assunto; --

/* ÁREA DE TESTE DO BACK 
DELETE FROM tb_alunoPerfil WHERE id_aluno = 7;
DELETE FROM tb_alunoRegistro WHERE fk_aluno = 7;

DELETE FROM tb_professorPerfil WHERE id_professor = 6;
DELETE FROM tb_professorRegistro WHERE fk_professor = 6;

TRUNCATE tb_postagem;

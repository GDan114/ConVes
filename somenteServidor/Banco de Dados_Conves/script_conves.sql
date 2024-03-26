create database if not exists bd_Conves;	
use bd_Conves;


/* CRIAR UMA TABELA DE MATRÍCULA DO ALUNO */

create table if not exists tb_alunoPerfil(
id_aluno int not null auto_increment,
rm_aluno char (5) not null,
nm_aluno varchar (60) not null,
dt_nascimento_aluno date not null,
constraint pk_aluno primary key (id_aluno)
);

create table if not exists tb_alunoRegistro(
id_alunoRegistro int not null auto_increment,
fk_aluno int not null,
ds_emailAluno varchar(50) not null,
id_senhaAluno varchar(16) not null,

constraint pk_alunoRegistro primary key (id_alunoRegistro),
constraint fk_aluno foreign key(fk_aluno) references tb_alunoPerfil(id_aluno)
);

create table if not exists tb_professorPerfil(
id_professor int not null auto_increment,
rm_professor char (5) not null,
nm_prof varchar (40) not null, 
cpf_prof char (14) NOT NULL,
fk_plano int not null,

constraint pk_prof primary key (id_professor),
constraint fk_plano foreign key (fk_plano) references tb_plano(id_plano)
);

create table if not exists tb_professorRegistro(
id_professorRegistro int not null auto_increment,
fk_professor int not null,
id_senhaProfessor varchar(16) not null,
ds_emailProfessor varchar(50) not null,

constraint pk_professorRegistro primary key (id_professorRegistro),
constraint fk_professor foreign key (fk_professor) references tb_professorPerfil(id_professor)
);

create table if not exists tb_plano(
id_plano int not null auto_increment,
nm_plano varchar(20) not null,
vl_plano numeric(5,2) not null,

constraint pk_plano primary key (id_plano)
);

create table if not exists tb_postagem(
id_postagem int not null auto_increment,
nm_tituloPostagem varchar (30) NOT NULL,
fk_professor int not null,
fk_assunto int not null,
-- PERGUNTAR COMO É FEITA A ARMAZENAGEM DO CONTEÚDO DA POSTAGEM --

constraint pk_curso primary key (id_postagem),
constraint fk_professor foreign key (fk_professor) references tb_professorPerfil (id_professor),
constraint fk_assunto foreign key (fk_assunt) references tb_assunto (id_assunto)
);

create table if not exists tb_assunto(
id_assunto int not null auto_increment,
nm_assunto varchar (40) not null,

constraint pk_assunto primary key (id_assunto)
);

/*INSERT*/

insert tb_aluno (cd_rm_aluno, nm_aluno, dt_nascimento_aluno, cpf_aluno)
	values ('07925', 'Miguel Carvalho dos Santos', '2005-05-16','47457903844'),
		   ('08595', 'Danilo Dias Lobianco Soares', '2007-04-05', '49074638793'),
		   ('08629', 'José Ricardo Uzal dos Anjos Felix', '2007-02-22', '48812634793'),
		   ('08601', 'Matheus Eduardo Nascimento Santos', '2006-11-30', '490746303844'),
           ('08579', 'Letycia Antunes Coelho de Almeida dos Santos', '2006-12-08', '47536912309');
           
    select *from tb_aluno;
    
    select *from tb_professor;

insert into tb_uf(nm_uf)
			values('SP');
		
insert into tb_professor(nm_prof, rm_prof, qt_time_work, dt_nascimento_prof, cpf_prof, cep, nm_cidade, logradouro, num_numero, complemento, bairro, fk_uf)
			values ('Denise', '07443', '200', '1999-05-16', '47457908845', '11346030', 'São Vicente', 'Rua Doutor', '456', 'casa', 'parque das bandeiras', '1'),
				   ('Valdirene', '05129', '200', '2000-12-16', '47457939877', '11346482', 'São Vicente', 'Rua José', '444', 'casa', 'Vila Ema', '1'),
				   ('Charles', '05333', '200', '1990-02-16', '47404739809', '11346543', 'São Vicente', 'Rua Almeida', '453', 'casa', 'Vila Ema', '1'),
				   ('Michel', '37390', '200', '2005-05-16', '47457990342', '11346033', 'São Vicente', 'Rua Benedito', '800', 'casa', 'Pompeba', '1');

insert into tb_cursos(nm_curso, ds_tempo)
			values('Enem', '100000'),
				  ('Provão Pualista', '100000');
                  
insert into tb_materia(fk_curso, nm_materia)
			values('1', 'Português'),
				  ('1', 'Matemática'),
				  ('1', 'História'),
				  ('1', 'Sociologia'),
				  ('1', 'Tecnologias da Informação e Comunicação'),
				  ('2', 'Ciências da Natureza e suas tecnologias'),
				  ('2', 'Ciências Humanas e Sociais Aplicadas'),
				  ('1', 'Redação'),
				  ('2', 'Redação');

insert into tb_video_aula(nm_video_aula, fk_curso, fk_materia, ds_caminho_video)
			values('Aula de matemática', '1', '2', 'https://youtu.be/j6dy4VrsFvA'),
				  ('Aula de Português', '1', '1','https://youtu.be/7T7DyQe8qbo'),
				  ('Aula do descobrimento do Brasil', '1', '3', 'https://youtu.be/xAN29Fpbjts'),
				  ('Ciências da Natureza com Rosane','2', '6', 'https://youtu.be/yTeOTLWyZ6Y'),
				  ('Aula de Jornalismo', '1', '5', 'https://youtu.be/ECdX7JpfibY');

insert into tb_matricula_professor (fk_curso, fk_video_aula, fk_materia, fk_prof)
			values ('1', '1', '2', '05333'),
				   ('2', '4', '6', '37390'),
				   ('1', '5', '5', '07443'),
				   ('1', '3', '3', '05129'),
				   ('1', '2', '1', '07443');

insert into pagamento_professor (ds_bonus, fk_prof)
			values ('sim', '05129'),
				   ('nao', '05333'),
				   ('nao', '07443'),
				   ('sim', '37390');
                       
insert into tb_planos (nm_plano, vl_plano)
	values ('Gratuito', 0),
			('Premium', 60);


/*SELECT*/
select tb_professor.rm_prof,
	   tb_professor.nm_prof as Nome_Professor,
	   tb_cursos.nm_curso as Nome_Curso,
	   tb_materia.nm_materia as Nome_Materia,
	   tb_video_aula.nm_video_aula as Nome_VideoAula
       from tb_professor inner join tb_matricula_professor on (tb_matricula_professor.fk_prof = tb_professor.rm_prof)
       inner join tb_materia on ( tb_matricula_professor.fk_materia = tb_materia.id_materia)
	   inner join tb_cursos on (tb_cursos.id_curso = tb_matricula_professor.fk_curso)
       inner join tb_video_aula on (tb_video_aula.id_video_aula = tb_matricula_professor.fk_video_aula);
       
select tb_professor.rm_prof,
	   tb_professor.nm_prof as Nome_Professor,
	   tb_cursos.nm_curso as Nome_Curso,
	   tb_materia.nm_materia as Nome_Materia,
	   tb_video_aula.nm_video_aula as Nome_VideoAula
       from tb_professor inner join tb_matricula_professor on (tb_matricula_professor.fk_prof = tb_professor.rm_prof)
       inner join tb_materia on ( tb_matricula_professor.fk_materia = tb_materia.id_materia)
	   inner join tb_cursos on (tb_cursos.id_curso = tb_matricula_professor.fk_curso)
       inner join tb_video_aula on (tb_video_aula.id_video_aula = tb_matricula_professor.fk_video_aula)
       where tb_professor.nm_prof= 'Denise';

select tb_professor.rm_prof as RM_Professor,
	   tb_professor.nm_prof as Nome_Professor,
       pagamento_professor.vl_pagamento as Pagamento_Professor,
       pagamento_professor.Qt_materias as Quantidade_de_Materias
       
       from tb_professor inner join pagamento_professor on (tb_professor.rm_prof = pagamento_professor.fk_prof);
       

select * from tb_aluno;
select * from tb_alunoRegistro;
select * from tb_professorPerfil;
select * from tb_professorRegistro;
select * from tb_planos;
Select * from tb_postagem;
select * from tb_assunto;


desc tb_alunoPerfil;
desc tb_alunoRegistro;
desc tb_professorPerfil;
desc tb_professorRegistro;
desc tb_planos;
desc tb_postagem;
desc tb_assunto;

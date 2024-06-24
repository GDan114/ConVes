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

create table if not exists tb_viewPost(
	id_viewPost int not null auto_increment,
    fk_aluno int not null,
    fk_postagem int not null,
    en_visto ENUM('S', 'N') not null default 'N',
    
    constraint pk_viewPost primary key(id_viewPost),
    constraint fk_alunoView foreign key(fk_aluno) references tb_alunoPerfil (id_aluno),
    constraint fk_postagem foreign key(fk_postagem) references tb_postagem (id_postagem)
);
/*INSERT*/

insert tb_alunoPerfil (nm_aluno, dt_nascimento_aluno, img_fotoPerfil)
	values ('TesteAluno', '2024-05-27', '/Imagens/perfil.png'),
		   ('Miguel Carvalho dos Santos', '2005-05-16', '/Imagens/perfil.png'),
		   ('Danilo Dias Lobianco Soares', '2007-04-05', '/Imagens/perfil.png'),
		   ('José Ricardo Uzal dos Anjos Felix', '2007-02-22', '/Imagens/perfil.png'),
		   ('Matheus Eduardo Nascimento Santos', '2006-11-30', '/Imagens/perfil.png'),
           ('Letycia Antunes Coelho de Almeida dos Santos', '2006-12-08', '/Imagens/perfil.png');
		
insert tb_alunoRegistro(fk_aluno, ds_emailAluno, id_senhaAluno)
	values (1, 'testealuno@email', '$2b$10$EfqXVezt4VWXpQO.ACrp4unL1LNLBn0Bxx8f0hf1JYEk23snkN4mi'), /* A SENHA É 12345678 */
		   (2, 'miguel@gmail.com', 'pacoca'),
		   (3, 'danilo@gmail.com', 'jesus'),
           (4, 'jose@gmail.com', 'spfc'),
           (5, 'matheus@gmail.com', 'santos'),
           (6, 'letycia@gmail.com', 'cesar');
           
insert into tb_plano(nm_plano, vl_plano)
	values ('Gratuito', 0),
		   ('Premium', 30);
           
insert into tb_professorPerfil(nm_professor, rm_professor, cpf_prof, fk_plano, img_fotoPerfil)
			values ('Teste', '12345', '12345678901', 1, '/Imagens/perfil.png'),
				   ('Cláudia', '07443', '47457908845', 2, '/Imagens/perfil.png'),
				   ('Valéria', '05129', '47457939877', 1, '/Imagens/perfil.png'),
				   ('Charles', '05333', '47404739809', 2, '/Imagens/perfil.png'),
				   ('Michel', '37390', '47457990342', 1, '/Imagens/perfil.png');
                   
insert into tb_professorRegistro(fk_professor, ds_emailProfessor, id_senhaProfessor)
	values (1, 'teste@email', '$2b$10$b9FOepDqzofS//MjQleREuqZH6rMi2F4UQ3HjEh3q1PoIUa3xcf6G'), /* A SENHA É 12345678 */
		   (2, 'claudia@gmail.com', '$2b$10$b9FOepDqzofS//MjQleREuqZH6rMi2F4UQ3HjEh3q1PoIUa3xcf6G'),
		   (3, 'valeria@gmail.com', '$2b$10$b9FOepDqzofS//MjQleREuqZH6rMi2F4UQ3HjEh3q1PoIUa3xcf6G'),
           (4, 'charles@gmail.com', '$2b$10$b9FOepDqzofS//MjQleREuqZH6rMi2F4UQ3HjEh3q1PoIUa3xcf6G'),
           (5, 'michel@gmail.com', '$2b$10$b9FOepDqzofS//MjQleREuqZH6rMi2F4UQ3HjEh3q1PoIUa3xcf6G');
           
insert into tb_postagem(nm_tituloPostagem, fk_professorAutor, ds_conteudoPost, img_capaPost)
	values ('Ortografia', 1, 'A ortografia é a arte de escrever corretamente. Ela é essencial para a comunicação eficaz, garantindo que as palavras sejam compreendidas da maneira pretendida. Através das regras ortográficas, aprendemos a grafar as palavras de forma padronizada, evitando erros que possam comprometer a clareza e a precisão do texto. Dominar a ortografia não apenas demonstra habilidade linguística, mas também respeito pelo idioma e por quem o utiliza. É uma ferramenta poderosa que permite transmitir nossas ideias de maneira clara e concisa.', '/Imagens/imgPosts/ortografia.jpg'),
		   ('Verbos', 1, 'Os verbos são como os motores da linguagem, impulsionando a ação e dando vida às nossas expressões. Eles nos permitem descrever ações, estados, sentimentos e relações entre pessoas e coisas. São eles que conferem dinamismo e fluidez às nossas frases, transmitindo nuances e intenções. Desde os mais simples aos mais complexos, os verbos são essenciais em qualquer idioma, moldando o significado e a estrutura das nossas comunicações. Através deles, construímos narrativas, expressamos desejos, compartilhamos experiências e nos conectamos com o mundo ao nosso redor.', '/Imagens/imgPosts/verbos.jpg'),
           ('Figuras de linguagem', 1, 'As figuras de linguagem são as tintas coloridas do nosso discurso, acrescentando profundidade, vivacidade e beleza às nossas palavras. Elas são ferramentas poderosas que transcendem o significado literal, permitindo-nos criar imagens vívidas, despertar emoções e transmitir mensagens de forma mais impactante. Das metáforas que nos levam a enxergar o mundo por novos ângulos às metonímias que substituem um termo por outro relacionado, as figuras de linguagem estão presentes em todos os cantos da nossa comunicação. Seja para embelezar um texto, torná-lo mais persuasivo ou simplesmente para despertar interesse, essas figuras são aliadas indispensáveis na arte de expressar pensamentos e sentimentos.', '/Imagens/imgPosts/figuras.jpeg'),
           ('Concordância nominal', 2, 'A concordância nominal é a harmonia entre os elementos da frase, garantindo que os termos concordem em gênero e número. É como uma dança elegante onde os substantivos, adjetivos, artigos e pronomes se alinham perfeitamente para transmitir uma mensagem coesa e precisa. Quando dominamos a concordância nominal, evitamos descompassos que possam comprometer a clareza e a correção do texto. É importante observar as regras e entender as nuances do idioma para que as palavras estejam em sintonia, contribuindo para uma comunicação eficaz e harmoniosa.', '/Imagens/imgPosts/concordancia.jpeg'),
           ('Advérbio', 2, 'Os advérbios são como os temperos sutis da nossa linguagem, acrescentando nuances e detalhes à maneira como expressamos ações, estados e qualidades. Eles modificam verbos, adjetivos e até mesmo outros advérbios, oferecendo informações sobre tempo, lugar, modo, intensidade, entre outros aspectos. Seja suavizando uma afirmação com "talvez", enfatizando uma ideia com "certamente" ou indicando o local de uma ação com "aqui", os advérbios são elementos essenciais para a precisão e a clareza da comunicação. Dominar o uso dos advérbios é como afinar um instrumento musical, dando o tom certo para cada frase e transmitindo as nuances exatas do que queremos expressar.', '/Imagens/imgPosts/adverbio.jpeg'),
           ('Adjetivo', 3, 'Os adjetivos são os artistas que pintam o cenário das nossas frases, acrescentando cor, textura e profundidade à nossa comunicação. Eles descrevem características, qualidades e estados dos substantivos, permitindo-nos criar imagens vívidas e transmitir sentimentos e impressões de forma precisa. Seja para expressar a beleza de uma paisagem com "verdejante", a bondade de uma pessoa com "generoso", ou a intensidade de uma emoção com "ardente", os adjetivos são ferramentas poderosas que enriquecem nossa expressão linguística. Dominar o uso dos adjetivos é como ter um pincel fino nas mãos, capaz de dar vida e profundidade a cada palavra que escolhemos usar.', '/Imagens/imgPosts/adjetivo.jpeg');

insert into tb_viewpost(fk_aluno, fk_postagem, en_visto)
	values (1, 1, 'S'), -- PROF 1: 6 views, PROF 2: 3 views, PROF 3: 1 view --
		   (1, 2, 'S'),
           (1, 3, 'S'),
           (1, 4, 'S'),
           (2, 2, 'S'),
           (2, 3, 'S'),
           (2, 4, 'S'),
           (2, 1, 'S'),
           (3, 4, 'S'),
           (3, 6, 'S');
		
/*SELECT*/

select * from tb_alunoPerfil;
select * from tb_alunoRegistro;
select * from tb_professorPerfil;
select * from tb_professorRegistro;
select * from tb_plano;
Select * from tb_postagem;
select * from tb_viewPost;

-- select * from tb_assunto; --
desc tb_alunoPerfil;
desc tb_alunoRegistro;
desc tb_professorPerfil;
desc tb_professorRegistro;
desc tb_plano;
desc tb_postagem;
desc tb_viewPost;

/*ÁREA DE TESTE DO BACK 
DELETE FROM tb_alunoPerfil WHERE id_aluno = 7;
DELETE FROM tb_alunoRegistro WHERE fk_aluno = 7;

DELETE FROM tb_professorPerfil WHERE id_professor = 6;
DELETE FROM tb_professorRegistro WHERE fk_professor = 6;

DELETE FROM tb_viewPost WHERE fk_aluno = 1;

INSERT INTO tb_viewpost (fk_aluno, fk_postagem, en_visto)
	values  (1, 1, 'S'),
			(2, 2, 'S'),
            (3, 1, 'N');

Select count(id_viewPost) as Número_de_visualizações from tb_viewPost Where en_visto = 'N';

Select count(id_viewPost) as Número_de_visualizações from tb_viewPost INNER JOIN tb_postagem on (fk_postagem = id_postagem) INNER JOIN tb_professorperfil on(fk_professorAutor = id_professor) WHERE en_visto = 'S' AND id_professor = 1;
Select count(id_viewPost) as Número_de_visualizações from tb_viewPost INNER JOIN tb_postagem on (fk_postagem = id_postagem) INNER JOIN tb_professorperfil on(fk_professorAutor = id_professor) WHERE en_visto = 'S';

SELECT id_professor, count(id_viewPost) as Total_views from  tb_viewPost  -- SELECT DO RANK --
	INNER JOIN tb_postagem on (fk_postagem = id_postagem) 
    INNER JOIN tb_professorperfil on (fk_professorAutor = id_professor)
    WHERE en_visto = 'S'
    GROUP BY id_professor;

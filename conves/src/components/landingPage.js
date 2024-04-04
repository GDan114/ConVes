import LogoBrancaConves from '../Imagens/logo_branca_conves_png.png'
import '../css/style.css'
function LandingPage() {
    return(
        <div className="LandingPage">
            <div className="menu">
		<div className="menulogo">
			<div className="logo">
				<img src={LogoBrancaConves} alt="" width="400"/>
			</div>
			<div class="btn_cadasLogin">
				<div id="cadastro">
					<a href="cadastro.html"><button type="submit" class="cadastro">Criar conta</button></a>
                    {/* <!--COLOCAR HREF DA PAGE DE CRIAR CONTA PROFESSOR E ALUNO --> */}
				</div>
				<div id="login">
					<a href="loginpage.html"><button class="login">login</button></a>
				</div>
			</div>
		</div>
	</div>
	<main>
		<div id="corpo">
			<div className="bemVindo">
				SEJA<br/>
BEM-VINDO<br/>
À CONVES!
			</div>
			 {/* <!-- Botão sobre é pressionado para aparecer o modal --> */}
				<button class="sobre" id="sobre">Sobre</button>

				{/* <!-- O modal --> */}
				<div id="myModal" className="modal">
					<div className="modal-content">
						<span className="close">&times;</span>
						<h2>ConVes</h2>
						<p>Auxiliamos na aprendizagem dos estudantes, por meio de postagens e arquivos voltados a disciplina de Língua Portuguesa.</p>
					</div>
				</div>
			
				<script>
					{/* // Obtém o modal */}
					const modal = document.getElementById("myModal");
			
					{/* // Obtém o botão que abre o modal */}
					const btn = document.getElementById("sobre");
			
					{/* // Obtém o elemento <span> que fecha o modal */}
					const span = document.getElementsByClassName("close")[0];
			
					{/* // Quando o usuário clica no botão, abre o modal */}
					{/* btn.onclick = function () {
						modal.style.display = "block"
					}; */}
			
					{/* // Quando o usuário clica no <span> (x), fecha o modal */}
					{/* span.onclick = function () {
						modal.style.display = "none"
					}; */}
			
					{/* // Quando o usuário clica em qualquer lugar fora do modal, fecha-o */}
					{/* window.onclick = function (event) {
						if (event.target === modal) {
                            modal.style.display = "none"
                        }
					}; */}
				</script>			
		</div>
	</main>
        </div>
    )
}

export default LandingPage
document.addEventListener("DOMContentLoaded", function () {
  const btnLogin = document.getElementById("btn-login");
  const cadastroSection = document.getElementById("cadastro-section");
  const concursosSection = document.getElementById("concursos-section");
  const paymentSection = document.getElementById("payment-section");

  // Login
  btnLogin.addEventListener("click", function () {
    alert("✅ Login com conta.gov.br realizado!");
    cadastroSection.style.display = "block";
    window.scrollTo({ top: cadastroSection.offsetTop, behavior: "smooth" });
  });

  // Cadastro
  document.getElementById("formulario-cadastro").addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;

    if (!nome || !cpf || !email) {
      alert("⚠️ Preencha todos os campos.");
      return;
    }

    localStorage.setItem("usuario", JSON.stringify({ nome, cpf, email }));
    concursosSection.style.display = "block";
    cadastroSection.style.display = "none";
  });

  // Selecionar concurso
  function selecionarConcurso(cargo, valor) {
    localStorage.setItem("cargo", cargo);
    localStorage.setItem("valor", valor);
    document.getElementById("valor-pix").textContent = `R$ ${valor.toFixed(2)}`;
    paymentSection.style.display = "block";
    concursosSection.style.display = "none";
  }

  // Confirmar pagamento
  document.getElementById("btn-confirm-payment").addEventListener("click", function () {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const cargo = localStorage.getItem("cargo");
    const valor = parseFloat(localStorage.getItem("valor"));

    const message = `
CONCURSO PÚBLICO 2025
✅ INSCRIÇÃO CONFIRMADA

Nome: ${usuario.nome}
CPF: ${usuario.cpf}
Cargo: ${cargo}
Valor: R$ ${valor.toFixed(2)}
Forma: PIX
Data: ${new Date().toLocaleDateString()}
  `.trim();

    const url = `https://wa.me/5511981286290?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    alert("✅ Comprovante enviado para seu WhatsApp!");
  });
});
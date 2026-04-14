document.addEventListener("DOMContentLoaded", () => {
  const pagina = document.body.dataset.pagina || "";

  const ROTAS = {
    aindex: "bficha.html",
    bficha: "cobjetivo.html",
    cobjetivo: "dsaude.html",
    dsaude: "eequipamento.html",
    eequipamento: "falimentacao.html",
    falimentacao: "gestilovida.html",
    gestilovida: "hoferta.html",
    hoferta: "checkout.html"
  };

  function salvar(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  function pegar(chave, fallback = "") {
    const valor = localStorage.getItem(chave);
    if (valor === null) return fallback;

    try {
      return JSON.parse(valor);
    } catch {
      return valor;
    }
  }

  function irPara(destino) {
    if (!destino) return;
    window.location.href = destino;
  }

  function normalizar(texto) {
    return String(texto || "")
      .trim()
      .toLowerCase();
  }

  function marcarAtivo(opcoes, valor) {
    opcoes.forEach((opcao) => {
      const valorOpcao = opcao.dataset.value || opcao.textContent.trim();

      if (String(valorOpcao) === String(valor)) {
        opcao.classList.add("ativo");
      } else {
        opcao.classList.remove("ativo");
      }
    });
  }

  function ativarSelecao(opcoes, callback) {
    opcoes.forEach((opcao) => {
      opcao.addEventListener("click", () => {
        opcoes.forEach((item) => item.classList.remove("ativo"));
        opcao.classList.add("ativo");

        const valor = opcao.dataset.value || opcao.textContent.trim();
        callback(valor, opcao);
      });
    });
  }

  function limparQuestionario() {
    const chaves = [
      "nome",
      "idade",
      "sexo",
      "peso",
      "altura",
      "imc",
      "objetivo",
      "diasTreino",
      "lesao",
      "dor",
      "limitacao",
      "cirurgia",
      "lesaoDetalhe",
      "dorDetalhe",
      "limitacaoDetalhe",
      "cirurgiaDetalhe",
      "localTreino",
      "nivelTreino",
      "alimentacaoAtual",
      "refeicoesDia",
      "sono",
      "estresse",
      "rotina"
    ];

    chaves.forEach((chave) => localStorage.removeItem(chave));
  }

  function formatarTexto(valor) {
    if (!valor) return "-";

    const mapa = {
      "ganhar-massa": "Ganhar massa muscular",
      "condicionamento": "Melhorar condicionamento",
      "academia-casa": "Academia + casa",
      "mais-ou-menos": "Mais ou menos",
      "muito-boa": "Muito boa",
      "menos-5": "Menos de 5h",
      "5-6": "5 a 6h",
      "7-8": "7 a 8h",
      "mais-8": "Mais de 8h",
      "medio": "Médio",
      "parado": "Mais parado",
      "corrida": "Corrida / puxada",
      "iniciante": "Iniciante",
      "intermediario": "Intermediário",
      "avancado": "Avançado",
      "academia": "Academia",
      "casa": "Em casa",
      "ar-livre": "Ao ar livre",
      "ruim": "Ruim",
      "boa": "Boa",
      "baixo": "Baixo",
      "alto": "Alto",
      "sim": "Sim",
      "não": "Não",
      "nao": "Não",
      "definir": "Definir o corpo",
      "emagrecer": "Emagrecer"
    };

    return mapa[normalizar(valor)] || String(valor);
  }

  // =========================
  // PÁGINA 1 - AINDEX
  // =========================
  if (pagina === "aindex") {
    const btnCriarFicha = document.getElementById("btnCriarFicha");

    if (btnCriarFicha) {
      btnCriarFicha.addEventListener("click", () => {
        irPara(ROTAS.aindex);
      });
    }
  }

  // =========================
  // PÁGINA 2 - BFICHA
  // =========================
  if (pagina === "bficha") {
    const nome = document.getElementById("nome");
    const idade = document.getElementById("idade");
    const sexo = document.getElementById("sexo");
    const peso = document.getElementById("peso");
    const altura = document.getElementById("altura");
    const btnContinuarFicha = document.getElementById("btnContinuarFicha");

    if (nome) nome.value = pegar("nome", "");
    if (idade) idade.value = pegar("idade", "");
    if (sexo) sexo.value = pegar("sexo", "");
    if (peso) peso.value = pegar("peso", "");
    if (altura) altura.value = pegar("altura", "");

    if (btnContinuarFicha) {
      btnContinuarFicha.addEventListener("click", () => {
        const nomeValor = nome?.value.trim() || "";
        const idadeValor = idade?.value.trim() || "";
        const sexoValor = sexo?.value || "";
        const pesoValor = peso?.value.trim() || "";
        const alturaValor = altura?.value.trim() || "";

        if (!nomeValor || !idadeValor || !sexoValor || !pesoValor || !alturaValor) {
          alert("Preencha todos os campos.");
          return;
        }

        const pesoNumero = Number(pesoValor);
        const alturaNumero = Number(alturaValor);

        if (!pesoNumero || !alturaNumero) {
          alert("Preencha peso e altura corretamente.");
          return;
        }

        const alturaM = alturaNumero / 100;
        const imc = (pesoNumero / (alturaM * alturaM)).toFixed(1);

        salvar("nome", nomeValor);
        salvar("idade", idadeValor);
        salvar("sexo", sexoValor);
        salvar("peso", pesoValor);
        salvar("altura", alturaValor);
        salvar("imc", imc);

        irPara(ROTAS.bficha);
      });
    }
  }

  // =========================
  // PÁGINA 3 - COBJETIVO
  // =========================
  if (pagina === "cobjetivo") {
    let objetivoSelecionado = pegar("objetivo", "");
    let diasSelecionados = pegar("diasTreino", "");

    const objetivoOpcoes = document.querySelectorAll("#objetivoOpcoes button");
    const diasOpcoes = document.querySelectorAll("#diasOpcoes button");
    const btnContinuarObjetivo = document.getElementById("btnContinuarObjetivo");

    if (objetivoSelecionado) {
      marcarAtivo(objetivoOpcoes, objetivoSelecionado);
    }

    if (diasSelecionados) {
      marcarAtivo(diasOpcoes, diasSelecionados);
    }

    ativarSelecao(objetivoOpcoes, (valor) => {
      objetivoSelecionado = valor;
      salvar("objetivo", valor);
    });

    ativarSelecao(diasOpcoes, (valor) => {
      diasSelecionados = valor;
      salvar("diasTreino", valor);
    });

    if (btnContinuarObjetivo) {
      btnContinuarObjetivo.addEventListener("click", () => {
        if (!objetivoSelecionado) {
          alert("Selecione seu objetivo.");
          return;
        }

        if (!diasSelecionados) {
          alert("Selecione quantos dias você treina.");
          return;
        }

        irPara(ROTAS.cobjetivo);
      });
    }
  }

  // =========================
  // PÁGINA 4 - DSAUDE
  // =========================
  if (pagina === "dsaude") {
    const gruposSaude = document.querySelectorAll(".opcoes-saude");
    const btnContinuarSaude = document.getElementById("btnContinuarSaude");

    gruposSaude.forEach((grupo) => {
      const nomeGrupo = grupo.dataset.grupo;
      const botoes = grupo.querySelectorAll("button");
      const campoDetalhe = document.getElementById(`campo-${nomeGrupo}`);

      const valorSalvo = pegar(nomeGrupo, "");
      const detalheSalvo = pegar(`${nomeGrupo}Detalhe`, "");

      if (campoDetalhe) {
        campoDetalhe.value = detalheSalvo;
      }

      if (valorSalvo) {
        marcarAtivo(botoes, valorSalvo);

        if (campoDetalhe) {
          campoDetalhe.style.display = valorSalvo === "Sim" ? "block" : "none";
        }
      }

      botoes.forEach((botao) => {
        botao.addEventListener("click", () => {
          const valor = botao.dataset.value || botao.textContent.trim();

          botoes.forEach((b) => b.classList.remove("ativo"));
          botao.classList.add("ativo");

          salvar(nomeGrupo, valor);

          if (campoDetalhe) {
            if (valor === "Sim") {
              campoDetalhe.style.display = "block";
            } else {
              campoDetalhe.style.display = "none";
              campoDetalhe.value = "";
              salvar(`${nomeGrupo}Detalhe`, "");
            }
          }
        });
      });

      if (campoDetalhe) {
        campoDetalhe.addEventListener("input", () => {
          salvar(`${nomeGrupo}Detalhe`, campoDetalhe.value.trim());
        });
      }
    });

    if (btnContinuarSaude) {
      btnContinuarSaude.addEventListener("click", () => {
        const obrigatorios = ["lesao", "dor", "limitacao", "cirurgia"];

        for (const chave of obrigatorios) {
          const resposta = pegar(chave, "");
          const detalhe = pegar(`${chave}Detalhe`, "");

          if (!resposta) {
            alert("Responda todas as perguntas de saúde.");
            return;
          }

          if (resposta === "Sim" && !detalhe) {
            alert("Preencha o detalhe das respostas marcadas como Sim.");
            return;
          }
        }

        irPara(ROTAS.dsaude);
      });
    }
  }

  // =========================
  // PÁGINA 5 - EEQUIPAMENTO
  // =========================
  if (pagina === "eequipamento") {
    let localSelecionado = pegar("localTreino", "");
    let nivelSelecionado = pegar("nivelTreino", "");

    const localOpcoes = document.querySelectorAll("#localTreinoOpcoes button");
    const nivelOpcoes = document.querySelectorAll("#nivelTreinoOpcoes button");
    const btnContinuarEquipamento = document.getElementById("btnContinuarEquipamento");

    if (localSelecionado) {
      marcarAtivo(localOpcoes, localSelecionado);
    }

    if (nivelSelecionado) {
      marcarAtivo(nivelOpcoes, nivelSelecionado);
    }

    ativarSelecao(localOpcoes, (valor) => {
      localSelecionado = valor;
      salvar("localTreino", valor);
    });

    ativarSelecao(nivelOpcoes, (valor) => {
      nivelSelecionado = valor;
      salvar("nivelTreino", valor);
    });

    if (btnContinuarEquipamento) {
      btnContinuarEquipamento.addEventListener("click", () => {
        if (!localSelecionado) {
          alert("Selecione onde você treina.");
          return;
        }

        if (!nivelSelecionado) {
          alert("Selecione seu nível.");
          return;
        }

        irPara(ROTAS.eequipamento);
      });
    }
  }

  // =========================
  // PÁGINA 6 - FALIMENTACAO
  // =========================
  if (pagina === "falimentacao") {
    let alimentacaoSelecionada = pegar("alimentacaoAtual", "");
    let refeicoesSelecionadas = pegar("refeicoesDia", "");

    const alimentacaoOpcoes = document.querySelectorAll("#alimentacaoOpcoes button");
    const refeicoesOpcoes = document.querySelectorAll("#refeicoesOpcoes button");
    const btnContinuarAlimentacao = document.getElementById("btnContinuarAlimentacao");

    if (alimentacaoSelecionada) {
      marcarAtivo(alimentacaoOpcoes, alimentacaoSelecionada);
    }

    if (refeicoesSelecionadas) {
      marcarAtivo(refeicoesOpcoes, refeicoesSelecionadas);
    }

    ativarSelecao(alimentacaoOpcoes, (valor) => {
      alimentacaoSelecionada = valor;
      salvar("alimentacaoAtual", valor);
    });

    ativarSelecao(refeicoesOpcoes, (valor) => {
      refeicoesSelecionadas = valor;
      salvar("refeicoesDia", valor);
    });

    if (btnContinuarAlimentacao) {
      btnContinuarAlimentacao.addEventListener("click", () => {
        if (!alimentacaoSelecionada) {
          alert("Selecione como está sua alimentação.");
          return;
        }

        if (!refeicoesSelecionadas) {
          alert("Selecione quantas refeições você faz por dia.");
          return;
        }

        irPara(ROTAS.falimentacao);
      });
    }
  }

  // =========================
  // PÁGINA 7 - GESTILOVIDA
  // =========================
  if (pagina === "gestilovida") {
    let sonoSelecionado = pegar("sono", "");
    let estresseSelecionado = pegar("estresse", "");
    let rotinaSelecionada = pegar("rotina", "");

    const sonoOpcoes = document.querySelectorAll("#horasSonoOpcoes button");
    const estresseOpcoes = document.querySelectorAll("#estresseOpcoes button");
    const rotinaOpcoes = document.querySelectorAll("#rotinaOpcoes button");
    const btnContinuarEstilo = document.getElementById("btnContinuarEstilo");

    if (sonoSelecionado) {
      marcarAtivo(sonoOpcoes, sonoSelecionado);
    }

    if (estresseSelecionado) {
      marcarAtivo(estresseOpcoes, estresseSelecionado);
    }

    if (rotinaSelecionada) {
      marcarAtivo(rotinaOpcoes, rotinaSelecionada);
    }

    ativarSelecao(sonoOpcoes, (valor) => {
      sonoSelecionado = valor;
      salvar("sono", valor);
    });

    ativarSelecao(estresseOpcoes, (valor) => {
      estresseSelecionado = valor;
      salvar("estresse", valor);
    });

    ativarSelecao(rotinaOpcoes, (valor) => {
      rotinaSelecionada = valor;
      salvar("rotina", valor);
    });

    if (btnContinuarEstilo) {
      btnContinuarEstilo.addEventListener("click", () => {
        if (!sonoSelecionado) {
          alert("Selecione quantas horas você dorme.");
          return;
        }

        if (!estresseSelecionado) {
          alert("Selecione seu nível de estresse.");
          return;
        }

        if (!rotinaSelecionada) {
          alert("Selecione como é sua rotina.");
          return;
        }

        irPara(ROTAS.gestilovida);
      });
    }
  }

  // =========================
  // PÁGINA 8 - HOFERTA
  // =========================
  if (pagina === "hoferta") {
    const nome = pegar("nome", "-");
    const objetivo = pegar("objetivo", "-");
    const dias = pegar("diasTreino", "-");
    const nivel = pegar("nivelTreino", "-");
    const local = pegar("localTreino", "-");
    const sono = pegar("sono", "-");
    const estresse = pegar("estresse", "-");
    const imc = pegar("imc", "-");

    const resultadoNome = document.getElementById("resultadoNome");
    const resultadoObjetivo = document.getElementById("resultadoObjetivo");
    const resultadoDias = document.getElementById("resultadoDias");
    const resultadoNivel = document.getElementById("resultadoNivel");
    const resultadoLocal = document.getElementById("resultadoLocal");
    const resultadoSono = document.getElementById("resultadoSono");
    const resultadoEstresse = document.getElementById("resultadoEstresse");
    const resultadoImc = document.getElementById("resultadoImc");

    const btnComprarAgora = document.getElementById("btnComprarAgora");
    const btnComprarAgora2 = document.getElementById("btnComprarAgora2");
    const btnRefazer = document.getElementById("btnRefazer");

    if (resultadoNome) resultadoNome.textContent = formatarTexto(nome);
    if (resultadoObjetivo) resultadoObjetivo.textContent = formatarTexto(objetivo);
    if (resultadoDias) resultadoDias.textContent = dias !== "-" ? `${dias} dia(s)` : "-";
    if (resultadoNivel) resultadoNivel.textContent = formatarTexto(nivel);
    if (resultadoLocal) resultadoLocal.textContent = formatarTexto(local);
    if (resultadoSono) resultadoSono.textContent = formatarTexto(sono);
    if (resultadoEstresse) resultadoEstresse.textContent = formatarTexto(estresse);
    if (resultadoImc) resultadoImc.textContent = imc;

    function irParaCheckout() {
      irPara(ROTAS.hoferta);
    }

    if (btnComprarAgora) {
      btnComprarAgora.addEventListener("click", irParaCheckout);
    }

    if (btnComprarAgora2) {
      btnComprarAgora2.addEventListener("click", irParaCheckout);
    }

    if (btnRefazer) {
      btnRefazer.addEventListener("click", () => {
        limparQuestionario();
        irPara("aindex.html");
      });
    }

    const provaTrack = document.getElementById("provaTrack");
    const provaDots = document.getElementById("provaDots");
    const prevBtn = document.querySelector(".prova-btn-prev");
    const nextBtn = document.querySelector(".prova-btn-next");

    if (provaTrack && provaDots && prevBtn && nextBtn) {
      const cards = Array.from(provaTrack.children);
      let indexAtual = 0;
      let autoSlide = null;

      function atualizarSlider() {
        provaTrack.style.transform = `translateX(-${indexAtual * 100}%)`;

        const dots = provaDots.querySelectorAll(".prova-dot");
        dots.forEach((dot, index) => {
          dot.classList.toggle("ativo", index === indexAtual);
        });
      }

      function proximoSlide() {
        indexAtual = indexAtual === cards.length - 1 ? 0 : indexAtual + 1;
        atualizarSlider();
      }

      function anteriorSlide() {
        indexAtual = indexAtual === 0 ? cards.length - 1 : indexAtual - 1;
        atualizarSlider();
      }

      function iniciarAutoSlide() {
        autoSlide = setInterval(proximoSlide, 3500);
      }

      function reiniciarAutoSlide() {
        clearInterval(autoSlide);
        iniciarAutoSlide();
      }

      provaDots.innerHTML = "";

      cards.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "prova-dot";
        if (index === 0) dot.classList.add("ativo");

        dot.addEventListener("click", () => {
          indexAtual = index;
          atualizarSlider();
          reiniciarAutoSlide();
        });

        provaDots.appendChild(dot);
      });

      prevBtn.addEventListener("click", () => {
        anteriorSlide();
        reiniciarAutoSlide();
      });

      nextBtn.addEventListener("click", () => {
        proximoSlide();
        reiniciarAutoSlide();
      });

      atualizarSlider();
      iniciarAutoSlide();
    }
  }
});
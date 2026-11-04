# Exploradores do Corpo Humano - 4.º Ano 🫀🧠

Plataforma educativa e interativa de **Estudo do Meio** para o 4.º ano de escolaridade (1.º Ciclo), com simulações didáticas animadas, jogos pedagógicos e quizzes formativos sobre a **Unidade 1: O Corpo Humano**.

---

## 🚀 Como publicar no GitHub e colocar o site online (GitHub Pages)

### 1. Criar o repositório no GitHub
1. Vai a [github.com](https://github.com) e cria um novo repositório (por exemplo, `corpo-humano-4ano`).
2. Mantém o repositório como **Público** (ou Privado se tiveres plano GitHub Pro).

### 2. Enviar o código para o GitHub
No terminal do teu computador, dentro da pasta do projeto, executa:

```bash
git init
git add .
git commit -m "feat: Exploradores do Corpo Humano - 4.º Ano"
git branch -M main
git remote add origin https://github.com/O-TEU-UTILIZADOR/corpo-humano-4ano.git
git push -u origin main
```

*(Substitui `O-TEU-UTILIZADOR` e `corpo-humano-4ano` pelos teus dados do GitHub).*

### 3. Ativar o GitHub Pages no Repositório
1. No teu repositório no GitHub, clica no separador **Settings** (Definições).
2. No menu lateral esquerdo, clica em **Pages**.
3. Em **Build and deployment** > **Source**, seleciona:
   👉 **GitHub Actions**
4. Pronto! O ficheiro `.github/workflows/deploy.yml` que criámos iniciará automaticamente a compilação e publicação do site.
5. Em cerca de 1 a 2 minutos, o teu site estará online no endereço:  
   `https://O-TEU-UTILIZADOR.github.io/corpo-humano-4ano/`

---

## 🛠️ Executar Localmente

Caso queiras testar ou editar no teu computador:

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Compilar para produção
npm run build

# 4. Pré-visualizar a versão compilada
npm run preview
```

---

## 📚 Conteúdos Incluídos

* **Sistema Digestivo:** Viagem do alimento (Bolo alimentar $\to$ Quimo $\to$ Nutrientes $\to$ Fezes), tubo digestivo vs glândulas anexas (fígado/bílis e pâncreas).
* **Sistema Respiratório:** Inspiração e Expiração com simulação do diafragma e vias respiratórias.
* **Sistema Circulatório:** Coração com batimento regulável, Pequena Circulação e Grande Circulação (Artéria Aorta e Veias Cavas).
* **Sistema Excretor / Urinário:** Filtração renal, ureteres, bexiga com simulador de volume e a pele com glândulas sudoríparas.
* **Sistema Reprodutor & Adolescência:** Sistema masculino, feminino, fecundação e transformações da puberdade nos rapazes e raparigas.
* **Sistema Nervoso:** Cérebro, espinal medula, nervos, os 5 sentidos e simulador de tempo de reflexos.
* **Mecanismos de Defesa & Tecnologia na Saúde:** Pele, lágrimas, cera, saliva, raios X, robôs cirurgiões e impressão 3D.
* **Jogos & Quizzes:**
  * Jogo da Viagem da Digestão (ordenação).
  * Detetive dos Sistemas (identificação de órgãos).
  * Mestre dos Cuidados e Saúde (Certo ou Errado).
  * Mega Quiz com Diploma imprimível.
  * Modo Turma / Projeção em Sala de Aula com perguntas orais para o professor.

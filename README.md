# 📦 Project Model-View-Controller (MVC)

Este repositório contém um projeto prático baseado no padrão arquitetural **MVC (Model-View-Controller)**, com o objetivo de demonstrar a organização de aplicações em camadas bem definidas, promovendo maior manutenção, escalabilidade e clareza no desenvolvimento.

---

## 🧠 Sobre o Projeto

A aplicação foi desenvolvida utilizando **Node.js**, **TypeScript** e **Express**, com foco na separação de responsabilidades entre as camadas do sistema:

- **Model:** Responsável pelos dados e regras de negócio  
- **View:** Responsável pela apresentação das informações ao usuário  
- **Controller:** Responsável por intermediar a comunicação entre Model e View  

O projeto ilustra como ocorre o fluxo de dados dentro de uma aplicação estruturada em MVC, desde a requisição do usuário até a resposta final.

---

## ⚙️ Tecnologias Utilizadas

- Node.js  
- TypeScript  
- Express  
- MySQL  

---

## 🏗️ Estrutura do Projeto

## Link do Diagrama 
https://excalidraw.com/#room=103ca1c3c0f0f84ade9d,fI37lUiBxXC3Diz4VS6XRA

```bash
src/
│
├── controllers/   # Lógica de controle das requisições
├── models/        # Regras de negócio e acesso ao banco de dados
├── views/         # Camada de apresentação (respostas)
├── routes/        # Definição das rotas da aplicação
├── app.ts         # Configuração principal da aplicação



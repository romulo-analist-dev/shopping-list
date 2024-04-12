// app.js

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
            console.log('Service Worker registrado com sucesso:', registration.scope);
        })
        .catch(function(error) {
            console.error('Falha ao registrar o Service Worker:', error);
        });
    });
}

function addItem(event) {
    event.preventDefault();
    
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    const newItem = {
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity
    };

    addItemToLocalStorage(newItem);
    renderShoppingList();
    document.getElementById('addItemForm').reset();
}

function addItemToLocalStorage(item) {
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    shoppingList.push(item);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function renderShoppingList() {
    const shoppingListBody = document.getElementById('shoppingListBody');
    const totalContainer = document.getElementById('total');
    shoppingListBody.innerHTML = '';
    totalContainer.innerHTML = '';
    
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    let total = 0;

    shoppingList.forEach((item, index) => {
        const totalPrice = item.price * item.quantity;
        total += totalPrice;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>R$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>R$${totalPrice.toFixed(2)}</td>
            <td><button class="removeButton" data-index="${index}"><i class="fas fa-trash-alt"></i></button></td>
        `;
        shoppingListBody.appendChild(row);
    });

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="4" style="text-align: right;">Total:</td>
        <td>R$${total.toFixed(2)}</td>
    `;
    shoppingListBody.appendChild(totalRow);

    // Função para remover uma linha da tabela e o item correspondente do armazenamento local
    function removeRow(row) {
        var index = parseInt(row.dataset.index); // Obtém o índice do item a ser removido
        row.parentNode.removeChild(row); // Remove a linha da tabela

        let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
        shoppingList.splice(index, 1); // Remove o item correspondente do armazenamento local
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList)); // Atualiza o armazenamento local

        renderShoppingList(); // Atualiza a lista de compras após a remoção
    }

    // Seletor para todos os botões de remover
    var removeButtons = document.querySelectorAll('.removeButton');

    // Adiciona um evento de clique para cada botão de remover
    removeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var row = this.parentNode.parentNode; // Obtém a linha que contém o botão
            removeRow(row); // Chama a função para remover a linha
        });
    });
}

document.getElementById('addItemForm').addEventListener('submit', addItem);

window.addEventListener('load', renderShoppingList);

// Variáveis para elementos HTML
const openModalButton = document.getElementById('openModalButton');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementsByClassName('close')[0];

// Abrir modal ao clicar no botão "+"
openModalButton.addEventListener('click', function() {
    modal.style.display = 'block';
});

// Fechar modal ao clicar no botão "X"
closeModalButton.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Fechar modal ao clicar fora do modal
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Lista de produtos
const productList = [
    "Arroz",
    "Feijão",
    "Macarrão",
    "Cuscuz",
    "Pão",
    "Peito de frango",
    "Frango",
    "Coxa e sobrecoxa",
    "Melancia",
    "Ovos",
    "Patinho moído",
    "Uvas",
    "Morango",
    "Batata Inglesa",
    "Fígado",
    "Peixe",
    "Peito bovino",
    "Acém",
    "Costela",
    "Alcatra",
    "Coxão mole",
    "Contrafilé",
    "Atum",
    "Couve manteiga",
    "Hortelã",
    "Alface",
    "Tomate",
    "Cenoura",
    "Queijo",
    "Requeijão",
    "Ricota",
    "Milho Verde",
    "Extrato de tomate",
    "Água com gás",
    "Alho",
    "Laranja",
    "Limão",
    "Cheiro verde",
    "Polpa",
    "Mamão",
    "Melão",
    "Iogurte desnatado",
    "Leite",
    "Sabão",
    "Detergente",
    "Azulim",
    "Esponja",
    "Desinfetante",
    "Pinho sol",
    "Vanish",
    "Escova de dentes",
    "Sachê",
    "Cebola branca",
    "Cebola roxa",
    "Ketchup",
    "Vassoura",
    "Pipoca",
    "Papel higiênico",
    "Guardanapo",
    "Mostarda",
    "Doce de leite",
    "Manteiga",
    "Absorvente",
    "OB",
    "Desodorante",
    "Algodão",
    "Lenços",
    "Molho de tomate",
    "Macarrão parafuso",
    "Café",
    "Chá",
    "Castanha",
];

// Função para atualizar as sugestões
function updateSuggestions(inputValue) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    // Filtra os produtos que contenham o valor digitado
    const filteredProducts = productList.filter(function(product) {
        return product.toLowerCase().includes(inputValue.toLowerCase());
    });

    // Se houver sugestões disponíveis, exibe o componente de sugestões, caso contrário, esconde-o
    if (filteredProducts.length > 0) {
        suggestions.style.display = 'block';
    } else {
        suggestions.style.display = 'none';
    }

    // Cria um elemento de opção para cada produto filtrado
    filteredProducts.forEach(function(product) {
        const option = document.createElement('div');
        option.classList.add('suggestion');
        option.textContent = product;
        option.addEventListener('click', function() {
            document.getElementById('itemName').value = product;
            suggestions.innerHTML = '';
        });
        suggestions.appendChild(option);
    });
}

// Event listener para o campo de nome do produto
document.getElementById('itemName').addEventListener('input', function() {
    updateSuggestions(this.value);
});

// Event listener para fechar as sugestões quando clicar em qualquer lugar fora do campo de nome do produto
document.addEventListener('click', function(event) {
    const productNameInput = document.getElementById('itemName');
    const suggestions = document.getElementById('suggestions');
    if (event.target !== productNameInput && event.target !== suggestions) {
        suggestions.innerHTML = '';
    }
});

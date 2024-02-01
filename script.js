var selectedRow = null;

// Mostra alertas
function showAlert(message,className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    //Cria Alerta
    container.insertBefore(div,main);

    // Tempo até sumir o alerta
    setTimeout(() => document.querySelector(".alert").remove(),3000);
}

//Limpa todos os campos
function clearFields (){
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
}

//Adiciona informações
document.querySelector("#student-form").addEventListener("submit",(e)=> {
    e.preventDefault();

    // Pega os valores do formulário
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    //Valida os valores
    if(firstName == "" || lastName == "" || rollNo == ""){
        // Alerta caso algum esteja vazio
        showAlert("Please fill in all fields", "danger");
    }else{
        // Cria linha com as informações obtidas
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            // Cria as linhas E os botões para editar e deletar
            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${rollNo}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
                list.appendChild(row);
                selectedRow = null;
                showAlert("Student Added", "success")
        }else{
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            selectedRow = null;

            showAlert("Student Info Edited", "info")
        }

        clearFields();
    }

});

//Edita Informações
document.querySelector("#student-list").addEventListener("click",(e)=> {
    target = e.target;
    if(target.classList.contains("edit")){
        // Seleciona as informações da linha selecionada(da lista)
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
    }
});

//Remove Informações
document.querySelector("#student-list").addEventListener("click",(e) => {
    target = e.target;
    if(target.classList.contains("delete")){
        // Remove as informações sobre a linha
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});
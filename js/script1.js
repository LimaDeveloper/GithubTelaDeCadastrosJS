class Material{

    constructor(){
     this.id = 1;
     this.arrayMaterial = [];
     this.editId = null;
    }
     salvar(){
        let material = this.lerDados();

        if(this.validaCampos(material)){
            if(this.editId == null){
                this.adicionar(material);
            }else{
                this.atualizar(this.editId, material);
            }
            
        }
        this.listaTabela();
        this.cancelar();
     }
     // listando a tabela
     listaTabela(){
         let tbody = document.getElementById('tbody');
        tbody.innerText = '';
         for(let i = 0; i < this.arrayMaterial.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_material = tr.insertCell();
            let td_qtdade = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayMaterial[i].id;
            td_material.innerText = this.arrayMaterial[i].nomeMaterial;
            td_qtdade.innerText = this.arrayMaterial[i].qtdade;

            td_id.classList.add('center');

            let imgEdit = document.createElement('img'); //Criando imagem no nosso html
            imgEdit.src = 'img/editar.png';
            imgEdit.setAttribute("onclick","produto.editar("+ JSON.stringify(this.arrayMaterial[i]) +")");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/deleta.png';
            imgDelete.setAttribute("onclick","produto.delete("+ this.arrayMaterial[i].id +")");
            
            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
         }
     }
     //Adicionar Material
     adicionar(material){
         material.qtdade = parseFloat(material.qtdade);
        this.arrayMaterial.push(material);
        this.id++;
     }
     atualizar(id, material){
        for(let i = 0; i < this.arrayMaterial.length; i++){
            if(this.arrayMaterial[i].id == id){
                this.arrayMaterial[i].nomeMaterial = material.nomeMaterial;
                this.arrayMaterial[i].qtdade = material.qtdade;
            }
        }
     }
     editar(dados){
        this.editId = dados.id;

        document.getElementById('material').value = dados.nomeMaterial;
        document.getElementById('qtdade').value = dados.qtdade;

        document.getElementById('btn1').innerText = 'Atualizar';
     }
     //Ler dados adicionado
     lerDados() {
        let material = {}

        material.id = this.id;
        material.nomeMaterial = document.getElementById('material').value;
        material.qtdade = document.getElementById('qtdade').value;

        return material;
     }
     //Validar dados adicionado
     validaCampos(material){
         let msg ='';
         
        if(material.nomeMaterial == ''){
            msg +='Informe o nome do Material\n';
        }
        if(material.qtdade == ''){
            msg +='Informe a quantidade do material\n';
        }
        if(msg != ''){
            alert(msg);
            return false
        }
        return true;
     }
     //Cancelar os dados
     cancelar(){
        document.getElementById('material').value = '';
        document.getElementById('qtdade').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
     }
        delete(id){
            if(confirm('Deseja realmente deletar o material do ID ' + id)){
            let tbody = document.getElementById('tbody');

            for(let i = 0; i < this.arrayMaterial.length; i++){
                if(this.arrayMaterial[i].id == id){
                    this.arrayMaterial.splice(i,1);
                    tbody.deleteRow(i);
                }
            }
        }        
    }
}
var produto = new Material();

package osaka.br.osakamed.model;

public class Usuario {
    private int id;
    private String nome;
    private String senha;
    private int idade;
    private String planoDeSaude;

    public Usuario(int id, String nome, String senha, int idade, String planoDeSaude) {
        this.id = id;
        this.nome = nome;
        this.senha = senha;
        this.idade = idade;
        this.planoDeSaude = planoDeSaude;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public String getPlanoDeSaude() {
        return planoDeSaude;
    }

    public void setPlanoDeSaude(String planoDeSaude) {
        this.planoDeSaude = planoDeSaude;
    }

}
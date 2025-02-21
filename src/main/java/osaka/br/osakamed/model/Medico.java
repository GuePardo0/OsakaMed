package osaka.br.osakamed.model;

public class Medico {
    private String nome;
    private String senha;
    private String especialidade;
    private String planoDeSaude;

    public Medico(String nome, String senha, String especialidade, String planoDeSaude) {
        this.nome = nome;
        this.senha = senha;
        this.especialidade = especialidade;
        this.planoDeSaude = planoDeSaude;
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

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getPlanoDeSaude() {
        return planoDeSaude;
    }

    public void setPlanoDeSaude(String planoDeSaude) {
        this.planoDeSaude = planoDeSaude;
    }

}

package osaka.br.osakamed.model;

public class Medico {
    private String CRM;
    private String nome;
    private String senha;
    private String especialidade;
    private String planoDeSaude;

    public Medico(String CRM, String nome, String senha, String especialidade, String planoDeSaude) {
        this.CRM = CRM;
        this.nome = nome;
        this.senha = senha;
        this.especialidade = especialidade;
        this.planoDeSaude = planoDeSaude;
    }

    public String getCRM() {
        return CRM;
    }

    public void setCRM(String CRM) {
        this.CRM = CRM;
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

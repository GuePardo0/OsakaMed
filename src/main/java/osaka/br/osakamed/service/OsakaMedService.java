package osaka.br.osakamed.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Objects;

import org.springframework.stereotype.Service;

import osaka.br.osakamed.model.Medico;
import osaka.br.osakamed.model.Usuario;
import osaka.br.osakamed.model.Consulta;

@Service
public class OsakaMedService {
    private ArrayList<Usuario> usuarios = new ArrayList<>();
    private ArrayList<Medico> medicos = new ArrayList<>();
    private ArrayList<Consulta> consultas = new ArrayList<>();

    public void adicionarUsuario(Usuario usuario) {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/usuarios.txt");
            FileWriter fw = new FileWriter(file, true);
            BufferedWriter bw = new BufferedWriter(fw);
            BufferedReader br = new BufferedReader(new FileReader(file));
            String linha = br.readLine();
            int id = 1;
            while (linha != null) {
                String[] partes = linha.split(";");
                id = Integer.parseInt(partes[0]) + 1;
                linha = br.readLine();
            }
            usuario.setId(id);
            bw.write(usuario.getId() + ";" + usuario.getNome() + ";" + usuario.getSenha() + ";" + usuario.getIdade() + ";" + usuario.getPlanoDeSaude() + "\n");
            this.usuarios.add(usuario);
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void adicionarMedico(Medico medico) {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/medicos.txt");
            FileWriter fw = new FileWriter(file, true);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(medico.getCrm() + ";" + medico.getNome() + ";" + medico.getSenha() + ";" + medico.getEspecialidade() + ";" + medico.getPlanoDeSaude() + "\n");
            this.medicos.add(medico);
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void agendarConsulta(Consulta consulta) {
        File file = new File("src/main/java/osaka/br/osakamed/model/consultas.txt");
        try {
            FileWriter fw = new FileWriter(file, true);
            BufferedWriter bw = new BufferedWriter(fw);
            BufferedReader br = new BufferedReader(new FileReader(file));
            String linha = br.readLine();
            int id = 1;
            while (linha != null) {
                String[] partes = linha.split(";");
                id = Integer.parseInt(partes[0]) + 1;
                linha = br.readLine();
            }
            consulta.setId(id);
            for (int i = 0; i < medicos.size(); i++) {
                Medico medico = medicos.get(i);
                if (medico.getCrm().equals(consulta.getCrm())) {
                    int consultasNoDia = 0;
                    for (int j = 0; j < medico.getConsultas().size(); j++) {
                        if (medico.getConsultas().get(j).getData().equals(consulta.getData())) {
                            consultasNoDia++;
                        }
                    }
                    if (consultasNoDia < 4) {
                        medico.getConsultas().add(consulta);
                    } else {
                        consulta.setStatus("fila de espera");
                    }
                    break;
                }
            }
            for (int i = 0; i < usuarios.size(); i++) {
                Usuario usuario = usuarios.get(i);
                if (usuario.getId() == consulta.getIdUser()) {
                    usuario.getConsultas().add(consulta);
                    break;
                }
            }
            bw.write(consulta.getId() + ";" + consulta.getIdUser() + ";" + consulta.getNota() + ";" + consulta.getData() + ";" + consulta.getCrm() + ";" + consulta.getDescricao() + ";" + consulta.getStatus() + "\n");
            bw.close();
            br.close();
            fw.close();
            this.consultas.add(consulta);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void enviarDescricaoConsulta(String descricao, int idConsulta) {
        for (int indexConsulta = 0; indexConsulta < this.getConsultas().size(); indexConsulta++) {
            if (this.getConsultas().get(indexConsulta).getId() == idConsulta) {
                this.getConsultas().get(indexConsulta).setDescricao(descricao);
                this.getConsultas().get(indexConsulta).setStatus("concluída");
                for (int medico = 0; medico < this.getMedicos().size(); medico++) {
                    if (this.getMedicos().get(medico).getCrm().equals(this.getConsultas().get(indexConsulta).getCrm())) {
                        for (int consultaMedico = 0; consultaMedico < this.getMedicos().get(medico).getConsultas().size(); consultaMedico++) {
                            if (this.getMedicos().get(medico).getConsultas().get(consultaMedico).getId() == idConsulta) {
                                this.getMedicos().get(medico).getConsultas().remove(consultaMedico);
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/consultas.txt");
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            for (int i = 0; i < this.consultas.size(); i++) {
                bw.write(this.consultas.get(i).getId() + ";" + this.consultas.get(i).getIdUser() + ";" + this.consultas.get(i).getNota() + ";" + this.consultas.get(i).getData() + ";" + this.consultas.get(i).getCrm() + ";" + this.consultas.get(i).getDescricao() + ";" + this.consultas.get(i).getStatus() + "\n");
            }
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void lerMedicos() {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/medicos.txt");
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);

            ArrayList<Medico> medicos = new ArrayList<>();
            String linha = br.readLine();
            while(linha != null){
                Medico medico = new Medico();
                String[] partes = linha.split(";");
                medico.setCrm(partes[0]);
                medico.setNome(partes[1]);
                medico.setSenha(partes[2]);
                medico.setEspecialidade(partes[3]);
                medico.setPlanoDeSaude(partes[4]);
                medicos.add(medico);
                linha = br.readLine();
            }
            this.medicos = medicos;

            br.close();
            fr.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void lerUsuarios() {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/usuarios.txt");
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);

            ArrayList<Usuario> usuarios = new ArrayList<>();
            String linha = br.readLine();
            while(linha != null){
                Usuario usuario = new Usuario();
                String[] partes = linha.split(";");
                usuario.setId(Integer.parseInt(partes[0]));
                usuario.setNome(partes[1]);
                usuario.setSenha(partes[2]);
                usuario.setIdade(Integer.parseInt(partes[3]));
                usuario.setPlanoDeSaude(partes[4]);
                usuarios.add(usuario);
                linha = br.readLine();
            }
            this.usuarios = usuarios;

            br.close();
            fr.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void lerConsultas() {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/consultas.txt");
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);

            ArrayList<Consulta> consultas = new ArrayList<>();
            String linha = br.readLine();
            while(linha != null) {
                Consulta consulta = new Consulta();
                String[] partes = linha.split(";");
                consulta.setId(Integer.parseInt(partes[0]));
                consulta.setIdUser(Integer.parseInt(partes[1]));
                consulta.setNota(Integer.parseInt(partes[2]));
                consulta.setData(partes[3]);
                consulta.setCrm(partes[4]);
                consulta.setDescricao(partes[5]);
                consulta.setStatus(partes[6]);
                for (int i = 0; i < medicos.size(); i++) {
                    Medico medico = medicos.get(i);
                    if (medico.getCrm().equals(consulta.getCrm())) {
                        if (!consulta.getStatus().equals("concluída") && !consulta.getStatus().equals("fila de espera")) {
                            medico.getConsultas().add(consulta);
                        }
                    }
                }
                for (int i = 0; i < usuarios.size(); i++) {
                    Usuario usuario = usuarios.get(i);
                    if (usuario.getId() ==consulta.getIdUser()) {
                        usuario.getConsultas().add(consulta);
                    }
                }
                consultas.add(consulta);
                linha = br.readLine();
            }
            this.consultas = consultas;

            br.close();
            fr.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void alterarPlano(Usuario usuario, String plano) {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/usuarios.txt");
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            for (int i = 0; i < this.usuarios.size(); i++) {
                if (this.usuarios.get(i).getId() == usuario.getId()) {
                    this.usuarios.get(i).setPlanoDeSaude(plano);
                }
                bw.write(this.usuarios.get(i).getId() + ";" + this.usuarios.get(i).getNome() + ";" + this.usuarios.get(i).getSenha() + ";" + this.usuarios.get(i).getIdade() + ";" + this.usuarios.get(i).getPlanoDeSaude() + "\n");
            }
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void alterarSenhaUser(Usuario usuario, String senha) {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/usuarios.txt");
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            for (int i = 0; i < this.usuarios.size(); i++) {
                if (this.usuarios.get(i).getId() == usuario.getId()) {
                    this.usuarios.get(i).setSenha(senha);
                }
                bw.write(this.usuarios.get(i).getId() + ";" + this.usuarios.get(i).getNome() + ";" + this.usuarios.get(i).getSenha() + ";" + this.usuarios.get(i).getIdade() + ";" + this.usuarios.get(i).getPlanoDeSaude() + "\n");
            }
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void alterarSenhaMed(Medico medico, String senha) {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/medicos.txt");
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            for (int i = 0; i < this.medicos.size(); i++) {
                if (Objects.equals(this.medicos.get(i).getCrm(), medico.getCrm())) {
                    this.medicos.get(i).setSenha(senha);
                }
                bw.write(this.medicos.get(i).getCrm() + ";" + this.medicos.get(i).getNome() + ";" + this.medicos.get(i).getSenha() + ";" + this.medicos.get(i).getEspecialidade() + ";" + this.medicos.get(i).getPlanoDeSaude() + "\n");
            }
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void excluirUsuario(int id) {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/usuarios.txt");
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            for (Usuario usuario : this.usuarios) {
                if (usuario.getId() != id) {
                    bw.write(usuario.getId() + ";" + usuario.getNome() + ";" + usuario.getSenha() + ";" + usuario.getIdade() + ";" + usuario.getPlanoDeSaude() + "\n");
                }
            }
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void excluirMedico(String CRM) {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/medicos.txt");
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            for (Medico medico : this.medicos) {
                if (!Objects.equals(medico.getCrm(), CRM)) {
                    bw.write(medico.getCrm() + ";" + medico.getNome() + ";" + medico.getSenha() + ";" + medico.getEspecialidade() + ";" + medico.getPlanoDeSaude() + "\n");
                }
            }
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void mostrarUsuarios() {
        for (int i = 0; i < this.usuarios.size(); i++) {
            System.out.println(usuarios.get(i).getNome());
        }
    }

    public ArrayList<Consulta> getConsultas() {
        return consultas;
    }

    public ArrayList<Usuario> getUsuarios() {
        return usuarios;
    }

    public ArrayList<Medico> getMedicos() {
        return medicos;
    }
}